<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $categorySlug = $request->query('category');
        $level = $request->query('level');
        $priceFilter = $request->query('price');
        $sort = $request->query('sort', 'newest');

        $query = Course::where('status', 'PUBLISHED')
            ->with(['category', 'instructor', 'reviews'])
            ->withCount(['sections', 'enrollments']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('subtitle', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($categorySlug) {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        if ($level && $level !== 'All') {
            $query->where('level', $level);
        }

        if ($priceFilter === 'free') {
            $query->where('isFree', true);
        } elseif ($priceFilter === 'paid') {
            $query->where('isFree', false);
        }

        if ($sort === 'price-low') {
            $query->orderBy('price', 'asc');
        } elseif ($sort === 'price-high') {
            $query->orderBy('price', 'desc');
        } elseif ($sort === 'popular') {
            $query->orderBy('enrollments_count', 'desc');
        } else {
            $query->latest('createdAt');
        }

        $courses = $query->get()->map(function ($c) {
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
                'language' => $c->language,
                'category' => $c->category ? [
                    'id' => $c->category->id,
                    'name' => $c->category->name,
                    'slug' => $c->category->slug,
                ] : null,
                'instructor' => $c->instructor ? [
                    'id' => $c->instructor->id,
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

        $categories = Category::all()->map(fn($cat) => [
            'id' => $cat->id,
            'name' => $cat->name,
            'slug' => $cat->slug,
        ]);

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $categorySlug,
                'level' => $level,
                'price' => $priceFilter,
                'sort' => $sort,
            ],
        ]);
    }

    public function show($slug, Request $request)
    {
        $course = Course::where('slug', $slug)
            ->with([
                'category',
                'instructor',
                'sections.lessons.quizQuestions',
                'reviews.user',
            ])
            ->withCount('enrollments')
            ->firstOrFail();

        $activeUserId = $request->session()->get('active_user_id');
        $isEnrolled = false;
        $firstLessonId = null;

        if ($activeUserId) {
            $isEnrolled = Enrollment::where('userId', $activeUserId)
                ->where('courseId', $course->id)
                ->exists();
        }

        // Find first lesson for "Start Learning" or "Resume" link
        foreach ($course->sections as $section) {
            if ($section->lessons->isNotEmpty()) {
                $firstLessonId = $section->lessons->first()->id;
                break;
            }
        }

        $totalDurationSec = 0;
        $totalLessons = 0;
        foreach ($course->sections as $section) {
            foreach ($section->lessons as $lesson) {
                $totalLessons++;
                $totalDurationSec += $lesson->durationSec;
            }
        }

        $avgRating = $course->reviews->avg('rating') ?: 5.0;

        return Inertia::render('Courses/Show', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'slug' => $course->slug,
                'subtitle' => $course->subtitle,
                'description' => $course->description,
                'thumbnail' => $course->thumbnail,
                'promoVideoUrl' => $course->promoVideoUrl,
                'price' => (float) $course->price,
                'isFree' => (bool) $course->isFree,
                'level' => $course->level,
                'language' => $course->language,
                'status' => $course->status,
                'category' => $course->category,
                'instructor' => [
                    'id' => $course->instructor->id,
                    'name' => $course->instructor->name,
                    'avatar' => $course->instructor->avatar,
                    'headline' => $course->instructor->headline,
                    'bio' => $course->instructor->bio,
                ],
                'sections' => $course->sections->map(fn($s) => [
                    'id' => $s->id,
                    'title' => $s->title,
                    'order' => $s->order,
                    'lessons' => $s->lessons->map(fn($l) => [
                        'id' => $l->id,
                        'title' => $l->title,
                        'order' => $l->order,
                        'type' => $l->type,
                        'durationSec' => $l->durationSec,
                        'isFreePreview' => (bool) $l->isFreePreview,
                        'videoUrl' => (bool) $l->isFreePreview ? $l->videoUrl : null,
                        'quizQuestionsCount' => $l->quizQuestions->count(),
                    ]),
                ]),
                'reviews' => $course->reviews->map(fn($r) => [
                    'id' => $r->id,
                    'rating' => $r->rating,
                    'comment' => $r->comment,
                    'createdAt' => $r->createdAt ? $r->createdAt->format('M d, Y') : '',
                    'user' => [
                        'name' => $r->user->name,
                        'avatar' => $r->user->avatar,
                    ],
                ]),
                'totalLessons' => $totalLessons,
                'totalDurationSec' => $totalDurationSec,
                'enrollmentCount' => $course->enrollments_count,
                'rating' => round($avgRating, 1),
                'reviewCount' => $course->reviews->count(),
            ],
            'isEnrolled' => $isEnrolled,
            'firstLessonId' => $firstLessonId,
        ]);
    }
}
