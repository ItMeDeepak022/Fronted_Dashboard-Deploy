/**
 * Application Configuration
 * Centralized API Base URL loaded from environment variables (VITE_API_BASE_URL or VITE_BASE_URL).
 * If neither is defined, it safely falls back to the deployed production backend.
 */
export const API_BASE_URL = (
    import.meta.env.VITE_API_BASE_URL
)

export default API_BASE_URL;
