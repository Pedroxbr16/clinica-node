import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const storedPagamentos = JSON.parse(localStorage.getItem("pagamentos")) || [];
    const storedUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const storedPacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const storedMedicos = JSON.parse(localStorage.getItem("medicos")) || [];
    const storedTipos = JSON.parse(localStorage.getItem("tiposConsulta")) || [];

    setPagamentos(storedPagamentos);
    setUsuarios(storedUsuarios);
    setPacientes(storedPacientes);
    setMedicos(storedMedicos);
    setTiposConsulta(
      storedTipos.map((tipo) => ({
        id: tipo.id,
        descricao: `${tipo.descricao} - R$ ${parseFloat(tipo.valor).toFixed(2)}`,
      }))
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getNomeById = (arr, id) => {
    const found = arr.find((item) => item.id.toString() === id?.toString());
    return found?.usuario || found?.nome || "Desconhecido";
  };

  const handleSubmit = () => {
    const updated = [...pagamentos];
    if (editingId) {
      const index = updated.findIndex((p) => p.id === editingId);
      updated[index] = { ...updated[index], ...formData };
    } else {
      const novo = {
        id: Date.now(),
        data: new Date().toISOString(),
        ...formData,
      };
      updated.push(novo);
    }

    setPagamentos(updated);
    localStorage.setItem("pagamentos", JSON.stringify(updated));
    setShowModal(false);
    resetForm();
    Swal.fire("Sucesso", "Pagamento salvo com sucesso!", "success");
  };

  const handleEdit = (pagamento) => {
    setFormData({
      metodo: pagamento.metodo || "",
      usuario_id: pagamento.usuario_id || "",
      paciente_id: pagamento.paciente_id || "",
      medico_id: pagamento.medico_id || "",
      tipo_consulta_id: pagamento.tipo_consulta_id || "",
    });
    setEditingId(pagamento.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const atualizados = pagamentos.filter((p) => p.id !== id);
        setPagamentos(atualizados);
        localStorage.setItem("pagamentos", JSON.stringify(atualizados));
        Swal.fire("Excluído!", "Pagamento removido com sucesso.", "success");
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
                <td>{getNomeById(usuarios, pagamento.usuario_id)}</td>
                <td>{getNomeById(pacientes, pagamento.paciente_id)}</td>
                <td>{getNomeById(medicos, pagamento.medico_id)}</td>
                <td>
                  {
                    tiposConsulta.find(
                      (t) => t.id.toString() === pagamento.tipo_consulta_id?.toString()
                    )?.descricao || "-"
                  }
                </td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEdit(pagamento)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(pagamento.id)}>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Editar Pagamento" : "Novo Pagamento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Método</Form.Label>
              <Form.Select name="metodo" value={formData.metodo} onChange={handleInputChange}>
                <option value="">Selecione</option>
                <option value="dinheiro">Dinheiro</option>
                <option value="cartao_credito">Cartão de Crédito</option>
                <option value="cartao_debito">Cartão de Débito</option>
                <option value="pix">PIX</option>
                <option value="outro">Outro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usuário</Form.Label>
              <Form.Select name="usuario_id" value={formData.usuario_id} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.usuario || u.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Paciente</Form.Label>
              <Form.Select name="paciente_id" value={formData.paciente_id} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Médico</Form.Label>
              <Form.Select name="medico_id" value={formData.medico_id} onChange={handleInputChange}>
                <option value="">Selecione</option>
                {medicos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.usuario || m.nome}
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
                <option value="">Selecione</option>
                {tiposConsulta.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.descricao}
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
