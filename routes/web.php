<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\LearningController;
use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

// Public Marketplace & Home
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{slug}', [CourseController::class, 'show'])->name('courses.show');

// Checkout & Subscription
Route::get('/checkout/{courseId}', [CheckoutController::class, 'show'])->name('checkout.show');
Route::post('/checkout/{courseId}', [CheckoutController::class, 'process'])->name('checkout.process');
Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription.index');
Route::post('/subscription', [SubscriptionController::class, 'subscribe'])->name('subscription.subscribe');

// Student Learning Classroom
Route::get('/my-learning', [LearningController::class, 'index'])->name('learning.index');
Route::get('/learn/{courseId}/lecture/{lessonId}', [ClassroomController::class, 'show'])->name('classroom.show');
Route::post('/learn/{courseId}/progress/{lessonId}', [ClassroomController::class, 'toggleProgress'])->name('classroom.progress');
Route::post('/api/progress', function (\Illuminate\Http\Request $request) {
    $controller = app(ClassroomController::class);
    return $controller->toggleProgress($request->input('courseId'), $request->input('lessonId'), $request->merge(['completed' => true]));
});

// Verifiable Certificates
Route::get('/certificates/{code}', [CertificateController::class, 'show'])->name('certificates.show');

// Demo Persona Switcher & Auth
Route::post('/auth/switch-demo', [AuthController::class, 'switchDemo'])->name('auth.switch-demo');
Route::get('/auth/switch-demo/{role}', function ($role, \Illuminate\Http\Request $request) {
    $request->merge(['role' => $role]);
    return app(AuthController::class)->switchDemo($request);
});
Route::get('/api/auth/me', [AuthController::class, 'me']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->name('auth.logout');

// Instructor Studio
Route::prefix('instructor')->name('instructor.')->group(function () {
    Route::get('/', [InstructorController::class, 'dashboard'])->name('dashboard');
    Route::get('/courses', [InstructorController::class, 'courses'])->name('courses.index');
    Route::post('/courses', [InstructorController::class, 'storeCourse'])->name('courses.store');
    Route::get('/courses/{id}/edit', [InstructorController::class, 'editCourse'])->name('courses.edit');
    Route::put('/courses/{id}', [InstructorController::class, 'updateCourse'])->name('courses.update');
    Route::post('/courses/{id}/sections', [InstructorController::class, 'storeSection'])->name('sections.store');
    Route::delete('/courses/{id}/sections/{sectionId}', [InstructorController::class, 'deleteSection'])->name('sections.delete');
    Route::post('/courses/{id}/lessons', [InstructorController::class, 'storeLesson'])->name('lessons.store');
    Route::delete('/courses/{id}/lessons/{lessonId}', [InstructorController::class, 'deleteLesson'])->name('lessons.delete');
    Route::post('/courses/{id}/submit', [InstructorController::class, 'submitForReview'])->name('courses.submit');
    Route::get('/payouts', [InstructorController::class, 'payouts'])->name('payouts.index');
    Route::post('/payouts', [InstructorController::class, 'requestPayout'])->name('payouts.request');
});

// Admin Control Center
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/courses', [AdminController::class, 'courses'])->name('courses.index');
    Route::post('/courses/{id}/approve', [AdminController::class, 'approveCourse'])->name('courses.approve');
    Route::post('/courses/{id}/reject', [AdminController::class, 'rejectCourse'])->name('courses.reject');
    Route::post('/courses/{id}/unpublish', [AdminController::class, 'unpublishCourse'])->name('courses.unpublish');
    Route::get('/finances', [AdminController::class, 'finances'])->name('finances.index');
    Route::post('/finances/settings', [AdminController::class, 'updateCommission'])->name('finances.update');
    Route::get('/payouts', [AdminController::class, 'payouts'])->name('payouts.index');
    Route::post('/payouts/{id}/approve', [AdminController::class, 'approvePayout'])->name('payouts.approve');
    Route::post('/payouts/{id}/reject', [AdminController::class, 'rejectPayout'])->name('payouts.reject');
    Route::get('/users', [AdminController::class, 'users'])->name('users.index');
    Route::post('/users/{id}/role', [AdminController::class, 'updateUserRole'])->name('users.role');
    Route::post('/users/{id}/toggle-suspend', [AdminController::class, 'toggleUserSuspension'])->name('users.suspend');
});
