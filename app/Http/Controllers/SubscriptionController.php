<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\PlatformSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        $settings = PlatformSetting::find('global');
        $subscriptionPrice = $settings ? $settings->subscriptionPrice : 29.99;

        return Inertia::render('Subscription/Index', [
            'pricing' => [
                'monthly' => $subscriptionPrice,
                'annual' => round($subscriptionPrice * 12 * 0.7, 2), // 30% discount
            ],
        ]);
    }

    public function subscribe(Request $request)
    {
        $activeUserId = $request->session()->get('active_user_id');
        $user = $activeUserId ? User::find($activeUserId) : User::where('email', 'john.doe@platform.com')->first();

        if (!$user) {
            return redirect()->back()->with('error', 'Please choose a user to activate subscription.');
        }

        // Enroll in all published courses
        $courses = Course::where('status', 'PUBLISHED')->get();
        foreach ($courses as $c) {
            Enrollment::firstOrCreate([
                'userId' => $user->id,
                'courseId' => $c->id,
            ], [
                'createdAt' => now(),
            ]);
        }

        return redirect('/my-learning')
            ->with('success', 'EduFlow Pro All-Access Pass activated! All courses are now unlocked in your portal.');
    }
}
