import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios, { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

export default function CreateAccountScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const navigation = useNavigation();

  const formatCpf = (text) => {
    return text
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatDataNascimento = (text) => {
    return text
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2");
  };

  // Converte a data de DD/MM/YYYY para YYYY-MM-DD
  const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleCreateAccount = async () => {
    console.log("Iniciando criação de conta...");
    console.log("Dados fornecidos:", { name, email, password, cpf, dataNascimento, genero });
  
    if (!name || !email || !password || !cpf || !dataNascimento || !genero) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      console.log("Erro: Campos obrigatórios não preenchidos.");
      return;
    }
  
    // Remove traços, pontos e outros caracteres do CPF
    const numericCpf = cpf.replace(/\D/g, "");
  
    // Valida o formato da data
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(dataNascimento)) {
      Alert.alert("Erro", "A data de nascimento deve estar no formato DD/MM/YYYY.");
      return;
    }
  
    // Converte a data para o formato YYYY-MM-DD
    const formattedDate = formatDateToISO(dataNascimento);
  
    try {
      console.log("Enviando dados para o backend:", {
        name,
        email,
        password,
        cpf: numericCpf, // CPF limpo, sem formatação
        data_de_nascimento: formattedDate,
        genero,
      });
  
      const response = await axios.post(`${API_URL}/user/criar`, {
        name,
        email,
        password,
        cpf: numericCpf, // CPF limpo
        data_de_nascimento: formattedDate, // Envia no formato correto
        genero,
      });
  
      console.log("Resposta do backend:", response.data);
  
      if (response.status === 201) {
        Alert.alert(
          "Sucesso",
          "Conta criada com sucesso! Faça login.",
          [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
        );
        setName("");
        setEmail("");
        setPassword("");
        setCpf("");
        setDataNascimento("");
        setGenero("");
      } else {
        console.log("Resposta inesperada:", response.status);
        Alert.alert("Erro", "Algo deu errado. Tente novamente.");
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

      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={(text) => {
          const formattedCpf = formatCpf(text);
          console.log("Atualizando CPF:", formattedCpf);
          setCpf(formattedCpf);
        }}
        keyboardType="numeric"
        maxLength={14}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (DD/MM/YYYY)"
        value={dataNascimento}
        onChangeText={(text) => {
          const formattedDate = formatDataNascimento(text);
          console.log("Atualizando Data de Nascimento:", formattedDate);
          setDataNascimento(formattedDate);
        }}
        keyboardType="numeric"
        maxLength={10}
      />

<Picker
  selectedValue={genero}
  style={{ height: 60, backgroundColor: "#fff", borderRadius: 10, borderColor: "#ccc", borderWidth: 1, marginBottom: 15 }}
  onValueChange={(itemValue) => {
    console.log("Atualizando Gênero:", itemValue);
    setGenero(itemValue);
  }}
>
  <Picker.Item label="Selecione o gênero" value="" />
  <Picker.Item label="Masculino" value="Masculino" />
  <Picker.Item label="Feminino" value="Feminino" />
  <Picker.Item label="Outro" value="Outro" />
</Picker>

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
    gap: 10,
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
