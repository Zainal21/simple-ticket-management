<?php

namespace App\Services;

use App\Models\Task;
use App\Services\Contracts\TaskContract;

class TaskService implements TaskContract
{
    /**
     * find Task detail
     *
     * @return collection
     */
    public function getTasks(string $keyword = '', $label = 'Todo', $limit = 10)
    {
        $tasks = new Task();

        if ($keyword) {
            $tasks->whereAny([
                'title',
                'description',
            ], 'LIKE', '%'.$keyword.'%');
        }

        return $tasks->where('label', $label)->orderBy('created_at', 'desc')->get();
    }

    /**
     * create task
     *
     * @return collection
     */
    public function createTask(array $data)
    {
        return Task::create($data);
    }
    /**
     * update label Task data
     *
     * @return bool
     */
    public function updateLabelById(string $id, string $label)
    {
        return Task::whereId($id)->update(['label' => $label]);
    }
}
