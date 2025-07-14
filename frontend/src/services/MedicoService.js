const API_URL = process.env.REACT_APP_API_URL;

export async function criarMedico(formdata) {  
    try {
        const response = await fetch(`${API_URL}/medicos/medicos`, {
            method: 'POST',
            body: formdata,
        });
        const medicos = await response.json();
        return medicos;
    } catch (error) {
        console.error('Erro ao buscar médicos:', error);
        return [];
    }
    
}
export async function buscarMedicos() {
    try {
        const response = await fetch(`${API_URL}/medicos/medicos`);
        const medicos = await response.json();
        return medicos;
    } catch (error) {
        console.error('Erro ao buscar médicos:', error);
        return [];
    }
}

export async function buscarMedicoById(id) {
    try {
        const response = await fetch(`${API_URL}/medicos/medicos/${id}`);
        const medicos = await response.json();
        return medicos;
    } catch (error) {
        console.error('Erro ao buscar médicos:', error);
        return [];
    }
}

export async function atualizarMedico(id, formdata) {
    try {
        const response = await fetch(`${API_URL}/medicos/medicos/${id}`, {
            method: 'PUT',
            body: formdata,
        });
        const medicos = await response.json();
        return medicos;
    } catch (error) {
        console.error('Erro ao buscar médicos:', error);
        return [];
    }
}

export async function excluirMedico(id) {
    try {
        const response = await fetch(`${API_URL}/medicos/medicos/${id}`, {
            method: 'DELETE',
        });
        const medicos = await response.json();
        return medicos;
    } catch (error) {
        console.error('Erro ao buscar médicos:', error);
        return [];
    }
    
}
