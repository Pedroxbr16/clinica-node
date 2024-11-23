import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SettingsScreen from './SettingsScreen';
import AgendaScreen from './PreAgendamentoScreen';
import { RootStackParamList } from './types'; // Importe o tipo definido

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="PreAgendamentoScreen" component={AgendaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
