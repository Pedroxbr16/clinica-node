import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useRoute, useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

export default function PreAgendamentoScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'PreAgendamentoScreen'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userId, name, email } = route.params; // Garante que os parâmetros existem e estão tipados

  const [doctor, setDoctor] = useState<number | null>(null);
  const [modalidade, setModalidade] = useState<string | null>(null);
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [doctorsList, setDoctorsList] = useState<{ label: string; value: number }[]>([]);
  const [modalidadeList] = useState([
    { label: 'Presencial', value: 'presencial' },
    { label: 'Online', value: 'online' },
  ]);

  const [openDoctors, setOpenDoctors] = useState(false);
  const [openModalidade, setOpenModalidade] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://192.168.1.8:5000/medicos/medicos');
        const doctorsData = response.data.data.map((doctor: { usuario: string; id: number }) => ({
          label: doctor.usuario,
          value: doctor.id,
        }));
        setDoctorsList(doctorsData);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao buscar médicos. Tente novamente.');
      }
    };

    fetchDoctors();
  }, []);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pré-Agendamento</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.input}>{name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.input}>{email}</Text>

      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Digite seu telefone"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Text style={styles.label}>Médico:</Text>
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

      <Text style={styles.label}>Modalidade:</Text>
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

      <Text style={styles.label}>Data Desejada:</Text>
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
