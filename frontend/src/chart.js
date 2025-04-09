import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

const FinancialDashboard = () => {
  const [filters, setFilters] = useState({ month: "", year: "" });
  const [indicators, setIndicators] = useState({
    totalRevenue: 0,
    totalAppointments: 0,
  });
  const [chartData, setChartData] = useState({
    revenue: [],
    labels: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filters.month && filters.year) {
      fetchDashboardData();
    }
  }, [filters]);

  const fetchDashboardData = () => {
    setLoading(true);

    // Simulação de dados
    const allData = JSON.parse(localStorage.getItem("financeData")) || [];

    const filtered = allData.filter((item) => {
      const date = new Date(item.date);
      return (
        date.getMonth() + 1 === parseInt(filters.month) &&
        date.getFullYear() === parseInt(filters.year)
      );
    });

    const groupedByDay = {};

    filtered.forEach((item) => {
      const day = new Date(item.date).getDate();
      if (!groupedByDay[day]) groupedByDay[day] = 0;
      groupedByDay[day] += parseFloat(item.amount);
    });

    const labels = Object.keys(groupedByDay).map((day) => `Dia ${day}`);
    const revenueChartData = Object.values(groupedByDay);

    const totalRevenue = filtered.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const totalAppointments = filtered.length;

    setIndicators({
      totalRevenue,
      totalAppointments,
    });

    setChartData({
      revenue: revenueChartData,
      labels,
    });

    setLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard Financeiro</h2>

      {/* Filtros */}
      <Form className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Mês</Form.Label>
              <Form.Select name="month" value={filters.month} onChange={handleFilterChange}>
                <option value="">Selecione o mês</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Ano</Form.Label>
              <Form.Select name="year" value={filters.year} onChange={handleFilterChange}>
                <option value="">Selecione o ano</option>
                {[...Array(5)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex align-items-end">
            <Button onClick={fetchDashboardData} className="w-100" disabled={loading}>
              {loading ? "Carregando..." : "Atualizar"}
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Indicadores */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Receita Total</Card.Title>
              <Card.Text>R$ {indicators.totalRevenue.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total de Consultas</Card.Title>
              <Card.Text>{indicators.totalAppointments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Gráficos */}
      <Row>
        <Col md={6}>
          <h4>Receita por Dia</h4>
          <Bar
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: "Receita",
                  data: chartData.revenue,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            }}
          />
        </Col>
        <Col md={6}>
          <h4>Distribuição de Receitas</h4>
          <Doughnut
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: "Receita",
                  data: chartData.revenue,
                  backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#e91e63", "#9c27b0"],
                },
              ],
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FinancialDashboard;
