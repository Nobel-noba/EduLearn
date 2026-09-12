<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ClassroomController extends Controller
{
    public function show($courseId, $lessonId, Request $request)
    {
        $course = Course::with([
            'instructor',
            'sections.lessons.quizQuestions',
        ])->findOrFail($courseId);

        $activeUserId = $request->session()->get('active_user_id');
        $user = $activeUserId ? User::find($activeUserId) : User::where('email', 'john.doe@platform.com')->first();

        if (!$user) {
            return redirect("/courses/{$course->slug}");
        }

        // Auto-enroll if not enrolled (frictionless testing)
        $enrollment = Enrollment::firstOrCreate([
            'userId' => $user->id,
            'courseId' => $course->id,
        ], [
            'createdAt' => now(),
        ]);

        $currentLesson = Lesson::with('quizQuestions')->findOrFail($lessonId);

        // Fetch completed lesson IDs for this user
        $completedLessonIds = LessonProgress::where('userId', $user->id)
            ->where('completed', true)
            ->pluck('lessonId')
            ->toArray();

        // Build flat ordered lessons list for navigation
        $allLessons = [];
        foreach ($course->sections as $section) {
            foreach ($section->lessons as $lesson) {
                $allLessons[] = $lesson;
            }
        }

        $currentIndex = 0;
        foreach ($allLessons as $index => $l) {
            if ($l->id === $currentLesson->id) {
                $currentIndex = $index;
                break;
            }
        }

        $prevLessonId = $currentIndex > 0 ? $allLessons[$currentIndex - 1]->id : null;
        $nextLessonId = $currentIndex < count($allLessons) - 1 ? $allLessons[$currentIndex + 1]->id : null;

        $totalLessons = count($allLessons);
        $completedCount = count(array_intersect(array_column($allLessons, 'id'), $completedLessonIds));
        $percent = $totalLessons > 0 ? round(($completedCount / $totalLessons) * 100) : 0;

        $certificate = Certificate::where('userId', $user->id)
            ->where('courseId', $course->id)
            ->first();

        $isCurrentCompleted = in_array($currentLesson->id, $completedLessonIds);

        return Inertia::render('Learning/Classroom', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'slug' => $course->slug,
                'instructor' => [
                    'name' => $course->instructor ? $course->instructor->name : 'Instructor',
                    'avatar' => $course->instructor ? $course->instructor->avatar : null,
                ],
                'sections' => $course->sections->map(fn($s) => [
                    'id' => $s->id,
                    'title' => $s->title,
                    'lessons' => $s->lessons->map(fn($l) => [
                        'id' => $l->id,
                        'title' => $l->title,
                        'type' => $l->type,
                        'durationSec' => $l->durationSec,
                        'isCompleted' => in_array($l->id, $completedLessonIds),
                    ]),
                ]),
            ],
            'currentLesson' => [
                'id' => $currentLesson->id,
                'title' => $currentLesson->title,
                'type' => $currentLesson->type,
                'content' => $currentLesson->content,
                'videoUrl' => $currentLesson->videoUrl ?: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                'durationSec' => $currentLesson->durationSec,
                'isCompleted' => $isCurrentCompleted,
                'quizQuestions' => $currentLesson->quizQuestions->map(fn($q) => [
                    'id' => $q->id,
                    'question' => $q->question,
                    'options' => $q->options,
                    'correctAnswer' => (int) $q->correctAnswer,
                    'explanation' => $q->explanation,
                ]),
            ],
            'navigation' => [
                'prevLessonId' => $prevLessonId,
                'nextLessonId' => $nextLessonId,
            ],
            'progress' => [
                'totalLessons' => $totalLessons,
                'completedCount' => $completedCount,
                'percent' => $percent,
                'certificateCode' => $certificate ? $certificate->certificateCode : null,
            ],
        ]);
    }

    public function toggleProgress($courseId, $lessonId, Request $request)
    {
        $activeUserId = $request->session()->get('active_user_id');
        $user = $activeUserId ? User::find($activeUserId) : User::where('email', 'john.doe@platform.com')->first();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $completed = $request->input('completed', true);

        $progress = LessonProgress::updateOrCreate([
            'userId' => $user->id,
            'lessonId' => $lessonId,
        ], [
            'completed' => (bool) $completed,
        ]);

        $course = Course::with('sections.lessons')->findOrFail($courseId);
        $lessonIds = [];
        foreach ($course->sections as $s) {
            foreach ($s->lessons as $l) {
                $lessonIds[] = $l->id;
            }
        }

        $totalLessons = count($lessonIds);
        $completedLessons = LessonProgress::where('userId', $user->id)
            ->whereIn('lessonId', $lessonIds)
            ->where('completed', true)
            ->count();

        $courseCompleted = false;
        $certificateCode = null;

        if ($totalLessons > 0 && $completedLessons >= $totalLessons) {
            $courseCompleted = true;

            // Mark enrollment completed
            Enrollment::where('userId', $user->id)
                ->where('courseId', $course->id)
                ->update(['completedAt' => now()]);

            // Issue Certificate if not already present
            $cert = Certificate::firstOrCreate([
                'userId' => $user->id,
                'courseId' => $course->id,
            ], [
                'certificateCode' => 'CERT-' . date('Y') . '-' . strtoupper(Str::random(6)),
                'issuedAt' => now(),
            ]);

            $certificateCode = $cert->certificateCode;
        }

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'completed' => (bool) $completed,
                'completedCount' => $completedLessons,
                'totalLessons' => $totalLessons,
                'percent' => round(($completedLessons / max(1, $totalLessons)) * 100),
                'courseCompleted' => $courseCompleted,
                'certificateCode' => $certificateCode,
            ]);
        }

        return redirect()->back();
    }
}
