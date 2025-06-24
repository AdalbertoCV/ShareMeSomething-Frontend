import axios from 'axios';

axios.defaults.withCredentials = true;

export const apiUrl = "http://localhost:8000";

const ax = axios.create({
  baseURL: apiUrl,
  withCredentials: true, 
});

// Interceptor para agregar el token en cada solicitud
ax.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

ax.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const statusCode = error.response.status;
    // Si la respuesta es 401 y no es un intento de refresh, intenta renovar el token
    if ((statusCode === 401) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Crear FormData para enviar el refresh token en el formato esperado por el backend
        const formData = new FormData();
        formData.append("refresh", refreshToken);

        const response = await ax.post("api/refresh/", formData);

        // Guardar el nuevo token y reintentar la solicitud original
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", refreshToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

        return ax(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, limpiar storage y redirigir al login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  axios: ax,

  auth: {
    login: (data) => ax.post("api/login/", data),
    logout: (refresh) => ax.post("api/logout/", {refresh})
  },
  shares: {
    get: ({ tipo, usuario_id, fecha } = {}) =>
      ax.get("api/shares/", {
      params: { tipo, usuario_id, fecha }
    })
}

};

export default api;