import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios, { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        email,
        password,
      });

      if (response.data.user) {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        setEmail("");
        setPassword("");
        navigation.navigate("HomeScreen", {
          name: response.data.user.name,
          userId: response.data.user.id,
        });
      } else {
        Alert.alert("Erro", "Credenciais inválidas.");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert("Erro", error.response?.data?.message || "Erro ao fazer login.");
      } else {
        Alert.alert("Erro", "Erro desconhecido ao fazer login.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("CreateAccountScreen")}
      >
        <Text style={styles.secondaryButtonText}>Criar Conta</Text>
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
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
    color: "#333",
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
  secondaryButton: {
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#007BFF",
    fontSize: 16,
  },
});
