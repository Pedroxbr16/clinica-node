import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { userId, name } = route.params as RootStackParamList['HomeScreen'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Clínica, {name}!</Text>

      {/* Botão de Sair */}
      <Button
        title="Sair"
        onPress={() => navigation.navigate('LoginScreen')}
        color="red"
      />

      {/* Botão de Configurações */}
      <Button
        title="Configurações"
        onPress={() => navigation.navigate('SettingsScreen', { userId })}
      />

      {/* Botão de Pré-Agendamento */}
      <Button
        title="Criar Agendamento"
        onPress={() => navigation.navigate('PreAgendamentoScreen', { userId, name })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
