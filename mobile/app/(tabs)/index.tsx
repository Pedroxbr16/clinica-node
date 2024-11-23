import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Simula uma validação de autenticação
      const isAuthenticated = false; // Substitua pela lógica de autenticação real

      if (isAuthenticated) {
        router.replace("./HomeScreen"); // Navega para a tela Home
      } else {
        router.replace("./LoginScreen"); // Navega para a tela Login
      }
    };

    checkAuth();
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Verificando autenticação...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});
