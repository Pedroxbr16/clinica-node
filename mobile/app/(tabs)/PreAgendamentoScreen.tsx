import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from './types';

interface RouteParams {
  userId: number;
}

export default function PreAgendamentoScreen() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userId } = route.params as RouteParams;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [doctor, setDoctor] = useState<number | null>(null);
  const [modalidade, setModalidade] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [doctorsList, setDoctorsList] = useState<{ label: string; value: number }[]>([]);
  const [modalidadeList] = useState([
    { label: 'Presencial', value: 'presencial' },
    { label: 'Online', value: 'online' },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDoctors, setOpenDoctors] = useState(false);
  const [openModalidade, setOpenModalidade] = useState(false);

  // Busca os dados do usuário e médicos
  const fetchData = async () => {
    try {
      const userResponse = await axios.get(`http://192.168.1.8:5000/user/buscar/${userId}`);
      const { name, email } = userResponse.data;
      setName(name);
      setEmail(email);

      const doctorsResponse = await axios.get('http://192.168.1.8:5000/medicos/medicos');
      const doctorsData = doctorsResponse.data.data.map((doctor: { usuario: string; id: number }) => ({
        label: doctor.usuario,
        value: doctor.id,
      }));
      setDoctorsList(doctorsData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lógica para criar o pré-agendamento
  const handlePreAgendamento = async () => {
    if (!doctor || !modalidade || !date || !phone) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      await axios.post('http://192.168.1.8:5000/pre-agendamentos', {
        userId,
        doctor,
        modalidade,
        date,
        phone,
      });

      Alert.alert('Sucesso', 'Pré-agendamento criado com sucesso!');
      navigation.navigate('HomeScreen', { userId, name });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o pré-agendamento. Tente novamente.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pré-Agendamento</Text>

      <Text style={styles.label}>Nome</Text>
      <Text style={styles.input}>{name}</Text>

      <Text style={styles.label}>E-mail</Text>
      <Text style={styles.input}>{email}</Text>

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Digite seu telefone"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Médico</Text>
      <View style={{ zIndex: openDoctors ? 1000 : 1 }}>
        <DropDownPicker
          open={openDoctors}
          value={doctor}
          items={doctorsList}
          setOpen={setOpenDoctors}
          setValue={setDoctor}
          setItems={setDoctorsList}
          placeholder="Selecione um médico"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <Text style={styles.label}>Modalidade</Text>
      <View style={{ zIndex: openModalidade ? 1000 : 0 }}>
        <DropDownPicker
          open={openModalidade}
          value={modalidade}
          items={modalidadeList}
          setOpen={setOpenModalidade}
          setValue={setModalidade}
          placeholder="Selecione a modalidade"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <Text style={styles.label}>Data Desejada</Text>
      <TextInput
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
        keyboardType="default"
        style={styles.input}
      />

      <Button title="Agendar" onPress={handlePreAgendamento} color="#007bff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
});
