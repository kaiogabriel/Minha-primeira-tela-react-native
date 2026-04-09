import React, { useState } from 'react';
import {StyleSheet, View, Text, TextInput, Button, Image, ScrollView, Modal, TouchableOpacity
} from 'react-native';

export default function App() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tela, setTela] = useState('');

  const [alunos, setAlunos] = useState([]);

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [curso, setCurso] = useState('');

  const [editandoIndex, setEditandoIndex] = useState(null);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [alunoParaExcluir, setAlunoParaExcluir] = useState(null);

  function validarLogin() {
    if (login === 'admin' && senha === '123') {
      setTela('cadastro');
      setMensagem('');
    } else {
      setMensagem('Login ou Senha incorretos');
    }
  }

  function validarCampos() {
    if (!nome.trim() || !idade.trim() || !curso.trim()) {
      setMensagem('Preencha todos os campos!');
      return false;
    }
    return true;
  }

  function CadastrarAluno() {
    if (editandoIndex !== null) {
      setMensagem('Finalize a edição antes de cadastrar!');
      return;
    }

    if (!validarCampos()) return;

    const novoAluno = { nome, idade, curso };

    setAlunos([...alunos, novoAluno]);

    setNome('');
    setIdade('');
    setCurso('');

    setMensagem('Aluno cadastrado com sucesso!');
  }

  function salvarEdicao() {
    if (!validarCampos()) return;

    const listaAtualizada = [...alunos];
    listaAtualizada[editandoIndex] = { nome, idade, curso };

    setAlunos(listaAtualizada);
    setEditandoIndex(null);

    setNome('');
    setIdade('');
    setCurso('');

    setMensagem('Aluno atualizado com sucesso!');
  }

  function confirmarRemocao(index) {
    setAlunoParaExcluir(index);
    setModalVisivel(true);
  }

  function removerAlunoConfirmado() {
    if (editandoIndex === alunoParaExcluir) {
      setEditandoIndex(null);
      setNome('');
      setIdade('');
      setCurso('');
    }

    const novaLista = alunos.filter((_, i) => i !== alunoParaExcluir);
    setAlunos(novaLista);

    setModalVisivel(false);
    setAlunoParaExcluir(null);

    setMensagem('Aluno removido com sucesso!');
  }

  if (tela === 'cadastro') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Cadastro de Aluno</Text>

        <TextInput
          style={styles.input}
          placeholder="Insira o nome do aluno"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Idade"
          value={idade}
          onChangeText={(texto) => {
            const somenteNumeros = texto.replace(/[^0-9]/g, '');
            setIdade(somenteNumeros);
          }}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Insira o curso"
          value={curso}
          onChangeText={setCurso}
        />

        <View style={styles.botao}>
          <Button
            title="Cadastrar"
            onPress={CadastrarAluno}
            color="#1a3560"
            disabled={editandoIndex !== null}
          />
        </View>

        {editandoIndex !== null && (
          <View style={styles.botao}>
            <Button
              title="Salvar"
              onPress={salvarEdicao}
              color="#28a745"
            />
          </View>
        )}

        {alunos.map((aluno, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitulo}>{aluno.nome}</Text>
            <Text style={styles.cardTexto}>Idade: {aluno.idade}</Text>
            <Text style={styles.cardTexto}>Curso: {aluno.curso}</Text>

            <View style={{ marginTop: 10 }}>
              <Button
                title="Editar"
                onPress={() => {
                  setNome(aluno.nome);
                  setIdade(aluno.idade);
                  setCurso(aluno.curso);
                  setEditandoIndex(index);
                }}
                color="#FFA500"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Button
                title="Excluir"
                onPress={() => confirmarRemocao(index)}
                color="#dc3545"
              />
            </View>
          </View>
        ))}

        {/* MODAL */}
        <Modal transparent visible={modalVisivel} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={{ marginBottom: 15 }}>
                Deseja excluir este aluno?
              </Text>

              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  style={[styles.modalBotao, { backgroundColor: '#ccc' }]}
                  onPress={() => setModalVisivel(false)}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalBotao, { backgroundColor: '#dc3545' }]}
                  onPress={removerAlunoConfirmado}
                >
                  <Text style={{ color: '#fff' }}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.botao}>
          <Button
            title="Voltar ao Login"
            onPress={() => {
              setTela('');
              setMensagem('');
              setLogin('');   
              setSenha('');
            }}
            color="#1a3560"
          />
        </View>

        {/* IMAGEM CADASTRO */}
        <Image
          source={{
            uri: 'https://blocktrends.com.br/wp-content/uploads/2021/08/cropped-lula-1.jpg'
          }}
          style={styles.imagem}
        />

        {mensagem !== '' && (
          <Text style={styles.mensagem}>{mensagem}</Text>
        )}
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={login}
        onChangeText={setLogin}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View style={styles.botao}>
        <Button title="Entrar" onPress={validarLogin} color="#1a3560" />
      </View>

      {/* IMAGEM LOGIN */}
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Jair_Bolsonaro_2019_Portrait_%283x4_cropped_center%29.jpg/960px-Jair_Bolsonaro_2019_Portrait_%283x4_cropped_center%29.jpg'
        }}
        style={styles.imagem}
      />

      {mensagem !== '' && (
        <Text style={styles.mensagem}>{mensagem}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#6495ED",
    alignItems: "center",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },

  input: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },

  botao: {
    width: "100%",
    maxWidth: 400,
    marginTop: 6,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
  },

  cardTexto: {
    fontSize: 14,
  },

  imagem: {
    width: "100%",
    maxWidth: 400,
    height: undefined,
    aspectRatio: 1.5,
    marginTop: 20,
    borderRadius: 12,
    resizeMode: "contain",
  },

  mensagem: {
    color: "red",
    marginTop: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
  },

  modalBotao: {
    padding: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
});
