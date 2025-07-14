const API_URL = process.env.REACT_APP_API_URL;

export async function criarPaciente(formData) {
  try {
    const response = await fetch(`${API_URL}/pacientes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao criar paciente');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[criarPaciente] →', error);
    throw error;
  }
}

export async function listarPacientes() {
  try {
    const response = await fetch(`${API_URL}/pacientes`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao listar pacientes');
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

export async function buscarPacientePorId(id) {
  try {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao buscar paciente por ID');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[buscarPacientePorId] →', error);
    throw error;
  }
}

export async function buscarPacientePorCpf(cpf) {
  try {
    const response = await fetch(`${API_URL}/pacientes/cpf/${cpf}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao buscar paciente por CPF');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[buscarPacientePorCpf] →', error);
    throw error;
  }
}

export async function atualizarPaciente(id, formData) {
  try {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao atualizar paciente');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[atualizarPaciente] →', error);
    throw error;
  }
}

export async function excluirPaciente(id) {
  try {
    const response = await fetch(`${API_URL}/pacientes/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao excluir paciente');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[excluirPaciente] →', error);
    throw error;
  }
}
