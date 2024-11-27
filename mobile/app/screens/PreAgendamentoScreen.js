import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
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
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [doctorsList, setDoctorsList] = useState([]);
  const [openDoctors, setOpenDoctors] = useState(false);
  const [openModalidade, setOpenModalidade] = useState(false);
  const [openHorarios, setOpenHorarios] = useState(false);

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
      setPhone(formatPhone(phone)); // Aplica máscara ao telefone
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
    const cleaned = text.replace(/\D/g, ""); // Remove caracteres não numéricos
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  const handlePhoneInput = (text) => {
    setPhone(formatPhone(text)); // Atualiza o estado com a máscara
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handlePreCadastro = async () => {
    if (!doctor || !modalidade || !date || !selectedHorario || !email) {
      Alert.alert("Erro", "Preencha todos os campos antes de realizar o pré-cadastro.");
      return;
    }
  
    try {
      const formattedPhone = phone.replace(/\D/g, ""); // Remove máscara do telefone
      const formattedDate = date.toISOString().split("T")[0] + ` ${selectedHorario}`;
      console.log("Enviando dados para o backend:", {
        userId,
        doctorId: doctor,
        email, // Inclui o email
        modalidade,
        date: formattedDate,
        phone: formattedPhone,
      });
  
      await axios.post(`${API_URL}/pre-agendamentos/criar`, {
        userId,
        doctorId: doctor,
        email, // Inclui o email na requisição
        modalidade,
        date: formattedDate,
        phone: formattedPhone,
      });
  
      Alert.alert("Sucesso", "Pré-agendamento realizado com sucesso!");
      navigation.navigate("HomeScreen", { userId, name });
    } catch (error) {
      console.log("Erro na resposta do backend:", error.response?.data || error.message);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível concluir o pré-cadastro."
      );
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        />

        <Text style={styles.label}>Médico</Text>
        <View style={{ zIndex: 3 }}>
          <DropDownPicker
            open={openDoctors}
            value={doctor}
            items={doctorsList}
            setOpen={setOpenDoctors}
            setValue={setDoctor}
            placeholder="Selecione um médico"
            style={styles.dropdown}
          />
        </View>

        <Text style={styles.label}>Modalidade</Text>
        <View style={{ zIndex: 2 }}>
          <DropDownPicker
            open={openModalidade}
            value={modalidade}
            items={modalidades}
            setOpen={setOpenModalidade}
            setValue={setModalidade}
            placeholder="Selecione a modalidade"
            style={styles.dropdown}
          />
        </View>

        <Text style={styles.label}>Data</Text>
        <TextInput
          style={styles.input}
          placeholder="Selecione uma data"
          value={date.toLocaleDateString("pt-BR")}
          onFocus={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "calendar"}
            onChange={handleDateChange}
          />
        )}

        <Text style={styles.label}>Horário</Text>
        <View style={{ zIndex: 1 }}>
          <DropDownPicker
            open={openHorarios}
            value={selectedHorario}
            items={horariosFixos.map((horario) => ({
              label: horario,
              value: horario,
            }))}
            setOpen={setOpenHorarios}
            setValue={setSelectedHorario}
            placeholder="Selecione um horário"
            style={styles.dropdown}
          />
        </View>

        <Button title="Concluir Pré-Cadastro" onPress={handlePreCadastro} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
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
  dropdown: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
