const baseUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const request = async (path, { method = 'GET', body, headers = {} } = {}) => {
  const isFormData = body instanceof FormData;
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || data.message || 'Não foi possível concluir a requisição.');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
};
