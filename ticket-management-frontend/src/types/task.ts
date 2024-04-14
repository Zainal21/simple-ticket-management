interface TaskPayload {
  title: string;
  type: string | "Task" | "Bug";
  assigned?: string | "Anggit" | "Tri" | "Banu" | null;
  description?: string | null;
  label: string | "Todo" | "Doing";
  project_name: string | "ECare Phase 2" | "ECare Phase 3";
}

interface TaskUpdateLabel {
  label: "Todo" | "Doing";
}

interface TaskItem {
  id: string;
  ticket_code: string;
  title: string;
  type: string;
  assigned: string;
  description: string;
  label: string;
  project_name: string;
  created_at: string;
  updated_at: string;
}
