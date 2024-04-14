import { useEffect, useState } from "react";
import { Badge, ButtonBadge, TaskModal } from "../components";
import MainLayout from "../layout/MainLayout";
import {
  createTask,
  getTasks,
  updateLabelTaskById,
} from "../services/task.service";
import { Toast, showErrorAlert, showSuccessAlert } from "../utils/swal";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

export default function TaskPage() {
  // initialize state
  const [todoTasks, setTodoTasks] = useState<TaskItem[]>([]);
  const [doingTasks, setDoingTasks] = useState<TaskItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string[]>
  >({});

  // initialize function
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setValidationErrors({});
  };

  const handleSubmit = (task: TaskPayload) => {
    createTask(task)
      .then(() => {
        showSuccessAlert("New Task successfully added", () => {
          fetchAllData();
          closeModal();
        });
      })
      .catch((error: any) => {
        if (error.response && error.response.status === 422) {
          setValidationErrors(error.response.data.errors);
        } else {
          showErrorAlert(
            error.response ? error.response.data.message : "An error occurred"
          );
        }
      });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    let sourceTasks;

    if (
      result.source.droppableId === "todo" &&
      result.destination.droppableId === "doing"
    ) {
      sourceTasks = Array.from(todoTasks);
    } else if (
      result.source.droppableId === "doing" &&
      result.destination.droppableId === "todo"
    ) {
      sourceTasks = Array.from(doingTasks);
    } else {
      console.error("Invalid drag operation.");
      showErrorAlert("Invalid drag operation");
      return;
    }

    const draggedItem = sourceTasks[result.source.index];

    if (!draggedItem || !draggedItem.id) {
      console.error("Invalid task object or missing 'id' property.");
      showErrorAlert("Failed to update task label");
      return;
    }

    draggedItem.label = result.destination.droppableId;

    const payload: TaskUpdateLabel = {
      label: result.destination.droppableId as "Todo" | "Doing",
    };

    updateLabelTaskById(draggedItem.id, payload)
      .then(() => {
        fetchAllData();
        Toast.fire({
          icon: "success",
          title: "Task moved successfully",
        });
      })
      .catch((error: any) => {
        console.error(error);
        showErrorAlert("Failed to update task label");
      });
  };

  const fetchAllData = () => {
    Promise.all([getTasks("Todo"), getTasks("Doing")])
      .then(([todoTaskResponse, doingTaskResponse]) => {
        setTodoTasks(todoTaskResponse.data.data);
        setDoingTasks(doingTaskResponse.data.data);
      })
      .catch((error) => {
        const message = error.response
          ? error.response.data.message
          : "Please try again, there problem when send data to server";
        showErrorAlert(message);
      });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <MainLayout>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={openModal}
      >
        Add New Task
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 gap-8 justify-start">
          <div>
            <ButtonBadge label={"Todo"} total={todoTasks.length} />
            <Droppable droppableId="todo" direction="vertical">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="divide-y divide-gray-200 border border-gray-200 my-10 p-2"
                >
                  {todoTasks.length === 0 ? (
                    <p className="text-gray-500">No tasks available.</p>
                  ) : (
                    todoTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="kanban-card"
                          >
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                              <div className="px-4 py-5 border-b border-gray-200">
                                <div className="flex justify-between">
                                  <h5 className="font-bold text-lg leading-tight text-gray-900">
                                    {task.title} -{" "}
                                    <Badge
                                      label={task.ticket_code}
                                      color={"red"}
                                    />
                                  </h5>
                                  <span className="text-sm text-gray-500">
                                    <Badge
                                      label={task.type}
                                      color={
                                        task.type == "Bug" ? "red" : "blue"
                                      }
                                    />
                                  </span>
                                </div>
                                <Badge label={task.label} color={"red"} />
                              </div>
                              <div className="px-4 py-5 border-b border-gray-200">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500 pt-2">
                                    Description:
                                  </span>
                                  <span className=" text-gray-700 text-base">
                                    {task.description ? task.description : "-"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500 pt-2">
                                    Assigned to:
                                  </span>
                                  <span className=" text-gray-700 text-base">
                                    {task.assigned}
                                  </span>
                                </div>
                                <div className="flex justify-between pt-2">
                                  <span className="text-sm text-gray-500">
                                    Project:
                                  </span>
                                  <span className=" text-gray-700 text-base">
                                    {task.project_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
          <div>
            <ButtonBadge label={"Doing"} total={doingTasks.length} />
            <Droppable droppableId={`doing`} direction="vertical">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="divide-y divide-gray-200 border border-gray-200 my-10 p-2"
                >
                  {doingTasks.length === 0 ? (
                    <p className="text-gray-500">No tasks available.</p>
                  ) : (
                    doingTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white rounded-md shadow-md p-4 transition-all duration-300 ease-in-out hover:shadow-lg"
                          >
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                              <div className="px-4 py-5 border-b border-gray-200">
                                <div className="flex justify-between">
                                  <h5 className="font-bold text-lg leading-tight text-gray-900">
                                    {task.title} -{" "}
                                    <Badge
                                      label={task.ticket_code}
                                      color={"blue"}
                                    />
                                  </h5>
                                  <span className="text-sm text-gray-500">
                                    <Badge
                                      label={task.type}
                                      color={
                                        task.type == "Bug" ? "red" : "blue"
                                      }
                                    />
                                  </span>
                                </div>
                                <Badge label={task.label} color={"blue"} />
                              </div>
                              <div className="px-4 py-5 border-b border-gray-200">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500 pt-2">
                                    Description:
                                  </span>
                                  <span className=" text-gray-700 text-base">
                                    {task.description ? task.description : "-"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500 pt-2">
                                    Assigned to:
                                  </span>
                                  <span className=" text-gray-700 text-base">
                                    {task.assigned}
                                  </span>
                                </div>
                                <div className="flex justify-between pt-2">
                                  <span className="text-sm text-gray-500">
                                    Project:
                                  </span>
                                  <span className=" text-gray-700 text-base">
                                    {task.project_name}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        errors={validationErrors}
      />
    </MainLayout>
  );
}
