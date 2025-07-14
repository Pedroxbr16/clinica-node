const API_URL = process.env.REACT_APP_API_URL;

export async function listarHistoricos() {
    try {
        const response = await fetch(`${API_URL}/historico/listar`, {
            method: 'GET',               
            headers: {
                'Accept': 'application/json'
            },
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error(data.message || 'Erro ao listar históricos');
            err.status = response.status;
            err.details = data.errors;
            throw err;
        }
        return data;
    } catch (err) {
        throw err;
    }
}

export async function adicionarHistorico(formdata) {
    try {
        const response = await fetch(`${API_URL}/historico/adicionar`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error(data.message || 'Erro ao adicionar histórico');
            err.status = response.status;
            err.details = data.errors;
            throw err;
        }
        return data;
    } catch (err) {
        throw err;
    }
}

export async function atualizarHistorico(id, formdata) {
    try {
        const response = await fetch(`${API_URL}/historico/atualizar/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata)
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error(data.message || 'Erro ao atualizar histórico');
            err.status = response.status;
            err.details = data.errors;
            throw err;
        }
        return data;
    } catch (err) {
        throw err;
    }
}

export async function excluirHistorico(id) {
    try {
        const response = await fetch(`${API_URL}/historico/excluir`,{
            method: 'DELETE',
            headers:{
                'Accept': 'application/json'
            },  
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error(data.message || 'Erro ao excluir históricio')
            err.status = response.status;
            err.details = data.errors;
            throw err;
        }
        return data;
    }catch(error){
        console.error('[excluirHistorico] →', error);
        throw error;
    }
}

export async function buscarHistoricoPorPaciente(pacienteId) {
    try {
        const response = await fetch(`${API_URL}/historico/buscar/${pacienteId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error(data.message || 'Erro ao buscar histórico');
            err.status = response.status;
            err.details = data.errors;
            throw err;
        }
        return data;
    } catch (err) {
        throw err;
    }       
    
}