<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Order;
use App\Models\Payout;
use App\Models\PlatformSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        $settings = PlatformSetting::find('global');
        $commissionRate = $settings ? (float) $settings->commissionRate : 20.0;

        $gmv = Order::sum('totalAmount');
        $platformProfit = Order::sum('platformFee');
        $disbursedPayouts = Payout::where('status', 'PAID')->sum('amount');
        $pendingPayouts = Payout::where('status', 'REQUESTED')->sum('amount');
        $pendingPayoutsCount = Payout::where('status', 'REQUESTED')->count();
        $pendingCourses = Course::where('status', 'UNDER_REVIEW')->count();

        $recentOrders = Order::with(['user', 'items.course'])
            ->latest('createdAt')
            ->take(10)
            ->get()
            ->map(fn($o) => [
                'id' => $o->id,
                'transactionRef' => $o->transactionRef,
                'buyerName' => $o->user ? $o->user->name : 'Anonymous',
                'buyerEmail' => $o->user ? $o->user->email : '',
                'totalAmount' => (float) $o->totalAmount,
                'platformFee' => (float) $o->platformFee,
                'instructorShare' => (float) $o->instructorShare,
                'paymentMethod' => $o->paymentMethod,
                'status' => $o->status,
                'courseTitle' => $o->items->first() && $o->items->first()->course ? $o->items->first()->course->title : 'Course Package',
                'date' => $o->createdAt ? $o->createdAt->format('M d, Y H:i') : '',
            ]);

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'gmv' => round((float) $gmv, 2),
                'platformProfit' => round((float) $platformProfit, 2),
                'disbursedPayouts' => round((float) $disbursedPayouts, 2),
                'pendingPayouts' => round((float) $pendingPayouts, 2),
                'pendingPayoutsCount' => $pendingPayoutsCount,
                'pendingCourses' => $pendingCourses,
                'totalUsers' => User::count(),
                'totalCourses' => Course::count(),
                'commissionRate' => $commissionRate,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }

    public function courses()
    {
        $courses = Course::with([
            'instructor',
            'category',
            'sections.lessons.quizQuestions',
        ])
            ->latest('updatedAt')
            ->get()
            ->map(function ($c) {
                $totalLessons = $c->sections->sum(fn($s) => $s->lessons->count());
                return [
                    'id' => $c->id,
                    'title' => $c->title,
                    'slug' => $c->slug,
                    'subtitle' => $c->subtitle,
                    'description' => $c->description,
                    'thumbnail' => $c->thumbnail,
                    'promoVideoUrl' => $c->promoVideoUrl,
                    'price' => (float) $c->price,
                    'isFree' => (bool) $c->isFree,
                    'level' => $c->level,
                    'language' => $c->language,
                    'status' => $c->status,
                    'rejectionReason' => $c->rejectionReason,
                    'category' => $c->category ? $c->category->name : 'General',
                    'instructor' => [
                        'name' => $c->instructor ? $c->instructor->name : 'Instructor',
                        'avatar' => $c->instructor ? $c->instructor->avatar : null,
                    ],
                    'sectionsCount' => $c->sections->count(),
                    'lessonsCount' => $totalLessons,
                    'sections' => $c->sections->map(fn($s) => [
                        'id' => $s->id,
                        'title' => $s->title,
                        'lessons' => $s->lessons->map(fn($l) => [
                            'id' => $l->id,
                            'title' => $l->title,
                            'type' => $l->type,
                            'durationSec' => $l->durationSec,
                            'isFreePreview' => (bool) $l->isFreePreview,
                            'quizQuestionsCount' => $l->quizQuestions->count(),
                        ]),
                    ]),
                ];
            });

        return Inertia::render('Admin/Courses', [
            'courses' => $courses,
        ]);
    }

    public function approveCourse($id)
    {
        $course = Course::findOrFail($id);
        $course->update([
            'status' => 'PUBLISHED',
            'rejectionReason' => null,
        ]);

        return redirect()->back()->with('success', "Course '{$course->title}' approved and published to marketplace!");
    }

    public function rejectCourse($id, Request $request)
    {
        $course = Course::findOrFail($id);
        $course->update([
            'status' => 'REJECTED',
            'rejectionReason' => $request->input('reason', 'Curriculum does not meet platform quality guidelines.'),
        ]);

        return redirect()->back()->with('success', "Course '{$course->title}' was rejected with feedback note.");
    }

    public function unpublishCourse($id)
    {
        $course = Course::findOrFail($id);
        $course->update(['status' => 'DRAFT']);

        return redirect()->back()->with('success', "Course '{$course->title}' was unpublished and set to Draft.");
    }

    public function finances()
    {
        $settings = PlatformSetting::find('global');
        if (!$settings) {
            $settings = PlatformSetting::create([
                'id' => 'global',
                'commissionRate' => 20.0,
                'subscriptionPrice' => 29.99,
            ]);
        }

        $orders = Order::with(['user', 'items.course'])
            ->latest('createdAt')
            ->take(20)
            ->get()
            ->map(fn($o) => [
                'id' => $o->id,
                'transactionRef' => $o->transactionRef,
                'buyerName' => $o->user ? $o->user->name : 'Customer',
                'courseTitle' => $o->items->first() && $o->items->first()->course ? $o->items->first()->course->title : 'Item',
                'totalAmount' => (float) $o->totalAmount,
                'platformFee' => (float) $o->platformFee,
                'instructorShare' => (float) $o->instructorShare,
                'paymentMethod' => $o->paymentMethod,
                'date' => $o->createdAt ? $o->createdAt->format('M d, Y H:i') : '',
            ]);

        return Inertia::render('Admin/Finances', [
            'settings' => [
                'commissionRate' => (float) $settings->commissionRate,
                'subscriptionPrice' => (float) $settings->subscriptionPrice,
                'platformName' => $settings->platformName,
            ],
            'orders' => $orders,
            'aggregates' => [
                'totalRevenue' => round((float) Order::sum('totalAmount'), 2),
                'platformProfit' => round((float) Order::sum('platformFee'), 2),
                'instructorPaid' => round((float) Order::sum('instructorShare'), 2),
                'totalPaidOut' => round((float) Payout::where('status', 'PAID')->sum('amount'), 2),
            ],
        ]);
    }

    public function updateCommission(Request $request)
    {
        $rate = (float) $request->input('commissionRate', 20.0);
        $subscriptionPrice = (float) $request->input('subscriptionPrice', 29.99);

        $settings = PlatformSetting::find('global');
        if ($settings) {
            $settings->update([
                'commissionRate' => $rate,
                'subscriptionPrice' => $subscriptionPrice,
            ]);
        }

        return redirect()->back()->with('success', 'Platform settings updated successfully.');
    }

    public function payouts()
    {
        $payouts = Payout::with('instructor')
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
                'processedAt' => $p->processedAt ? $p->processedAt->format('M d, Y H:i') : null,
                'instructor' => [
                    'name' => $p->instructor ? $p->instructor->name : 'Instructor',
                    'email' => $p->instructor ? $p->instructor->email : '',
                    'walletBalance' => $p->instructor ? (float) $p->instructor->walletBalance : 0.0,
                ],
            ]);

        return Inertia::render('Admin/Payouts', [
            'payouts' => $payouts,
        ]);
    }

    public function approvePayout($id, Request $request)
    {
        $payout = Payout::findOrFail($id);
        $payout->update([
            'status' => 'PAID',
            'adminNote' => $request->input('adminNote', 'Approved and disbursed via automated transfer.'),
            'processedAt' => now(),
        ]);

        return redirect()->back()->with('success', "Payout #{$payout->id} marked as PAID.");
    }

    public function rejectPayout($id, Request $request)
    {
        $payout = Payout::with('instructor')->findOrFail($id);

        // Refund wallet balance
        if ($payout->instructor) {
            $payout->instructor->increment('walletBalance', $payout->amount);
        }

        $payout->update([
            'status' => 'REJECTED',
            'adminNote' => $request->input('adminNote', 'Declined by Admin. Balance refunded to wallet.'),
            'processedAt' => now(),
        ]);

        return redirect()->back()->with('success', "Payout #{$payout->id} declined and funds returned to instructor wallet.");
    }

    public function users()
    {
        $users = User::withCount(['courses', 'enrollments'])
            ->latest('createdAt')
            ->get()
            ->map(fn($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'role' => $u->role,
                'avatar' => $u->avatar,
                'walletBalance' => (float) $u->walletBalance,
                'isSuspended' => (bool) $u->isSuspended,
                'coursesCount' => $u->courses_count,
                'enrollmentsCount' => $u->enrollments_count,
                'joinedAt' => $u->createdAt ? $u->createdAt->format('M d, Y') : '',
            ]);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function updateUserRole($id, Request $request)
    {
        $user = User::findOrFail($id);
        $role = strtoupper($request->input('role', 'STUDENT'));
        $user->update(['role' => $role]);

        return redirect()->back()->with('success', "User '{$user->name}' role updated to {$role}.");
    }

    public function toggleUserSuspension($id)
    {
        $user = User::findOrFail($id);
        $user->update(['isSuspended' => !$user->isSuspended]);

        $statusText = $user->isSuspended ? 'suspended' : 'reactivated';
        return redirect()->back()->with('success', "User '{$user->name}' {$statusText}.");
    }
}
