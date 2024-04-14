<?php

namespace App\Http\Controllers\Api;

use App\Enums\MessageType;
use App\Helpers\APIResponse;
use Illuminate\Http\Request;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\TaskRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function __construct(public TaskService $taskService)
    {
    }

    /**
     * display all task
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $keyword = $request->keyword ?? '';
            $label = $request->label ?? 'Todo';

            $tasks = $this->taskService->getTasks($keyword, $label);

            return new TaskResource($tasks);
        } catch (\Throwable $th) {
            report($th);

            return APIResponse::error(MessageType::SERVER_ERROR, 500);
        }
    }

    /**
     * store a new task
     *
     * @return JsonResponse
     */
    public function store(TaskRequest $request)
    {
        try {
            $data = $request->validated();

            $data['ticket_code'] =  'TCKT' .rand();
            $task = $this->taskService->createTask($data);

            if (! $task) {
                return APIResponse::error(__('Error while creating a new task'), 400);
            }

            return APIResponse::created(__('Task created successfully'), $task);
        } catch (\Throwable $th) {
            report($th);

            return APIResponse::error(MessageType::SERVER_ERROR, 500);
        }
    }
    /**
     * updateLabelById
     *
     * @param  id  $id
     * @return void
     */
    public function updateLabelById(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'label' => 'required|string',
            ]);

            if ($validator->fails()) {
                return APIResponse::validationError($validator->errors(), 400);
            }

            $task = $this->taskService->updateLabelById($id, $request->label);

            if (! $task) {
                return APIResponse::error(__('Task Not Found'), 404);
            }

            return APIResponse::success(__('Task updated successfully'));
        } catch (\Throwable $th) {
            report($th);

            return APIResponse::error(MessageType::SERVER_ERROR, 500);
        }
    }

}
