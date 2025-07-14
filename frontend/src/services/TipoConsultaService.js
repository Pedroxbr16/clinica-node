const API_URL = process.env.REACT_APP_API_URL;

export async function criarTipoConsulta(formData) {
  try {
    const response = await fetch(`${API_URL}/TipoConsulta`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao criar Tipo de consulta');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[criarPacriarTipoConsultaciente] →', error);
    throw error;
  }
}

export async function listaTipoConsulta() {
  try {
    const response = await fetch(`${API_URL}/TipoConsulta`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao listar tipo(s) de consulta');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[listarPacientes] →', error);
    throw error;
  }
}


export async function buscarTipoConsultaPorId(id) {
  try {
    const response = await fetch(`${API_URL}/TipoConsulta/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao buscar Tipo de Consulta por ID');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[buscarTipoConsultaPorId] →', error);
    throw error;
  }
}

export async function atualizarTipoConsulta(id, formData) {
  try {
    const response = await fetch(`${API_URL}/TipoConsulta/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao atualizar Tipo de Consulta');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[atualizarTipoConsulta] →', error);
    throw error;
  }
}

export async function excluirTipoConsulta(id) {
  try {
    const response = await fetch(`${API_URL}/TipoConsulta/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao excluir Tipo de Consulta');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[excluirTipoConsulta] →', error);
    throw error;
  }
}
