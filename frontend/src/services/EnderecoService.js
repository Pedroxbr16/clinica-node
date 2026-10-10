export const buscarEnderecoPorCep = async (cep) => {
  const cleanedCep = String(cep).replace(/\D/g, '');
  if (cleanedCep.length !== 8) return null;
  const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
  const endereco = await response.json();
  if (!response.ok || endereco.erro) throw new Error('CEP não encontrado.');
  return endereco;
};
