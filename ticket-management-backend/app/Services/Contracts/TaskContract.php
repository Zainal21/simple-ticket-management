<?php

namespace App\Services\Contracts;

interface TaskContract
{
    /**
     * find all Tasks
     *
     * @return collection
     */
    public function getTasks(string $keyword = '', $label = 'Todo', $limit = 10);

    /**
     * createTask
     *
     * @return collection
     */
    public function createTask(array $data);

    /**
     * update label data
     *
     * @return bool
     */
    public function updateLabelById(string $id, string $label);
}
