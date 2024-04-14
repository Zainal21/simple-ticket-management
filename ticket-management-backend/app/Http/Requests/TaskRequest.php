<?php

namespace App\Http\Requests;

use App\Helpers\APIResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class TaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'type' => 'required|in:Task,Bug',
            'assigned' => 'required|in:Anggit,Tri,Banu',
            'description' => 'nullable|string',
            'label' => 'required|in:Todo,Doing',
            'project_name' => 'required|in:ECare Phase 2,ECare Phase 3',
        ];
    }

    public function attributes()
    {
        return [
            'title' => 'Title',
            'type' => 'Type',
            'assigned' => 'Assigned',
            'description' => 'Description',
            'label' => 'Label',
            'project_name' => 'Project Name',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(APIResponse::validationError($validator->errors()));
    }
}
