<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Response;

class APIResponse
{
    /**
     * Return a success response.
     *
     * @param  string  $message
     * @param  mixed  $data
     * @return \Illuminate\Http\JsonResponse
     */
    public static function success($message, $data = null)
    {
        return self::jsonResponse($message, $data, 200);
    }

    /**
     * Return a resource created response.
     *
     * @param  string  $message
     * @param  mixed  $data
     * @return \Illuminate\Http\JsonResponse
     */
    public static function created($message, $data = null)
    {
        return self::jsonResponse($message, $data, 201, true);
    }

    /**
     * Return a validation error response.
     *
     * @param  array  $errors
     * @return \Illuminate\Http\JsonResponse
     */
    public static function validationError($errors)
    {
        return self::jsonResponse('The given data was invalid.', null, 422, $errors);
    }

    /**
     * Return an error response.
     *
     * @param  string  $message
     * @param  int  $code
     * @return \Illuminate\Http\JsonResponse
     */
    public static function error($message, $code = 500)
    {
        return self::jsonResponse($message, null, $code);
    }

    /**
     * Return a custom response.
     *
     * @param  mixed  $content
     * @param  int  $statusCode
     * @return \Illuminate\Http\JsonResponse
     */
    public static function custom($content, $statusCode = 200)
    {
        return Response::json($content, $statusCode);
    }

    /**
     * Construct JSON response.
     *
     * @param  string  $message
     * @param  mixed  $data
     * @param  int  $statusCode
     * @param  bool  $includeTimestamp
     * @return \Illuminate\Http\JsonResponse
     */
    private static function jsonResponse($message, $data = null, $statusCode = 200, $errors = null, $includeTimestamp = true)
    {
        $response = [
            'status' => $statusCode >= 200 && $statusCode < 300 ? 'OK' : 'ERROR',
            'code' => $statusCode,
            'message' => $message,
        ];

        if ($data !== null) {
            $response['data'] = $data;
        }

        if ($errors !== null) {
            $response['errors'] = $errors;
        }

        if ($includeTimestamp) {
            $response['timestamp'] = now();
        }

        return Response::json($response, $statusCode);
    }
}
