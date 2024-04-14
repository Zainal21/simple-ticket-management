import { AxiosError } from "axios";
import { showErrorAlert } from "./swal";

interface ErrorResponse {
  message: string[] | string;
  errors?: Record<string, string[]>;
}

export function handleError(axiosError: AxiosError<ErrorResponse>) {
  if (axiosError.response) {
    const responseData = axiosError.response.data;
    if (Array.isArray(responseData.message)) {
      let errorMessage = "";
      responseData.message.forEach((msg: string) => {
        errorMessage += `${msg}<br>`;
      });
      showErrorAlert(errorMessage);
    } else {
      showErrorAlert(responseData.message);
    }

    // Validation Error
    if (axiosError.response.status === 401) {
      window.location.href = "/login";
    }
    if (axiosError.response.status === 422 && responseData.errors) {
      const validationErrors = responseData.errors;
      Object.keys(validationErrors).forEach((key) => {
        const errorMessages = validationErrors[key].join("\n");
        showErrorAlert(errorMessages);
      });
    }
  } else {
    showErrorAlert("Failed when Fetching data to server");
  }
}
