<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificateController extends Controller
{
    public function show($code, Request $request)
    {
        $certificate = Certificate::where('certificateCode', $code)
            ->with(['user', 'course.instructor'])
            ->firstOrFail();

        return Inertia::render('Certificates/Show', [
            'certificate' => [
                'code' => $certificate->certificateCode,
                'studentName' => $certificate->user->name,
                'courseTitle' => $certificate->course->title,
                'instructorName' => $certificate->course->instructor ? $certificate->course->instructor->name : 'Platform Lead Instructor',
                'issuedAt' => $certificate->issuedAt ? $certificate->issuedAt->format('F d, Y') : date('F d, Y'),
                'verificationUrl' => url("/certificates/{$certificate->certificateCode}"),
            ],
        ]);
    }
}
