import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function App() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tela, setTela] = useState('');

  function validarLogin() {
    if (login === 'admin' && senha === '123456') {
      setTela('mudar');
    } else {
      setMensagem('Login ou Senha incorretos');
    }
  }

  if (tela === 'mudar') {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo, {login}!</Text>
      <View style={styles.botao}>
        <Button
          title="Voltar ao Login"
          onPress={() => {
            setTela('');
            setLogin('');
            setSenha('');
            setMensagem('');
          }}
          color="#1a3560"
        />
      </View>
    </View>
  );
}

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#7a9cbf"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#7a9cbf"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View style={styles.botao}>
        <Button title="Entrar" onPress={validarLogin} color="#1a3560" />
      </View>

      {mensagem !== '' && (
        <Text style={styles.mensagem}>{mensagem}</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6495ED",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 32,
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#1a3560",
    marginBottom: 14,
  },
  botao: {
    width: "100%",
    marginTop: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  mensagem: {
  color: "#ff4444",        // ← cor do texto
  fontSize: 12,            // ← tamanho
  fontWeight: "bold",      // ← negrito
  textAlign: "center",     // ← alinhamento
  marginTop: 12,           // ← espaço acima
  backgroundColor: "#E0FFFF", // ← fundo
  padding: 10,             // ← espaço interno
  borderRadius: 8,         // ← bordas arredondadas
  width: "100%",           // ← largura
},
});
