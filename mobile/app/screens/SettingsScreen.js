import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

export default function SettingsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/buscar/${userId}`);
      const { name, email, password } = response.data;
      setName(name);
      setEmail(email);
      setPassword(password);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os dados do usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Nome, e-mail e senha não podem estar vazios.');
      return;
    }

    try {
      await axios.put(`${API_URL}/user/atualizar/${userId}`, { name, email, password });
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar os dados do usuário.');
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

      <Button title="Salvar Alterações" onPress={handleUpdate} />

      <Button
        title="Voltar"
        onPress={() => navigation.navigate('HomeScreen', { name, userId })}
        color="gray"
      />
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
    fontWeight: 'bold',
    marginBottom: 5,
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
});
