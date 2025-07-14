const API_URL = process.env.REACT_APP_API_URL;

export async function criarAtendente(formData) {
  try {
    const response = await fetch(`${API_URL}/atendente/criar`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao criar atendente');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }

    return data;
  } catch (error) {
    console.error('[criarAtendente] →', error);
    throw error;
  }
}


export async function listarAtendentes() {
  try {
    const response = await fetch(`${API_URL}/atendente/listar`, {
      method: 'GET',               
      headers: {
        'Accept': 'application/json'
      },
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao listar atendente(s)');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }

    return data;
  } catch (error) {
    console.error('[listarAtendentes] →', error);
    throw error;
  }
}

export async function atualizarAtendente(id, formdata) {
    const response = await fetch(`${API_URL}/atendente/atualizar/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
      },
      body: formdata,
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao editar atendente');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
}

export async function excluirAtendente(id) {
  const response = await fetch(`${API_URL}/atendente/excluir/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const err = new Error(data.message || 'Erro ao excluir atendente');
    err.status = response.status;
    err.details = data.errors;
    throw err;
  }
  return data;
}

export async function buscarAtendenteById(id) {
  const response = await fetch(`${API_URL}/atendente/buscar/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const err = new Error(data.message || 'Erro ao buscar atendente pelo ID');
    err.status = response.status;
    err.details = data.errors;
    throw err;
  }
  return data;
}

