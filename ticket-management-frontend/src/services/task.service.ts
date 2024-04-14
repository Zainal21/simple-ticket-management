import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const version = import.meta.env.VITE_API_VERSION;

const headerConfig = {
  Accept: "application/json",
  "X-API-Key": apiKey,
};

export function getTasks(label = "Todo") {
  return axios({
    method: "GET",
    url: `${baseUrl}/api/${version}/tasks?label=${label}`,
    headers: headerConfig,
  });
}

export function createTask(payload: TaskPayload) {
  return axios({
    method: "POST",
    url: `${baseUrl}/api/${version}/tasks`,
    headers: headerConfig,
    data: payload,
  });
}

export function updateLabelTaskById(id: string, payload: TaskUpdateLabel) {
  return axios({
    method: "PATCH",
    url: `${baseUrl}/api/${version}/tasks/label/${id}`,
    headers: headerConfig,
    data: payload,
  });
}
