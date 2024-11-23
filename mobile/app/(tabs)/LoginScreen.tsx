import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios, { AxiosError } from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./types";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Tipar navegação

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.1.8:5000/user/login", {
        email,
        password,
      });

      if (response.data.user) {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        setEmail(""); // Reseta o campo email
        setPassword(""); // Reseta o campo senha
        navigation.navigate("HomeScreen", { name: response.data.user.name, userId: response.data.user.id }); // Passa nome e id
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
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />

      <Button
        title="Criar Conta"
        onPress={() => navigation.navigate("CreateAccountScreen")}
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
