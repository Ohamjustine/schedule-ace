import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Define the structure of API error responses
export interface ApiErrorResponse {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Custom error class for API errors
export class ApiError extends Error {
  public status: number;
  public errors?: Record<string, string[]>;

  constructor(
    message: string,
    status: number = 500,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

// Dynamically set baseURL
const isLocalhost =
  typeof window !== "undefined" && window.location.protocol === "http:";
const baseURL = isLocalhost
  ? "http://localhost:5000/api/v1"
  : "https://schedule-ace-backend.vercel.app/api/v1";

// Create axios instance
const axiosClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (since we can't access Zustand store here)
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const parsedStorage = JSON.parse(authStorage);
        const token = parsedStorage.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing auth storage:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiErrorResponse>) => {
    let apiError: ApiError;

    if (error.response) {
      // Server responded with error status
      const { data, status } = error.response;
      apiError = new ApiError(
        data?.message || "An error occurred",
        status,
        data?.errors
      );
    } else if (error.request) {
      // Request was made but no response received
      apiError = new ApiError(
        "Network error - please check your connection",
        0
      );
    } else {
      // Something else happened
      apiError = new ApiError(error.message || "An unexpected error occurred");
    }

    // Handle 401 errors (unauthorized)
    if (apiError.status === 401) {
      // Clear auth storage and redirect to login
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }

    return Promise.reject(apiError);
  }
);

export default axiosClient;
