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
  });
  const [usuarios, setUsuarios] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPagamentos();
    fetchUsuarios();
    fetchPacientes();
  }, []);

  const fetchPagamentos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/pagamentos/buscar");
      setPagamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar pagamentos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get("http://localhost:5000/atendente/atendente");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error.message);
    }
  };

  const fetchPacientes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pacientes/pacientes");
      setPacientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
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
      metodo: pagamento.metodo,
      usuario_id: pagamento.usuario_id,
      paciente_id: pagamento.paciente_id,
    });
    setEditingId(pagamento.id);
    setShowModal(true);
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
    setFormData({ metodo: "", usuario_id: "", paciente_id: "" });
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
                <td colSpan="6" className="text-center">
                  Nenhum pagamento encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal de Cadastro/Edição */}
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
