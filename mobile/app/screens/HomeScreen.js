import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, name } = route.params || {}; // Garantir que params não seja undefined

  const handleLogout = () => {
    navigation.navigate("LoginScreen");
  };

  const handleSettings = () => {
    navigation.navigate("SettingsScreen", { userId });
  };

  const handlePreAgendamento = () => {
    console.log("Navegando para PreAgendamentoScreen:", { userId, name });
    navigation.navigate("PreAgendamentoScreen", { userId, name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Clínica, {name}!</Text>

      {/* Botão de Sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

      {/* Botão de Configurações */}
      <TouchableOpacity style={styles.button} onPress={handleSettings}>
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>

      {/* Botão de Pré-Agendamento */}
      <TouchableOpacity style={styles.button} onPress={handlePreAgendamento}>
        <Text style={styles.buttonText}>Criar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF4D4D",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
