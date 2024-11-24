import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios, { AxiosError } from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { API_URL } from '@env';


export default function CreateAccountScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NavigationProp<any>>();

  const handleCreateAccount = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/user/criar`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Conta criada com sucesso! Faça login.");
        setName(""); // Reseta nome
        setEmail(""); // Reseta email
        setPassword(""); // Reseta senha
        navigation.navigate("LoginScreen");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert("Erro", error.response?.data?.message || "Erro ao criar a conta.");
      } else {
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
        onChangeText={setName}
      />

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

      <Button title="Criar Conta" onPress={handleCreateAccount} />

      <Button
        title="Já tenho uma conta"
        onPress={() => navigation.navigate("LoginScreen")}
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
