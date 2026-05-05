<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that a user can be authenticated successfully.
     */
    public function test_user_can_login_with_correct_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        // Simulate a form submission
        $response = $this->post('/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        // Assert the user is redirected (e.g., to a dashboard)
        $response->assertRedirect('/admin/dashboard'); // Or wherever you redirect after login

        // Assert that the user is actually authenticated
        $this->assertAuthenticatedAs($user);
    }

    /**
     * Test that a user cannot log in with an incorrect password.
     */
    public function test_user_cannot_login_with_incorrect_password(): void
    {
        User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        // Attempt login with wrong password
        $response = $this->post('/login', [
            'email' => 'test@example.com',
            'password' => 'wrongpassword',
        ]);

        // Assert that the session has errors for the 'email' field
        $response->assertSessionHasErrors('email');

        // Assert that the user is not authenticated
        $this->assertGuest();
    }

    /**
     * Test that the login form rejects invalid email formats.
     */
    public function test_login_with_sql_injection_attempt(): void
    {
        // The SQL injection attempt is also an invalid email,
        // so we should test for the validation error.
        $response = $this->post('/login', [
            'email' => "' OR 1=1; --",
            'password' => 'anything',
        ]);

        // Laravel's validation should catch this before it ever hits the database.
        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }
}
