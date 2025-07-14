const API_URL = process.env.REACT_APP_API_URL;

export async function listarExames() {
    try {
        const response = await fetch(`${API_URL}/exame/listar`, {
            method: 'GET',                // opcional, pois é o default
            headers: {
                'Accept': 'application/json'
            },
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error(data.message || 'Erro ao listar exames');
            err.status = response.status;
            err.details = data.errors;
            throw err;
        }

        return data;
    } catch (error) {
        console.error('[listarExames] →', error);
        throw error;
    }
}

export async function criarExame(formdata) {
    try {
        const response = await fetch(`${API_URL}/exame/criar`, {
            method: 'POST',                // opcional, pois é o default
            headers: {
                'Accept': 'application/json'
            },
            body: formdata
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error(data.message || 'Erro ao criar exame');
            err.status = response.status;
            err.details = data.errors;
            throw err;
        }

        return data;
    } catch (error) {
        console.error('[criarExame] →', error);
        throw error;
    }
}

export async function atualizarExame(id, formdata) {
    try {
        const response = await fetch(`${API_URL}/exame/atualizard/${id}`, {
            method: 'PUT',                // opcional, pois é o default
            headers: {
                'Accept': 'application/json'
            },
            body: formdata
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error(data.message || 'Erro ao editar exame');
            err.status = response.status;
            err.details = data.errors;
            throw err;
        }

        return data;
    } catch (error) {
        console.error('[editarExame] →', error);
        throw error;
    }
}

export async function excluirExame(id) {
    try {
        const response = await fetch(`${API_URL}/exame/excluir/${id}`, {
            method: 'DELETE',                // opcional, pois é o default
            headers: {
                'Accept': 'application/json'
            },
        });
        const data = await response.json();
        if (!response.ok) {
            const err = new Error(data.message || 'Erro ao excluir exame');
            err.status = response.status;
            err.details = data.errors;
            throw err;
        }

        return data;
    } catch (error) {
        console.error('[excluirExame] →', error);
        throw error;
    }
}