const API_URL = process.env.REACT_APP_API_URL;

export async function login(formdata) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
        });
    
        const data = await response.json();
        return data;   
}