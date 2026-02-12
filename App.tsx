import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
         insira seu nome
      </Text>

      <TextInput
        style={styles.input}
        placeholder="nome"
      />

      <Button title = "Salvar"/>
        
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    color: '#043FC2',
    textAlign: 'center',
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B3B3B3", 
  },

  input: {
    backgroundColor: "#E5E1E1",
    textAlign: "center",
    width: "80%",
    borderRadius: 4,
    height:"5%",
    color: "#043FC2"
  }
});
