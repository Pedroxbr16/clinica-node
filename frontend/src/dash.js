// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Dashboard = () => {
//   const [totalPacientes, setTotalPacientes] = useState(0);
//   const [consultasHoje, setConsultasHoje] = useState(0);
//   const [ocupacaoMedicos, setOcupacaoMedicos] = useState([]);
  
//   useEffect(() => {
//     // Funções para buscar os dados da API
//     const fetchTotalPacientes = async () => {
//       try {
//         const response = await axios.get('/api/pacientes/total');
//         setTotalPacientes(response.data.total);
//       } catch (error) {
//         console.error('Erro ao buscar total de pacientes:', error);
//       }
//     };
    
//     const fetchConsultasHoje = async () => {
//       try {
//         const response = await axios.get('/api/consultas/hoje');
//         setConsultasHoje(response.data.total);
//       } catch (error) {
//         console.error('Erro ao buscar consultas de hoje:', error);
//       }
//     };

//     const fetchOcupacaoMedicos = async () => {
//       try {
//         const response = await axios.get('/api/ocupacao-medicos');
//         setOcupacaoMedicos(response.data);
//       } catch (error) {
//         console.error('Erro ao buscar ocupação dos médicos:', error);
//       }
//     };

//     // Chama as funções para carregar os dados
//     fetchTotalPacientes();
//     fetchConsultasHoje();
//     fetchOcupacaoMedicos();
//   }, []);

//   // Configuração do gráfico de ocupação dos médicos
//   const chartData = {
//     labels: ocupacaoMedicos.map((medico) => medico.nome),
//     datasets: [
//       {
//         label: 'Ocupação (%)',
//         data: ocupacaoMedicos.map((medico) => medico.ocupacao),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   // Componente de Card para reutilização
//   const CardInfo = ({ title, value, icon }) => (
//     <div className="col-md-4">
//       <div className="card shadow-sm p-3 mb-4 bg-white rounded text-center">
//         <div className="card-body">
//           <h5 className="card-title">{title}</h5>
//           <p className="card-text display-4">{value}</p>
//           {icon && <i className={`fa fa-${icon} fa-2x`}></i>}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Dashboard da Clínica</h2>
//       <div className="row">
//         <CardInfo title="Pacientes Ativos" value={totalPacientes} icon="users" />
//         <CardInfo title="Consultas Hoje" value={consultasHoje} icon="calendar" />
//         <CardInfo title="Total de Médicos" value={ocupacaoMedicos.length} icon="user-md" />
//       </div>
//       <div className="row mt-4">
//         <div className="col-12">
//           <div className="card p-4 shadow-sm rounded">
//             <h4 className="text-center">Ocupação dos Médicos</h4>
//             <Bar data={chartData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
