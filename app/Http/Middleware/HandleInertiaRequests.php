<?php

namespace App\Http\Middleware;

use App\Models\PlatformSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Get active demo user from session or default to John Doe (Student)
        $sessionUserId = $request->session()->get('active_user_id');
        $user = null;

        if ($sessionUserId) {
            $user = User::find($sessionUserId);
        }

        if (!$user) {
            // Default demo persona: John Doe
            $user = User::where('email', 'john.doe@platform.com')->first();
            if (!$user) {
                $user = User::first();
            }
            if ($user) {
                $request->session()->put('active_user_id', $user->id);
            }
        }

        $settings = PlatformSetting::find('global');
        if (!$settings) {
            $settings = [
                'commissionRate' => 20.0,
                'subscriptionPrice' => 29.99,
                'platformName' => 'EduFlow',
            ];
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'avatar' => $user->avatar,
                    'headline' => $user->headline,
                    'walletBalance' => (float) $user->walletBalance,
                ] : null,
            ],
            'platformSettings' => $settings,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
