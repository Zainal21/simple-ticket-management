import React, { useState } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: TaskPayload) => void;
  errors: { [key: string]: string[] };
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  errors,
}) => {
  const [task, setTask] = useState<TaskPayload>({
    title: "",
    type: "Task",
    assigned: null,
    description: null,
    label: "Todo",
    project_name: "ECare Phase 2",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <div
      className={`w-full fixed inset-0 bg-gray-800 bg-opacity-50 text-left ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-10/12">
          <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 mb-4">
                <label htmlFor="title" className="block my-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block my-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={task.type}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                >
                  <option value="Task" defaultChecked>
                    Task
                  </option>
                  <option value="Bug">Bug</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.type[0]}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="assigned" className="block my-1">
                  Assigned
                </label>
                <select
                  id="assigned"
                  name="assigned"
                  value={task.assigned || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                >
                  <option value="">Unassigned</option>
                  <option value="Anggit">Anggit</option>
                  <option value="Tri">Tri</option>
                  <option value="Banu">Banu</option>
                </select>
                {errors.assigned && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assigned[0]}
                  </p>
                )}
              </div>
              <div className="col-span-2 mb-4">
                <label htmlFor="description" className="block my-1">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={task.description || ""}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description[0]}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="label" className="block my-1">
                  Label
                </label>
                <select
                  id="label"
                  name="label"
                  value={task.label}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                >
                  <option value="Todo">Todo</option>
                  <option value="Doing">Doing</option>
                </select>
                {errors.label && (
                  <p className="text-red-500 text-sm mt-1">{errors.label[0]}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="project_name" className="block my-1">
                  Project Name
                </label>
                <select
                  id="project_name"
                  name="project_name"
                  value={task.project_name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                >
                  <option value="ECare Phase 2">ECare Phase 2</option>
                  <option value="ECare Phase 3">ECare Phase 3</option>
                </select>
                {errors.project_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.project_name[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-md px-4 py-2.5 mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-md px-4 py-2.5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
