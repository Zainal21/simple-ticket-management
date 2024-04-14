import TaskPage from "./pages/task.page";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <TaskPage /> },
  { path: "*", element: <div>Not Found</div> }, // TODO: create a NotFound component
]);

export default router;
