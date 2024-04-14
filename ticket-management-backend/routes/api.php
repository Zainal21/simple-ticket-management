<?php

use App\Helpers\APIResponse;
use App\Http\Controllers\Api\TaskController;
use App\Http\Middleware\ApiKeyCheckMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// healty check
Route::get('ping', function () {
    return APIResponse::success('Application is Up');
});

Route::fallback(function () {
    return APIResponse::error('no Route matched with those values', 404);
});

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1'], function () {
    Route::patch('tasks/label/{id}', [TaskController::class, 'updateLabelById'])->middleware(ApiKeyCheckMiddleware::class);
    Route::apiResource('tasks', TaskController::class)->middleware(ApiKeyCheckMiddleware::class)->except(['show', 'update', 'destroy']);
});
