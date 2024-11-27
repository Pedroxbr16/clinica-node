import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import CreateAccountScreen from "./app/screens/CreateAccountScreen";
import PreAgendamentoScreen from "./app/screens/PreAgendamentoScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import ConsultaPreAgendamentoScreen from "./app/screens/ConsultaPreAgendamentoScreen"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
        <Stack.Screen name="PreAgendamentoScreen" component={PreAgendamentoScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="ConsultaPreAgendamentoScreen" component={ConsultaPreAgendamentoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
