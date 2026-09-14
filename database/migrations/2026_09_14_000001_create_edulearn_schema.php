<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. user table
        Schema::create('user', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('name', 191);
            $table->string('email', 191)->unique();
            $table->string('passwordHash', 191);
            $table->string('role', 191)->default('STUDENT');
            $table->text('avatar')->nullable();
            $table->string('headline', 191)->nullable();
            $table->text('bio')->nullable();
            $table->boolean('isSuspended')->default(false);
            $table->timestamp('createdAt', 3)->useCurrent();
            $table->timestamp('updatedAt', 3)->nullable();
            $table->double('walletBalance')->default(0);
        });

        // 2. category table
        Schema::create('category', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('name', 191)->unique();
            $table->string('slug', 191)->unique();
            $table->text('description')->nullable();
            $table->string('icon', 191)->nullable();
        });

        // 3. course table
        Schema::create('course', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('title', 191);
            $table->string('slug', 191)->unique();
            $table->text('subtitle')->nullable();
            $table->text('description');
            $table->text('thumbnail')->nullable();
            $table->text('promoVideoUrl')->nullable();
            $table->double('price')->default(0);
            $table->boolean('isFree')->default(false);
            $table->string('level', 191)->default('All Levels');
            $table->string('language', 191)->default('English');
            $table->string('status', 191)->default('DRAFT');
            $table->text('rejectionReason')->nullable();
            $table->string('instructorId', 191);
            $table->string('categoryId', 191)->nullable();
            $table->timestamp('createdAt', 3)->useCurrent();
            $table->timestamp('updatedAt', 3)->nullable();

            $table->foreign('instructorId')->references('id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('categoryId')->references('id')->on('category')->onDelete('set null')->onUpdate('cascade');
        });

        // 4. section table
        Schema::create('section', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('title', 191);
            $table->integer('order')->default(0);
            $table->string('courseId', 191);
            $table->timestamp('createdAt', 3)->useCurrent();

            $table->foreign('courseId')->references('id')->on('course')->onDelete('cascade')->onUpdate('cascade');
        });

        // 5. lesson table
        Schema::create('lesson', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('title', 191);
            $table->integer('order')->default(0);
            $table->string('type', 191)->default('VIDEO');
            $table->text('content')->nullable();
            $table->text('videoUrl')->nullable();
            $table->integer('durationSec')->default(0);
            $table->boolean('isFreePreview')->default(false);
            $table->string('sectionId', 191);
            $table->timestamp('createdAt', 3)->useCurrent();

            $table->foreign('sectionId')->references('id')->on('section')->onDelete('cascade')->onUpdate('cascade');
        });

        // 6. quizquestion table
        Schema::create('quizquestion', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('lessonId', 191);
            $table->text('question');
            $table->text('options');
            $table->integer('correctAnswer');
            $table->text('explanation')->nullable();

            $table->foreign('lessonId')->references('id')->on('lesson')->onDelete('cascade')->onUpdate('cascade');
        });

        // 7. attachment table
        Schema::create('attachment', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('lessonId', 191);
            $table->string('fileName', 191);
            $table->text('fileUrl');
            $table->integer('fileSize')->default(0);

            $table->foreign('lessonId')->references('id')->on('lesson')->onDelete('cascade')->onUpdate('cascade');
        });

        // 8. order table
        Schema::create('order', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('userId', 191);
            $table->double('totalAmount');
            $table->double('platformFee');
            $table->double('instructorShare');
            $table->string('status', 191)->default('COMPLETED');
            $table->string('paymentMethod', 191)->default('CARD');
            $table->string('transactionRef', 191)->unique();
            $table->timestamp('createdAt', 3)->useCurrent();

            $table->foreign('userId')->references('id')->on('user')->onDelete('restrict')->onUpdate('cascade');
        });

        // 9. orderitem table
        Schema::create('orderitem', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('orderId', 191);
            $table->string('courseId', 191);
            $table->double('price');
            $table->double('platformFee');
            $table->double('instructorNet');

            $table->foreign('orderId')->references('id')->on('order')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('courseId')->references('id')->on('course')->onDelete('restrict')->onUpdate('cascade');
        });

        // 10. enrollment table
        Schema::create('enrollment', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('userId', 191);
            $table->string('courseId', 191);
            $table->timestamp('completedAt', 3)->nullable();
            $table->timestamp('createdAt', 3)->useCurrent();

            $table->unique(['userId', 'courseId']);
            $table->foreign('userId')->references('id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('courseId')->references('id')->on('course')->onDelete('cascade')->onUpdate('cascade');
        });

        // 11. lessonprogress table
        Schema::create('lessonprogress', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('userId', 191);
            $table->string('lessonId', 191);
            $table->boolean('completed')->default(false);
            $table->timestamp('updatedAt', 3)->nullable();

            $table->unique(['userId', 'lessonId']);
            $table->foreign('userId')->references('id')->on('user')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('lessonId')->references('id')->on('lesson')->onDelete('cascade')->onUpdate('cascade');
        });

        // 12. certificate table
        Schema::create('certificate', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('certificateCode', 191)->unique();
            $table->string('userId', 191);
            $table->string('courseId', 191);
            $table->timestamp('issuedAt', 3)->useCurrent();

            $table->unique(['userId', 'courseId']);
            $table->foreign('userId')->references('id')->on('user')->onDelete('restrict')->onUpdate('cascade');
            $table->foreign('courseId')->references('id')->on('course')->onDelete('restrict')->onUpdate('cascade');
        });

        // 13. review table
        Schema::create('review', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('userId', 191);
            $table->string('courseId', 191);
            $table->integer('rating')->default(5);
            $table->text('comment')->nullable();
            $table->timestamp('createdAt', 3)->useCurrent();

            $table->unique(['userId', 'courseId']);
            $table->foreign('userId')->references('id')->on('user')->onDelete('restrict')->onUpdate('cascade');
            $table->foreign('courseId')->references('id')->on('course')->onDelete('cascade')->onUpdate('cascade');
        });

        // 14. payout table
        Schema::create('payout', function (Blueprint $table) {
            $table->string('id', 191)->primary();
            $table->string('instructorId', 191);
            $table->double('amount');
            $table->string('method', 191);
            $table->text('details');
            $table->string('status', 191)->default('REQUESTED');
            $table->text('adminNote')->nullable();
            $table->timestamp('requestedAt', 3)->useCurrent();
            $table->timestamp('processedAt', 3)->nullable();

            $table->foreign('instructorId')->references('id')->on('user')->onDelete('restrict')->onUpdate('cascade');
        });

        // 15. platformsetting table
        Schema::create('platformsetting', function (Blueprint $table) {
            $table->string('id', 191)->primary()->default('global');
            $table->double('commissionRate')->default(20);
            $table->double('subscriptionPrice')->default(29.99);
            $table->string('platformName', 191)->default('EduFlow');
            $table->string('supportEmail', 191)->default('support@eduflow.com');
            $table->timestamp('updatedAt', 3)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('platformsetting');
        Schema::dropIfExists('payout');
        Schema::dropIfExists('review');
        Schema::dropIfExists('certificate');
        Schema::dropIfExists('lessonprogress');
        Schema::dropIfExists('enrollment');
        Schema::dropIfExists('orderitem');
        Schema::dropIfExists('order');
        Schema::dropIfExists('attachment');
        Schema::dropIfExists('quizquestion');
        Schema::dropIfExists('lesson');
        Schema::dropIfExists('section');
        Schema::dropIfExists('course');
        Schema::dropIfExists('category');
        Schema::dropIfExists('user');
    }
};
