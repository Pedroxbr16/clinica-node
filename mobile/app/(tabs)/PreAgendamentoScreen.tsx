import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useRoute, NavigationProp, useNavigation } from '@react-navigation/native';
import { API_URL } from '@env';
import { RootStackParamList } from './types';

export default function PreAgendamentoScreen() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userId, name } = route.params as RootStackParamList['PreAgendamentoScreen'];

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [doctor, setDoctor] = useState<number | null>(null);
  const [modalidade, setModalidade] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [doctorsList, setDoctorsList] = useState<{ label: string; value: number }[]>([]);
  const [openDoctors, setOpenDoctors] = useState(false);
  const [openModalidade, setOpenModalidade] = useState(false);
  const [openHorarios, setOpenHorarios] = useState(false);

  const horariosFixos = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
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
      setPhone(phone);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os dados do usuário.');
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/medicos/medicos`);
      const doctorsData = response.data.data.map((doctor: { usuario: string; id: number }) => ({
        label: doctor.usuario,
        value: doctor.id,
      }));
      setDoctorsList(doctorsData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os médicos.');
    }
  };

  const handleDateInput = (text: string) => {
    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length > 4) {
      formattedText = `${formattedText.slice(0, 4)}-${formattedText.slice(4)}`;
    }
    if (formattedText.length > 7) {
      formattedText = `${formattedText.slice(0, 7)}-${formattedText.slice(7)}`;
    }
    setDate(formattedText);
  };

  const handlePreCadastro = async () => {
    if (!doctor || !modalidade || !date || !selectedHorario) {
      Alert.alert('Erro', 'Preencha todos os campos antes de realizar o pré-cadastro.');
      return;
    }
  
    try {
      const formattedDate = `${date} ${selectedHorario}`;
      console.log('Enviando dados para o backend:', {
        userId,
        doctorId: doctor,
        modalidade,
        date: formattedDate,
        phone,
      });
  
      await axios.post(`${API_URL}/pre-agendamentos/criar`, {
        userId,
        doctorId: doctor,
        modalidade,
        date: formattedDate,
        phone,
      });
  
      Alert.alert('Sucesso', 'Pré-cadastro realizado com sucesso!');
      navigation.navigate('HomeScreen', { userId, name });
    } catch (error: any) {
      // Agora o TypeScript entende o tipo de "error"
      console.log('Erro na resposta do backend:', error.response?.data || error.message);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível concluir o pré-cadastro.');
    }
  };
  
  return (
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
  onChangeText={setPhone} // Garante que o valor seja atualizado no estado
  placeholder="Digite seu telefone"
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
        placeholder="YYYY-MM-DD"
        value={date}
        keyboardType="numeric"
        onChangeText={handleDateInput}
      />

      <Text style={styles.label}>Horário</Text>
      <View style={{ zIndex: 1 }}>
        <DropDownPicker
          open={openHorarios}
          value={selectedHorario}
          items={horariosFixos.map((horario) => ({ label: horario, value: horario }))}
          setOpen={setOpenHorarios}
          setValue={setSelectedHorario}
          placeholder="Selecione um horário"
          style={styles.dropdown}
        />
      </View>

      <Button title="Concluir Pré-Cadastro" onPress={handlePreCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
