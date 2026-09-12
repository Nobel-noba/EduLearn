# ==============================================================================
# Multi-Stage Dockerfile for EduLearn (Laravel 13 + Inertia JS v2 + React + MySQL)
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Frontend Asset Compilation (Node.js)
# ------------------------------------------------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json* ./

# Install npm dependencies
RUN npm ci --ignore-scripts

# Copy frontend source code
COPY resources ./resources
COPY vite.config.js tsconfig.json ./
COPY public ./public

# Build production assets using Vite
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production PHP + Nginx Runtime
# ------------------------------------------------------------------------------
FROM php:8.3-fpm-alpine AS production

# Set working directory
WORKDIR /var/www

# Install system dependencies, Nginx, and Supervisor
RUN apk update && apk add --no-cache \
    nginx \
    supervisor \
    bash \
    curl \
    git \
    zip \
    unzip \
    oniguruma-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    icu-dev \
    libxml2-dev \
    mariadb-client

# Configure and install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl \
        opcache

# Install latest Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Configure Nginx
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
RUN mkdir -p /etc/nginx/conf.d && cp /etc/nginx/http.d/default.conf /etc/nginx/conf.d/default.conf

# Configure PHP & Opcache
COPY docker/php/php.ini $PHP_INI_DIR/conf.d/99-custom.ini
COPY docker/php/opcache.ini $PHP_INI_DIR/conf.d/opcache.ini

# Configure Supervisord
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy Composer manifests first for layer caching
COPY composer.json composer.lock ./

# Install PHP dependencies without dev packages
RUN composer install --no-dev --no-interaction --no-scripts --prefer-dist --optimize-autoloader

# Copy application source code
COPY . .

# Copy compiled frontend assets from Stage 1
COPY --from=frontend-builder /app/public/build ./public/build

# Complete composer autoload dump
RUN composer dump-autoload --optimize --no-dev

# Setup entrypoint script
COPY docker/app/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

# Set directory permissions for web server
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache \
    && mkdir -p /run/nginx

# Expose HTTP port
EXPOSE 80

# Define container entrypoint and default command
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
