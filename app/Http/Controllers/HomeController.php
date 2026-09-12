<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredCourses = Course::where('status', 'PUBLISHED')
            ->with(['category', 'instructor', 'reviews'])
            ->withCount(['sections', 'enrollments'])
            ->latest('createdAt')
            ->take(6)
            ->get()
            ->map(function ($c) {
                $totalLessons = $c->sections->sum(fn($s) => $s->lessons()->count());
                $avgRating = $c->reviews->avg('rating') ?: 5.0;
                return [
                    'id' => $c->id,
                    'title' => $c->title,
                    'slug' => $c->slug,
                    'subtitle' => $c->subtitle,
                    'thumbnail' => $c->thumbnail,
                    'price' => (float) $c->price,
                    'isFree' => (bool) $c->isFree,
                    'level' => $c->level,
                    'category' => $c->category ? [
                        'name' => $c->category->name,
                        'slug' => $c->category->slug,
                    ] : null,
                    'instructor' => $c->instructor ? [
                        'name' => $c->instructor->name,
                        'avatar' => $c->instructor->avatar,
                        'headline' => $c->instructor->headline,
                    ] : null,
                    'totalLessons' => $totalLessons,
                    'enrollmentCount' => $c->enrollments_count,
                    'rating' => round($avgRating, 1),
                    'reviewCount' => $c->reviews->count(),
                ];
            });

        $categories = Category::withCount(['courses' => fn($q) => $q->where('status', 'PUBLISHED')])
            ->get()
            ->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'description' => $cat->description,
                'icon' => $cat->icon,
                'courseCount' => $cat->courses_count,
            ]);

        $topInstructors = User::where('role', 'INSTRUCTOR')
            ->withCount(['courses' => fn($q) => $q->where('status', 'PUBLISHED')])
            ->get()
            ->map(fn($inst) => [
                'id' => $inst->id,
                'name' => $inst->name,
                'avatar' => $inst->avatar,
                'headline' => $inst->headline,
                'courseCount' => $inst->courses_count,
            ]);

        $stats = [
            'totalCourses' => Course::where('status', 'PUBLISHED')->count(),
            'totalEnrollments' => Enrollment::count(),
            'totalCertificates' => Certificate::count(),
            'totalInstructors' => User::where('role', 'INSTRUCTOR')->count(),
        ];

        return Inertia::render('Home', [
            'featuredCourses' => $featuredCourses,
            'categories' => $categories,
            'topInstructors' => $topInstructors,
            'stats' => $stats,
        ]);
    }
}
