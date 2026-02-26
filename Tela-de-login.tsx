import React, { useState } from 'react';
import { StyleSheet, Text,  View, TextInput, TouchableOpacity,Alert } from 'react-native';

// Importa os ícones do Expo
import { Ionicons } from '@expo/vector-icons';

export default function App() {

  // Armazena os textos dos campos usuário e senha
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Controla se a senha está visível ou não
  const [showPassword, setShowPassword] = useState(false);

  // Alterna visibilidade da senha
  const togglePassword = () => {
    setShowPassword(!showPassword); 
  };

  // Função chamada ao clicar em Entrar
  const handleLogin = () => {
  if (username === '' || password === '') {
    alert("Preencha usuário e senha!");
    return;
  }

  alert("Login efetuado com sucesso!");
};

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={togglePassword}>
          <Ionicons 
            name={showPassword ? "eye-off" : "eye"} 
            size={24} 
            color="#4DA6FF" 
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#1E1E2E",
    padding: 20,
  },

  title: {
    fontSize: 32,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 40,
  },

  input: {
    width: "100%",
    backgroundColor: "#2A2A40",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    color: "#FFF",
  },

  passwordContainer: {
    width: "100%",
    flexDirection: "row", 
    alignItems: "center",
    backgroundColor: "#2A2A40",
    borderRadius: 10,
    paddingRight: 15,
    marginBottom: 20,
  },

  passwordInput: {
    flex: 1, 
    padding: 15,
    color: "#FFF",
  },

  button: {
    width: "100%",
    backgroundColor: "#4DA6FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  }

});
