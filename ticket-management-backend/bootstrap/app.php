<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // add middleware here
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->report(function (Exceptions $e) {
            if (request()->ajax()) {
                $this->reportable(function (Throwable $e) {
                    $response = [
                        'status' => 'ERROR',
                        'code' => 500,
                        'message' => 'INTERNAL SERVER ERROR',
                        'timestamp' => now(),
                    ];
                    throw new HttpResponseException(response()->json($response, JsonResponse::HTTP_INTERNAL_SERVER_ERROR));
                });
            } else {
                $this->reportable(function (Throwable $e) {
                    Log::error('Error', [
                        'error_message' => $e->getMessage(),
                        'code' => $e->getCode(),
                        'file' => $e->getFile(),
                        'line' => $e->getLine(),
                    ]);
                });
            }
        });
    })->create();
