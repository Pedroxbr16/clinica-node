const API_URL = process.env.REACT_APP_API_URL;

export async function buscarpagamentos() {
      try {
    const response = await fetch(`${API_URL}/pacientes`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao listar pagamentos');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[buscarpagamentos] →', error);
    throw error;
  }
}

export async function createPagamento(formdata) {
     try {
        const response = await fetch(`${API_URL}/pacientes`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formdata
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
        console.error('[createPagamento] →', error);
        throw error;
      }
}

export async function updatePagamento(id, formdata) {
     try {
    const response = await fetch(`${API_URL}/pagamentos/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json'
      },
      body: formdata
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao atualizar pagamentos');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[updatePagamento] →', error);
    throw error;
  }
}

export async function deletePagamento(id) {
    try {
    const response = await fetch(`${API_URL}/pagamento/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Erro ao excluir pagamento');
      err.status = response.status;
      err.details = data.errors;
      throw err;
    }
    return data;
  } catch (error) {
    console.error('[deletePagamento] →', error);
    throw error;
  }
}