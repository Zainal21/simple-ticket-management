<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 2; $i <= 11; $i++) {
            Task::create([
                'ticket_code' =>  'TCKT' .rand(),
                'title' => 'Sample Task '.$i,
                'type' => 'Task',
                'assigned' => 'Anggit',
                'description' => 'This is a sample task description.',
                'label' => 'Todo',
                'project_name' => 'ECare Phase 2',
            ]);
        }
    }
}
