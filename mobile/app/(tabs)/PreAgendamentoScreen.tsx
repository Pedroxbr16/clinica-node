import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from './types';

interface RouteParams {
  userId: number;
  name?: string;
  email?: string;
}

export default function PreAgendamentoScreen() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Garantindo valores padrão caso `params` esteja ausente
  const { userId, name = 'Usuário', email = 'Não disponível' } = route.params as RouteParams;

  // Estados
  const [phone, setPhone] = useState('');
  const [doctor, setDoctor] = useState<number | null>(null);
  const [modalidade, setModalidade] = useState<string | null>(null);
  const [date, setDate] = useState(new Date()); // Estado para a data/hora
  const [doctorsList, setDoctorsList] = useState<{ label: string; value: number }[]>([]);
  const [modalidadeList] = useState([
    { label: 'Presencial', value: 'presencial' },
    { label: 'Online', value: 'online' },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDoctors, setOpenDoctors] = useState(false);
  const [openModalidade, setOpenModalidade] = useState(false);
  const [showPicker, setShowPicker] = useState(false); // Controle de visibilidade do DateTimePicker
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date'); // Define se o picker é de data ou hora

  // Busca os dados dos médicos
  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://192.168.1.8:5000/medicos/medicos');
      const doctorsData = response.data.data.map((doctor: { usuario: string; id: number }) => ({
        label: doctor.usuario,
        value: doctor.id,
      }));
      setDoctorsList(doctorsData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os médicos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Lógica para lidar com a alteração no DateTimePicker
  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false); // Fecha o picker após seleção
    if (selectedDate) {
      setDate(selectedDate); // Atualiza a data/hora selecionada
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setPickerMode(currentMode); // Define se será data ou horário
    setShowPicker(true); // Exibe o picker
  };

  // Lógica para criar o pré-agendamento
  const handlePreAgendamento = async () => {
    if (!doctor || !modalidade || !phone) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      await axios.post('http://192.168.1.8:5000/pre-agendamentos/criar', {
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

      <Text style={styles.label}>Data e Hora</Text>
      <Text style={styles.selectedDate}>{date.toLocaleString()}</Text>
      <Button title="Escolher Data" onPress={() => showMode('date')} color="#007bff" />
      <Button title="Escolher Hora" onPress={() => showMode('time')} color="#007bff" />

      {showPicker && (
        <DateTimePicker
          value={date}
          mode={pickerMode}
          display="default"
          onChange={onChange}
          minimumDate={new Date()} // Bloqueia datas no passado
        />
      )}

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
  selectedDate: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});
