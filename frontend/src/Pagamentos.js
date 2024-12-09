import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Table, Button, Modal, Form } from "react-bootstrap";

const PagamentoScreen = () => {
  const [pagamentos, setPagamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    metodo: "",
    usuario_id: "",
    paciente_id: "",
    medico_id: "",
    tipo_consulta_id: "",
  });
  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [tiposConsulta, setTiposConsulta] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchPagamentos(),
        fetchUsuarios(),
        fetchPacientes(),
        fetchMedicos(),
        fetchTiposConsulta(),
      ]);
    } catch (error) {
      console.error("Erro ao carregar os dados:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPagamentos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pagamentos/buscar");
      setPagamentos(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error.message);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/atendente/atendente");
      setUsuarios(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error.message);
    }
  };

  const fetchPacientes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pacientes/pacientes");
      setPacientes(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error.message);
    }
  };

  const fetchMedicos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/medicos/medicos");
      setMedicos(response.data.data || []);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error.message);
    }
  };

  const fetchTiposConsulta = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tipos_consulta/lista");
      setTiposConsulta(
        response.data.map((tipo) => ({
          id: tipo.id,
          descricao: `${tipo.descricao} - R$ ${parseFloat(tipo.valor).toFixed(2)}`,
        }))
      );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao buscar tipos de consulta.",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("Dados do formulário:", formData); // Debugging
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/pagamentos/${editingId}`, formData);
        Swal.fire("Sucesso", "Pagamento atualizado com sucesso!", "success");
      } else {
        await axios.post("http://localhost:5000/pagamentos/criar", formData);
        Swal.fire("Sucesso", "Pagamento criado com sucesso!", "success");
      }
      fetchPagamentos();
      setShowModal(false);
      resetForm();
    } catch (error) {
      Swal.fire("Erro", "Não foi possível salvar o pagamento!", "error");
      console.error("Erro ao salvar pagamento:", error.message);
    }
  };
  const handleEdit = (pagamento) => {
    setFormData({
      metodo: pagamento.metodo || "", // Garantir que o valor exista ou definir como vazio
      usuario_id: pagamento.usuario_id || "",
      paciente_id: pagamento.paciente_id || "",
      medico_id: pagamento.medico_id || "",
      tipo_consulta_id: pagamento.tipo_consulta_id || "",
    });
    setEditingId(pagamento.id); // Define o ID do item sendo editado
    setShowModal(true); // Exibe o modal de edição
  };
  

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter esta ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/pagamentos/${id}`);
          Swal.fire("Excluído!", "O pagamento foi excluído com sucesso.", "success");
          fetchPagamentos();
        } catch (error) {
          Swal.fire("Erro", "Não foi possível excluir o pagamento!", "error");
          console.error("Erro ao deletar pagamento:", error.message);
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({
      metodo: "",
      usuario_id: "",
      paciente_id: "",
      medico_id: "",
      tipo_consulta_id: "",
    });
    setEditingId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gerenciar Pagamentos</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Novo Pagamento
      </Button>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Método</th>
              <th>Data</th>
              <th>Usuário</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Tipo de Consulta</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.length > 0 ? (
              pagamentos.map((pagamento) => (
                <tr key={pagamento.id}>
                  <td>{pagamento.id}</td>
                  <td>{pagamento.metodo}</td>
                  <td>{new Date(pagamento.data).toLocaleString()}</td>
                  <td>{pagamento.usuario_nome}</td>
                  <td>{pagamento.paciente_nome}</td>
                  <td>{pagamento.medico_nome}</td>
                  <td>{pagamento.tipo_consulta}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(pagamento)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(pagamento.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Nenhum pagamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingId ? "Editar Pagamento" : "Novo Pagamento"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Método</Form.Label>
              <Form.Select
                name="metodo"
                value={formData.metodo}
                onChange={handleInputChange}
              >
                <option value="">Selecione o método</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao_credito">Cartão de Crédito</option>
                <option value="cartao_debito">Cartão de Débito</option>
                <option value="pix">PIX</option>
                <option value="outro">Outro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usuário</Form.Label>
              <Form.Select
                name="usuario_id"
                value={formData.usuario_id}
                onChange={handleInputChange}
              >
                <option value="">Selecione o usuário</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nome || usuario.usuario}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Paciente</Form.Label>
              <Form.Select
                name="paciente_id"
                value={formData.paciente_id}
                onChange={handleInputChange}
              >
                <option value="">Selecione o paciente</option>
                {pacientes.map((paciente) => (
                  <option key={paciente.id} value={paciente.id}>
                    {paciente.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
  <Form.Label>Médico</Form.Label>
  <Form.Select
    name="medico_id"
    value={formData.medico_id}
    onChange={handleInputChange}
  >
    <option value="">Selecione o médico</option>
    {medicos.map((medico) => (
      <option key={medico.id} value={medico.id}>
        {medico.usuario || medico.nome} {/* Exibe usuário ou nome */}
      </option>
    ))}
  </Form.Select>
</Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Consulta</Form.Label>
              <Form.Select
                name="tipo_consulta_id"
                value={formData.tipo_consulta_id}
                onChange={handleInputChange}
              >
                <option value="">Selecione o tipo de consulta</option>
                {tiposConsulta.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.descricao}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PagamentoScreen;
