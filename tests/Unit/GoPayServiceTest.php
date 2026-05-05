<?php

namespace Tests\Unit;

use App\Services\GoPayService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GoPayServiceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_be_instantiated()
    {
        $service = $this->app->make(GoPayService::class);
        $this->assertInstanceOf(GoPayService::class, $service);
    }
}
