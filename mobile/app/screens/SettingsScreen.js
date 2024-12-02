import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL } from "@env";

export default function SettingsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Remove formatação do CPF
  const removeCpfFormatting = (cpf) => cpf.replace(/\D/g, "");

  // Formata o CPF dinamicamente para exibição
  const formatCpf = (text) => {
    const unformatted = text.replace(/\D/g, "").slice(0, 11); // Limita a 11 caracteres numéricos
    const formatted = unformatted
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return formatted;
  };

  // Converte a data de nascimento para o formato ISO
  const formatDateToISO = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  // Formata a data de nascimento para exibição no formato DD/MM/YYYY
  const formatDateToDisplay = (isoDate) => {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  // Busca os dados do usuário no backend
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/buscar/${userId}`);
      const { name, email, password, cpf, data_de_nascimento, genero } =
        response.data;

      setName(name);
      setEmail(email);
      setPassword(password);
      setCpf(formatCpf(cpf)); // Formata o CPF para exibição
      setDataNascimento(formatDateToDisplay(data_de_nascimento)); // Formata a data para exibição
      setGenero(genero);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar os dados do usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  // Atualiza os dados do usuário no backend
  const handleUpdate = async () => {
    if (!name || !email || !password || !cpf || !dataNascimento || !genero) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    // Remove formatação do CPF e converte a data de nascimento para o formato ISO
    const numericCpf = removeCpfFormatting(cpf); // Remove pontos e traços
    const formattedDate = formatDateToISO(dataNascimento); // Converte data para YYYY-MM-DD

    try {
      await axios.put(`${API_URL}/user/atualizar/${userId}`, {
        name,
        email,
        password,
        cpf: numericCpf, // CPF sem formatação
        data_de_nascimento: formattedDate, // Envia data formatada para o backend
        genero,
      });
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível atualizar os dados."
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Configurações</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua nova senha"
            secureTextEntry
          />

          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            value={cpf}
            onChangeText={(text) => setCpf(formatCpf(text))} // Aplica a formatação
            placeholder="Digite seu CPF"
            keyboardType="numeric"
            maxLength={14} // Limita a quantidade de caracteres no campo formatado
          />

          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            value={dataNascimento}
            onChangeText={setDataNascimento}
            placeholder="Digite sua data de nascimento (DD/MM/YYYY)"
          />

          <Text style={styles.label}>Gênero</Text>
          <Picker
            selectedValue={genero}
            style={styles.input}
            onValueChange={(itemValue) => setGenero(itemValue)}
          >
            <Picker.Item label="Selecione o gênero" value="" />
            <Picker.Item label="Masculino" value="Masculino" />
            <Picker.Item label="Feminino" value="Feminino" />
            <Picker.Item label="Outro" value="Outro" />
          </Picker>

          <Button title="Salvar Alterações" onPress={handleUpdate} />

          <Button
            title="Voltar"
            onPress={() => navigation.navigate("HomeScreen", { name, userId })}
            color="gray"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});
