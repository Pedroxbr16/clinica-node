const API_URL = process.env.REACT_APP_API_URL;

export async function criarConsulta(formdata){
    const response = await fetch(`${API_URL}/consultas/criar`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
        body: formdata,
    });
    const data = await response.json();
    if (!response.ok) {
        const err = new Error(data.message || 'Erro ao criar consulta');
        err.status = response.status;
        err.details = data.errors;
        throw err;
    }
    return data;
}

export async function listarConsultas(){
    const response = await fetch(`${API_URL}/consultas/listar`, {
        method: 'GET',                
        headers: {
            'Accept': 'application/json'
        },
    });
    const data = await response.json();
    if (!response.ok) {
        const err = new Error(data.message || 'Erro ao listar consulta(s)');
        err.status = response.status;
        err.details = data.errors;
        throw err;
    }
    return data;
}

export async function BuscarConsultaById(id){
    const response = await fetch(`${API_URL}/consultas/buscar/${id}`, {
        method: 'GET',                
        headers: {
            'Accept': 'application/json'
        },
    });
    const data = await response.json();
    if (!response.ok) {
        const err = new Error(data.message || 'Erro ao buscar consulta pelo ID');
        err.status = response.status;
        err.details = data.errors;
        throw err;
    }
    return data;
}

export async function atualizarConsulta (id, formdata){
    const response = await fetch(`${API_URL}/consultas/atualizar/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
        },
        body: formdata,
    });
    const data = await response.json();
    if (!response.ok) {
        const err = new Error(data.message || 'Erro ao atualizar consulta');
        err.status = response.status;
        err.details = data.errors;
        throw err;
    }
    return data;
}

export async function excluirConsulta(id){
    const response = await fetch(`${API_URL}/consultas/excluir/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        },
    });
    const data = await response.json();
    if (!response.ok) {
        const err = new Error(data.message || 'Erro ao excluir consulta');
        err.status = response.status;
        err.details = data.errors;
        throw err;
    }
    return data;
}

export async function getHorariosDisponiveis(){
    const response = await fetch(`${API_URL}/consultas/horarios`, {
        method: 'GET',                // opcional, pois é o default
        headers: {
            'Accept': 'application/json'
        },
    });
    const data = await response.json();
    if (!response.ok) {
        const err = new Error(data.message || 'Erro ao listar horários disponíveis');
        err.status = response.status;
        err.details = data.errors;
        throw err;
    }
    return data;
}