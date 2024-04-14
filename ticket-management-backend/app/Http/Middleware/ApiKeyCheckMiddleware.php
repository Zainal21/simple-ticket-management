<?php

namespace App\Http\Middleware;

use App\Helpers\APIResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiKeyCheckMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('X-API-Key');

        if ($apiKey !== config('api.api_key')) {
            return APIResponse::error('Unauthorized', 401);
        }

        return $next($request);
    }
}
