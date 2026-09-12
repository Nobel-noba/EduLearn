<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function switchDemo(Request $request)
    {
        $role = strtolower($request->input('role', 'student'));

        $user = match ($role) {
            'admin' => User::where('email', 'admin@platform.com')->first(),
            'instructor', 'alex' => User::where('email', 'alex.coder@platform.com')->first(),
            'sarah' => User::where('email', 'sarah.design@platform.com')->first(),
            'emma' => User::where('email', 'emma.watson@platform.com')->first(),
            default => User::where('email', 'john.doe@platform.com')->first(),
        };

        if (!$user) {
            $user = User::first();
        }

        if ($user) {
            $request->session()->put('active_user_id', $user->id);
        }

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'avatar' => $user->avatar,
                    'walletBalance' => (float) $user->walletBalance,
                ] : null,
            ]);
        }

        return redirect()->back()->with('success', "Switched persona to {$user->name}");
    }

    public function me(Request $request)
    {
        $userId = $request->session()->get('active_user_id');
        $user = $userId ? User::find($userId) : User::where('email', 'john.doe@platform.com')->first();

        return response()->json([
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'avatar' => $user->avatar,
                'walletBalance' => (float) $user->walletBalance,
            ] : null,
        ]);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('active_user_id');
        return redirect('/')->with('success', 'Logged out successfully');
    }
}
