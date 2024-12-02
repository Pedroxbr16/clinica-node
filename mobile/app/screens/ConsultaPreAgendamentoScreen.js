import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { API_URL } from "@env";

export default function PreAgendamentosScreen() {
  const route = useRoute();
  const { userId } = route.params || {};
  const [preAgendamentos, setPreAgendamentos] = useState([]);
  const [medicosMap, setMedicosMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  const fetchMedicos = async () => {
    try {
      const response = await axios.get(`${API_URL}/medicos/medicos`);
      const medicosData = response.data.data.reduce((acc, medico) => {
        acc[medico.id] = medico.usuario;
        return acc;
      }, {});
      setMedicosMap(medicosData);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error.message);
      throw error;
    }
  };

  const fetchPreAgendamentos = async (userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/pre-agendamentos/usuario/${userId}`
      );
      return response.data.data.map((agendamento) => ({
        ...agendamento,
        data: new Date(agendamento.data_desejada).toLocaleString("pt-BR", {
          timeZone: "UTC",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    } catch (error) {
      console.error("Erro ao buscar pré-agendamentos:", error.message);
      throw error;
    }
  };

  const carregarDados = async () => {
    try {
      setLoading(true);
      await fetchMedicos();
      const agendamentos = await fetchPreAgendamentos(userId);
      setPreAgendamentos(agendamentos);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível carregar os dados. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        Médico: {medicosMap[item.medico_id] || "Não encontrado"}
      </Text>
      <Text style={styles.cardText}>Modalidade: {item.modalidade}</Text>
      <Text style={styles.cardText}>Data: {item.data}</Text>
      <Text style={styles.cardText}>Horário: {item.data.split(" ")[1]}</Text>
      <Text style={styles.cardText}>Status: {item.status}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Pré-Agendamentos</Text>
      {preAgendamentos.length === 0 ? (
        <Text style={styles.emptyText}>
          Nenhum pré-agendamento encontrado.
        </Text>
      ) : (
        <FlatList
          data={preAgendamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    color: "#aaa",
    marginTop: 50,
  },
});
