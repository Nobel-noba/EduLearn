<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Enrollment;
use App\Models\LessonProgress;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LearningController extends Controller
{
    public function index(Request $request)
    {
        $activeUserId = $request->session()->get('active_user_id');
        $user = $activeUserId ? User::find($activeUserId) : User::where('email', 'john.doe@platform.com')->first();

        if (!$user) {
            return redirect('/courses');
        }

        $enrollments = Enrollment::where('userId', $user->id)
            ->with([
                'course.instructor',
                'course.category',
                'course.sections.lessons',
            ])
            ->latest('createdAt')
            ->get()
            ->map(function ($enr) use ($user) {
                $course = $enr->course;
                $lessonIds = [];
                $firstLessonId = null;

                foreach ($course->sections as $section) {
                    foreach ($section->lessons as $lesson) {
                        $lessonIds[] = $lesson->id;
                        if (!$firstLessonId) {
                            $firstLessonId = $lesson->id;
                        }
                    }
                }

                $totalLessons = count($lessonIds);
                $completedLessons = LessonProgress::where('userId', $user->id)
                    ->whereIn('lessonId', $lessonIds)
                    ->where('completed', true)
                    ->count();

                $percent = $totalLessons > 0 ? round(($completedLessons / $totalLessons) * 100) : 0;

                $certificate = Certificate::where('userId', $user->id)
                    ->where('courseId', $course->id)
                    ->first();

                return [
                    'id' => $enr->id,
                    'enrolledAt' => $enr->createdAt ? $enr->createdAt->format('M d, Y') : '',
                    'course' => [
                        'id' => $course->id,
                        'title' => $course->title,
                        'slug' => $course->slug,
                        'thumbnail' => $course->thumbnail,
                        'instructor' => [
                            'name' => $course->instructor ? $course->instructor->name : 'Instructor',
                        ],
                    ],
                    'totalLessons' => $totalLessons,
                    'completedLessons' => $completedLessons,
                    'progressPercent' => $percent,
                    'firstLessonId' => $firstLessonId,
                    'certificate' => $certificate ? [
                        'code' => $certificate->certificateCode,
                    ] : null,
                ];
            });

        $certificates = Certificate::where('userId', $user->id)
            ->with('course')
            ->latest('issuedAt')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'code' => $c->certificateCode,
                'courseTitle' => $c->course->title,
                'issuedAt' => $c->issuedAt ? $c->issuedAt->format('F d, Y') : '',
            ]);

        return Inertia::render('Learning/MyLearning', [
            'enrollments' => $enrollments,
            'certificates' => $certificates,
        ]);
    }
}
