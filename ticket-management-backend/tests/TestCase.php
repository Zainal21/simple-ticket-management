<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Artisan;

abstract class TestCase extends BaseTestCase
{
    protected function initDatabase()
    {
        Artisan::call('migrate');
    }

    protected function resetDatabase()
    {
        Artisan::call('migrate:reset');
    }
}
