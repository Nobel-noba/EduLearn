<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\OrderItem;
use App\Models\Payout;
use App\Models\QuizQuestion;
use App\Models\Section;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InstructorController extends Controller
{
    protected function getInstructor(Request $request): User
    {
        $activeUserId = $request->session()->get('active_user_id');
        $user = $activeUserId ? User::find($activeUserId) : null;

        if (!$user || ($user->role !== 'INSTRUCTOR' && $user->role !== 'ADMIN')) {
            // Default to Alex Rivera for testing
            $user = User::where('email', 'alex.coder@platform.com')->first() ?: User::first();
        }

        return $user;
    }

    public function dashboard(Request $request)
    {
        $instructor = $this->getInstructor($request);

        $courses = Course::where('instructorId', $instructor->id)
            ->withCount(['enrollments', 'sections'])
            ->latest('createdAt')
            ->get();

        $courseIds = $courses->pluck('id')->toArray();

        $orderItems = OrderItem::whereIn('courseId', $courseIds)
            ->with(['order.user', 'course'])
            ->latest('id')
            ->take(10)
            ->get();

        $grossSales = OrderItem::whereIn('courseId', $courseIds)->sum('price');
        $netEarnings = OrderItem::whereIn('courseId', $courseIds)->sum('instructorNet');
        $totalStudents = $courses->sum('enrollments_count');

        return Inertia::render('Instructor/Dashboard', [
            'instructor' => [
                'name' => $instructor->name,
                'email' => $instructor->email,
                'avatar' => $instructor->avatar,
                'walletBalance' => (float) $instructor->walletBalance,
            ],
            'metrics' => [
                'grossSales' => round((float) $grossSales, 2),
                'netEarnings' => round((float) $netEarnings, 2),
                'walletBalance' => (float) $instructor->walletBalance,
                'totalStudents' => $totalStudents,
                'activeCourses' => $courses->count(),
            ],
            'recentSales' => $orderItems->map(fn($item) => [
                'id' => $item->id,
                'courseTitle' => $item->course->title,
                'buyerName' => $item->order->user ? $item->order->user->name : 'Student',
                'grossPrice' => (float) $item->price,
                'netEarned' => (float) $item->instructorNet,
                'date' => $item->order->createdAt ? $item->order->createdAt->format('M d, Y') : 'Recent',
            ]),
            'courses' => $courses->map(fn($c) => [
                'id' => $c->id,
                'title' => $c->title,
                'status' => $c->status,
                'price' => (float) $c->price,
                'students' => $c->enrollments_count,
            ]),
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function courses(Request $request)
    {
        $instructor = $this->getInstructor($request);

        $courses = Course::where('instructorId', $instructor->id)
            ->with(['category'])
            ->withCount(['enrollments', 'sections'])
            ->latest('createdAt')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'title' => $c->title,
                'slug' => $c->slug,
                'status' => $c->status,
                'price' => (float) $c->price,
                'isFree' => (bool) $c->isFree,
                'level' => $c->level,
                'category' => $c->category ? $c->category->name : 'General',
                'studentsCount' => $c->enrollments_count,
                'sectionsCount' => $c->sections_count,
                'updatedAt' => $c->updatedAt ? $c->updatedAt->format('M d, Y') : '',
            ]);

        return Inertia::render('Instructor/Courses/Index', [
            'courses' => $courses,
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function storeCourse(Request $request)
    {
        $instructor = $this->getInstructor($request);

        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $firstCategory = Category::first();
        $categoryId = $request->input('categoryId', $firstCategory ? $firstCategory->id : null);
        $price = (float) $request->input('price', 49.99);

        $course = Course::create([
            'title' => $request->input('title'),
            'slug' => Str::slug($request->input('title')) . '-' . Str::lower(Str::random(6)),
            'subtitle' => 'Master skills with real-world hands-on lessons.',
            'description' => 'Comprehensive masterclass designed to take you from beginner to advanced.',
            'price' => $price,
            'isFree' => $price == 0,
            'level' => $request->input('level', 'All Levels'),
            'language' => 'English',
            'status' => 'DRAFT',
            'categoryId' => $categoryId,
            'instructorId' => $instructor->id,
            'thumbnail' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
        ]);

        return redirect("/instructor/courses/{$course->id}/edit")->with('success', 'Course created! Now you can design sections and add lessons.');
    }

    public function editCourse($id, Request $request)
    {
        $instructor = $this->getInstructor($request);

        $course = Course::with([
            'category',
            'sections.lessons.quizQuestions',
        ])->findOrFail($id);

        $categories = Category::all()->map(fn($cat) => [
            'id' => $cat->id,
            'name' => $cat->name,
        ]);

        return Inertia::render('Instructor/Courses/Edit', [
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
                'rejectionReason' => $course->rejectionReason,
                'categoryId' => $course->categoryId,
                'sections' => $course->sections->map(fn($s) => [
                    'id' => $s->id,
                    'title' => $s->title,
                    'order' => $s->order,
                    'lessons' => $s->lessons->map(fn($l) => [
                        'id' => $l->id,
                        'title' => $l->title,
                        'type' => $l->type,
                        'videoUrl' => $l->videoUrl,
                        'durationSec' => $l->durationSec,
                        'isFreePreview' => (bool) $l->isFreePreview,
                        'content' => $l->content,
                        'quizQuestions' => $l->quizQuestions->map(fn($q) => [
                            'id' => $q->id,
                            'question' => $q->question,
                            'options' => $q->options,
                            'correctAnswer' => $q->correctAnswer,
                            'explanation' => $q->explanation,
                        ]),
                    ]),
                ]),
            ],
            'categories' => $categories,
        ]);
    }

    public function updateCourse($id, Request $request)
    {
        $course = Course::findOrFail($id);

        $course->update($request->only([
            'title',
            'subtitle',
            'description',
            'thumbnail',
            'promoVideoUrl',
            'price',
            'isFree',
            'level',
            'language',
            'categoryId',
            'status',
        ]));

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'course' => $course]);
        }

        return redirect()->back()->with('success', 'Course details updated successfully.');
    }

    public function storeSection($courseId, Request $request)
    {
        $course = Course::findOrFail($courseId);
        $maxOrder = $course->sections()->max('order') ?: 0;

        $section = Section::create([
            'courseId' => $course->id,
            'title' => $request->input('title', 'New Section'),
            'order' => $maxOrder + 1,
        ]);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'section' => $section]);
        }

        return redirect()->back()->with('success', 'Section created successfully.');
    }

    public function deleteSection($courseId, $sectionId)
    {
        $section = Section::where('courseId', $courseId)->where('id', $sectionId)->firstOrFail();
        $section->delete();

        return redirect()->back()->with('success', 'Section removed.');
    }

    public function storeLesson($courseId, Request $request)
    {
        $sectionId = $request->input('sectionId');
        $section = Section::where('courseId', $courseId)->where('id', $sectionId)->firstOrFail();
        $maxOrder = $section->lessons()->max('order') ?: 0;

        $lesson = Lesson::create([
            'sectionId' => $section->id,
            'title' => $request->input('title', 'New Lesson'),
            'type' => $request->input('type', 'VIDEO'),
            'videoUrl' => $request->input('videoUrl'),
            'durationSec' => (int) $request->input('durationSec', 300),
            'content' => $request->input('content'),
            'isFreePreview' => (bool) $request->input('isFreePreview', false),
            'order' => $maxOrder + 1,
        ]);

        // If Quiz type, create quiz questions
        if ($lesson->type === 'QUIZ' && $request->has('quizQuestions')) {
            foreach ($request->input('quizQuestions') as $q) {
                QuizQuestion::create([
                    'lessonId' => $lesson->id,
                    'question' => $q['question'] ?? 'Question',
                    'options' => is_array($q['options']) ? json_encode($q['options']) : $q['options'],
                    'correctAnswer' => (int) ($q['correctAnswer'] ?? 0),
                    'explanation' => $q['explanation'] ?? '',
                ]);
            }
        }

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'lesson' => $lesson]);
        }

        return redirect()->back()->with('success', 'Lesson added successfully.');
    }

    public function deleteLesson($courseId, $lessonId)
    {
        $lesson = Lesson::findOrFail($lessonId);
        $lesson->delete();

        return redirect()->back()->with('success', 'Lesson removed.');
    }

    public function submitForReview($id)
    {
        $course = Course::findOrFail($id);
        $course->update(['status' => 'UNDER_REVIEW']);

        return redirect()->back()->with('success', 'Course submitted for Admin Review!');
    }

    public function payouts(Request $request)
    {
        $instructor = $this->getInstructor($request);

        $payouts = Payout::where('instructorId', $instructor->id)
            ->latest('requestedAt')
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'amount' => (float) $p->amount,
                'method' => $p->method,
                'details' => $p->details,
                'status' => $p->status,
                'adminNote' => $p->adminNote,
                'requestedAt' => $p->requestedAt ? $p->requestedAt->format('M d, Y H:i') : '',
                'processedAt' => $p->processedAt ? $p->processedAt->format('M d, Y') : null,
            ]);

        return Inertia::render('Instructor/Payouts', [
            'walletBalance' => (float) $instructor->walletBalance,
            'payouts' => $payouts,
        ]);
    }

    public function requestPayout(Request $request)
    {
        $instructor = $this->getInstructor($request);

        $amount = (float) $request->input('amount');
        if ($amount <= 0 || $amount > $instructor->walletBalance) {
            return redirect()->back()->with('error', 'Invalid payout withdrawal amount requested.');
        }

        Payout::create([
            'instructorId' => $instructor->id,
            'amount' => $amount,
            'method' => $request->input('method', 'PAYPAL'),
            'details' => $request->input('details', 'PayPal withdrawal'),
            'status' => 'REQUESTED',
            'requestedAt' => now(),
        ]);

        $instructor->decrement('walletBalance', $amount);

        return redirect()->back()->with('success', "Payout request for \${$amount} submitted to Admin queue!");
    }
}
