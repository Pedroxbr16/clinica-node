import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PreAgendamentoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, name } = route.params || {};

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [modalidade, setModalidade] = useState(null);
  const [date, setDate] = useState(new Date()); // Data padrão definida
  const [showDatePicker, setShowDatePicker] = useState(false); // Controle interno da seleção de data
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [doctorsList, setDoctorsList] = useState([]);

  const horariosFixos = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];
  const modalidades = [
    { label: "Presencial", value: "presencial" },
    { label: "Online", value: "online" },
  ];

  useEffect(() => {
    fetchUserData();
    fetchDoctors();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/buscar/${userId}`);
      const { email, phone } = response.data;
      setEmail(email);
      setPhone(formatPhone(phone));
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar os dados do usuário.");
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/medicos/medicos`);
      const doctorsData = response.data.data.map((doctor) => ({
        label: doctor.usuario,
        value: doctor.id,
      }));
      setDoctorsList(doctorsData);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os médicos.");
    }
  };

  const formatPhone = (text) => {
    const cleaned = text.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  const handlePhoneInput = (text) => {
    setPhone(formatPhone(text));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handlePreCadastro = async () => {
    if (!doctor || !modalidade || !selectedHorario || !email) {
      Alert.alert("Erro", "Preencha todos os campos antes de realizar o pré-cadastro.");
      return;
    }

    try {
      const formattedPhone = phone.replace(/\D/g, "");
      const formattedDate =
        date.toISOString().split("T")[0] + ` ${selectedHorario}`; // Combina a data e o horário
      console.log("Enviando dados para o backend:", {
        userId,
        doctorId: doctor,
        email,
        modalidade,
        date: formattedDate,
        phone: formattedPhone,
      });

      await axios.post(`${API_URL}/pre-agendamentos/criar`, {
        userId,
        doctorId: doctor,
        email,
        modalidade,
        date: formattedDate,
        phone: formattedPhone,
      });

      Alert.alert("Sucesso", "Pré-agendamento realizado com sucesso!");
      navigation.navigate("HomeScreen", { userId, name });
    } catch (error) {
      console.log(
        "Erro na resposta do backend:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível concluir o pré-cadastro."
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.safeContainer} behavior="height">
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Pré-Cadastro</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={name} editable={false} />

          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} value={email} editable={false} />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={handlePhoneInput}
            placeholder="Digite seu telefone"
            keyboardType="phone-pad"
            maxLength={15} // Limita a entrada de telefone
          />

          <Text style={styles.label}>Médico</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={doctor}
              onValueChange={(itemValue) => setDoctor(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione um médico" value={null} />
              {doctorsList.map((doctor) => (
                <Picker.Item
                  key={doctor.value}
                  label={doctor.label}
                  value={doctor.value}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Modalidade</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={modalidade}
              onValueChange={(itemValue) => setModalidade(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione a modalidade" value={null} />
              {modalidades.map((modalidade) => (
                <Picker.Item
                  key={modalidade.value}
                  label={modalidade.label}
                  value={modalidade.value}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>Horário</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedHorario}
              onValueChange={(itemValue) => setSelectedHorario(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Selecione um horário" value={null} />
              {horariosFixos.map((horario) => (
                <Picker.Item key={horario} label={horario} value={horario} />
              ))}
            </Picker>
          </View>

          <Button title="Concluir Pré-Cadastro" onPress={handlePreCadastro} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "500",
  },
});
