<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PlatformSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function show($courseId, Request $request)
    {
        $course = Course::with(['category', 'instructor'])->findOrFail($courseId);
        $activeUserId = $request->session()->get('active_user_id');

        if ($activeUserId) {
            $existing = Enrollment::where('userId', $activeUserId)
                ->where('courseId', $course->id)
                ->first();

            if ($existing) {
                return redirect("/courses/{$course->slug}")
                    ->with('success', 'You are already enrolled in this course!');
            }
        }

        $settings = PlatformSetting::find('global');
        $commissionRate = $settings ? $settings->commissionRate : 20.0;

        $platformFee = round($course->price * ($commissionRate / 100), 2);
        $instructorNet = round($course->price - $platformFee, 2);

        return Inertia::render('Checkout/Show', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
                'slug' => $course->slug,
                'thumbnail' => $course->thumbnail,
                'price' => (float) $course->price,
                'isFree' => (bool) $course->isFree,
                'level' => $course->level,
                'instructor' => [
                    'name' => $course->instructor->name,
                    'avatar' => $course->instructor->avatar,
                ],
            ],
            'financials' => [
                'commissionRate' => $commissionRate,
                'platformFee' => $platformFee,
                'instructorNet' => $instructorNet,
            ],
        ]);
    }

    public function process($courseId, Request $request)
    {
        $course = Course::findOrFail($courseId);
        $activeUserId = $request->session()->get('active_user_id');

        $user = $activeUserId ? User::find($activeUserId) : User::where('email', 'john.doe@platform.com')->first();
        if (!$user) {
            return redirect()->back()->with('error', 'Please select a persona to checkout.');
        }

        // Check existing enrollment
        $existing = Enrollment::where('userId', $user->id)
            ->where('courseId', $course->id)
            ->first();

        if ($existing) {
            return redirect("/my-learning")
                ->with('success', 'You are already enrolled in this course!');
        }

        $settings = PlatformSetting::find('global');
        $commissionRate = $settings ? $settings->commissionRate : 20.0;

        $price = (float) $course->price;
        $platformFee = round($price * ($commissionRate / 100), 2);
        $instructorShare = round($price - $platformFee, 2);

        $order = Order::create([
            'userId' => $user->id,
            'totalAmount' => $price,
            'platformFee' => $platformFee,
            'instructorShare' => $instructorShare,
            'status' => 'COMPLETED',
            'paymentMethod' => $request->input('paymentMethod', 'CARD'),
        ]);

        OrderItem::create([
            'orderId' => $order->id,
            'courseId' => $course->id,
            'price' => $price,
            'platformFee' => $platformFee,
            'instructorNet' => $instructorShare,
        ]);

        // Credit instructor wallet balance
        $instructor = User::find($course->instructorId);
        if ($instructor) {
            $instructor->increment('walletBalance', $instructorShare);
        }

        // Enroll user
        Enrollment::create([
            'userId' => $user->id,
            'courseId' => $course->id,
            'createdAt' => now(),
        ]);

        // Find first lesson to redirect or go to my-learning
        $firstSection = $course->sections()->orderBy('order', 'asc')->first();
        $firstLesson = $firstSection ? $firstSection->lessons()->orderBy('order', 'asc')->first() : null;

        if ($firstLesson) {
            return redirect("/learn/{$course->id}/lecture/{$firstLesson->id}")
                ->with('success', "Enrolled successfully! Welcome to {$course->title}.");
        }

        return redirect("/my-learning")
            ->with('success', "Enrolled successfully in {$course->title}!");
    }
}
