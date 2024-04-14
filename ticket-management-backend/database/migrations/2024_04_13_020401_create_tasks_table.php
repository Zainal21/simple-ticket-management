<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('ticket_code')->unique();
            $table->string('title');
            $table->enum('type', ['Task', 'Bug'])->default('Task');
            $table->enum('assigned', ['Anggit', 'Tri', 'Banu'])->nullable();
            $table->text('description')->nullable();
            $table->enum('label', ['Todo', 'Doing'])->nullable();
            $table->enum('project_name', ['ECare Phase 2', 'ECare Phase 3'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
