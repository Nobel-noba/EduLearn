<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Course;
use App\Models\Certificate;
use Illuminate\Foundation\Testing\TestCase;
use Tests\CreatesApplication;

class EduLearnPlatformTest extends TestCase
{
    public function test_home_page_renders_successfully(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_courses_catalog_renders_successfully(): void
    {
        $response = $this->get('/courses');
        $response->assertStatus(200);
    }

    public function test_course_detail_renders_successfully(): void
    {
        $course = Course::where('status', 'PUBLISHED')->first();
        $this->assertNotNull($course);

        $response = $this->get("/courses/{$course->slug}");
        $response->assertStatus(200);
    }

    public function test_subscription_page_renders_successfully(): void
    {
        $response = $this->get('/subscription');
        $response->assertStatus(200);
    }

    public function test_public_certificate_verification_renders(): void
    {
        $cert = Certificate::first();
        $this->assertNotNull($cert);

        $response = $this->get("/certificates/{$cert->certificateCode}");
        $response->assertStatus(200);
    }

    public function test_instructor_dashboard_renders(): void
    {
        $instructor = User::where('role', 'INSTRUCTOR')->first();
        $response = $this->withSession(['active_user_id' => $instructor->id])->get('/instructor');
        $response->assertStatus(200);
    }

    public function test_admin_dashboard_renders(): void
    {
        $admin = User::where('role', 'ADMIN')->first();
        $response = $this->withSession(['active_user_id' => $admin->id])->get('/admin');
        $response->assertStatus(200);
    }

    public function test_persona_switching(): void
    {
        $student = User::where('email', 'john.doe@platform.com')->first();
        $response = $this->post('/auth/switch-demo', ['role' => 'student']);
        $response->assertSessionHas('active_user_id', $student->id);
    }

    public function test_student_my_learning_portal(): void
    {
        $student = User::where('role', 'STUDENT')->first();
        $response = $this->withSession(['active_user_id' => $student->id])->get('/my-learning');
        $response->assertStatus(200);
    }

    public function test_classroom_video_and_quiz_runner(): void
    {
        $course = Course::with('sections.lessons')->where('status', 'PUBLISHED')->first();
        $lesson = $course->sections->first()->lessons->first();
        $student = User::where('role', 'STUDENT')->first();

        $response = $this->withSession(['active_user_id' => $student->id])
            ->get("/learn/{$course->id}/lecture/{$lesson->id}");
        $response->assertStatus(200);
    }

    public function test_instructor_curriculum_and_payouts_pages(): void
    {
        $instructor = User::where('role', 'INSTRUCTOR')->first();
        
        $responseCourses = $this->withSession(['active_user_id' => $instructor->id])->get('/instructor/courses');
        $responseCourses->assertStatus(200);

        $responsePayouts = $this->withSession(['active_user_id' => $instructor->id])->get('/instructor/payouts');
        $responsePayouts->assertStatus(200);
    }

    public function test_admin_control_center_subpages(): void
    {
        $admin = User::where('role', 'ADMIN')->first();

        $responseCourses = $this->withSession(['active_user_id' => $admin->id])->get('/admin/courses');
        $responseCourses->assertStatus(200);

        $responseFinances = $this->withSession(['active_user_id' => $admin->id])->get('/admin/finances');
        $responseFinances->assertStatus(200);

        $responsePayouts = $this->withSession(['active_user_id' => $admin->id])->get('/admin/payouts');
        $responsePayouts->assertStatus(200);

        $responseUsers = $this->withSession(['active_user_id' => $admin->id])->get('/admin/users');
        $responseUsers->assertStatus(200);
    }

    public function test_checkout_escrow_page(): void
    {
        $student = User::where('role', 'STUDENT')->first();
        $enrolledIds = \App\Models\Enrollment::where('userId', $student->id)->pluck('courseId')->toArray();
        $course = Course::where('status', 'PUBLISHED')->whereNotIn('id', $enrolledIds)->first();

        if ($course) {
            $response = $this->withSession(['active_user_id' => $student->id])->get("/checkout/{$course->id}");
            $response->assertStatus(200);
        } else {
            // If enrolled in all, unauthenticated checkout should render 200
            $anyCourse = Course::where('status', 'PUBLISHED')->first();
            $response = $this->get("/checkout/{$anyCourse->id}");
            $response->assertStatus(200);
        }
    }

    public function test_instructor_can_create_new_course(): void
    {
        $instructor = User::where('role', 'INSTRUCTOR')->first();

        $response = $this->withSession(['active_user_id' => $instructor->id])
            ->post('/instructor/courses', [
                'title' => 'Test Automated Course ' . time(),
                'price' => 59.99,
                'level' => 'Intermediate',
            ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('Course', [
            'instructorId' => $instructor->id,
            'status' => 'DRAFT',
        ]);
    }
}
