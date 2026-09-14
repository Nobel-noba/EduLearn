#!/bin/bash
set -e

echo "=================================================="
echo "    EduLearn - Starting Application Container     "
echo "=================================================="

# Ensure proper ownership of writable directories
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# If .env does not exist, copy from .env.docker or .env.example
if [ ! -f /var/www/.env ]; then
    if [ -f /var/www/.env.docker ]; then
        echo "==> Creating .env from .env.docker..."
        cp /var/www/.env.docker /var/www/.env
    elif [ -f /var/www/.env.example ]; then
        echo "==> Creating .env from .env.example..."
        cp /var/www/.env.example /var/www/.env
    fi
fi

# Wait for Database connection if DB_HOST is provided
DB_CONNECTION="${DB_CONNECTION:-pgsql}"
DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-5432}"
DB_DATABASE="${DB_DATABASE:-edulearn}"
DB_USERNAME="${DB_USERNAME:-postgres}"
DB_PASSWORD="${DB_PASSWORD:-postgres}"

echo "==> Waiting for database connection (${DB_CONNECTION}://${DB_USERNAME}@${DB_HOST}:${DB_PORT}/${DB_DATABASE})..."
max_retries=30
count=0
until php -r "
    try {
        if ('${DB_CONNECTION}' === 'pgsql') {
            \$dsn = 'pgsql:host=${DB_HOST};port=${DB_PORT};dbname=${DB_DATABASE}';
        } else {
            \$dsn = 'mysql:host=${DB_HOST};port=${DB_PORT};dbname=${DB_DATABASE}';
        }
        \$pdo = new PDO(\$dsn, '${DB_USERNAME}', '${DB_PASSWORD}', [PDO::ATTR_TIMEOUT => 3]);
        exit(0);
    } catch (Exception \$e) {
        exit(1);
    }
" 2>/dev/null; do
    count=$((count + 1))
    if [ $count -ge $max_retries ]; then
        echo "==> Warning: Database connection timed out after ${max_retries} attempts. Proceeding anyway..."
        break
    fi
    echo "    Database not ready yet... Retrying in 2s ($count/$max_retries)"
    sleep 2
done

if [ $count -lt $max_retries ]; then
    echo "==> Database connected successfully!"
fi

# Generate application key if missing
APP_KEY_VAL=$(grep -E '^APP_KEY=' /var/www/.env 2>/dev/null | cut -d '=' -f2- || true)
if [ -z "$APP_KEY_VAL" ] || [ "$APP_KEY_VAL" = "base64:" ] || [ "$APP_KEY_VAL" = "" ]; then
    echo "==> Generating application key..."
    php artisan key:generate --force
fi

# Create storage symlink if not exists
if [ ! -L /var/www/public/storage ]; then
    echo "==> Linking storage directory..."
    php artisan storage:link --force || true
fi

# Run database migrations if explicitly enabled
if [ "${RUN_MIGRATIONS:-false}" = "true" ]; then
    echo "==> Running database migrations..."
    php artisan migrate --force
fi

# Production optimizations or development cache clearing
if [ "${APP_ENV}" = "production" ]; then
    echo "==> Caching configuration and routes for production..."
    php artisan config:cache || true
    php artisan route:cache || true
    php artisan view:cache || true
else
    echo "==> Clearing local caches..."
    php artisan config:clear || true
    php artisan cache:clear || true
    php artisan view:clear || true
fi

echo "==> Launching: $@"
exec "$@"
