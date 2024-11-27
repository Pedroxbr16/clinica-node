import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios, { AxiosError } from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { API_URL } from "@env";

export default function CreateAccountScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleCreateAccount = async () => {
    console.log("Iniciando criação de conta...");
    console.log("Dados fornecidos:", { name, email, password });

    if (!name || !email || !password) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      console.log("Erro: Campos obrigatórios não preenchidos.");
      return;
    }

    try {
      console.log("Enviando dados para o backend:", { name, email, password });
      const response = await axios.post(`${API_URL}/user/criar`, {
        name,
        email,
        password,
      });

      console.log("Resposta do backend:", response.data);

      if (response.status === 201) {
        Alert.alert("Sucesso", "Conta criada com sucesso! Faça login.");
        console.log("Conta criada com sucesso. Redirecionando para LoginScreen.");
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("LoginScreen");
      } else {
        console.log("Resposta inesperada:", response.status);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Erro do Axios:", error.response?.data || error.message);
        Alert.alert("Erro", error.response?.data?.message || "Erro ao criar a conta.");
      } else {
        console.error("Erro desconhecido:", error);
        Alert.alert("Erro", "Erro desconhecido ao criar a conta.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={(text) => {
          console.log("Atualizando nome:", text);
          setName(text);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={(text) => {
          console.log("Atualizando email:", text);
          setEmail(text);
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={(text) => {
          console.log("Atualizando senha.");
          setPassword(text);
        }}
        secureTextEntry
      />

      <Button title="Criar Conta" onPress={handleCreateAccount} />

      <Button
        title="Já tenho uma conta"
        onPress={() => {
          console.log("Redirecionando para LoginScreen.");
          navigation.navigate("LoginScreen");
        }}
        color="gray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
