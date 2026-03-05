import React, { useState, useRef, useEffect } from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Platform,} from "react-native";

export default function App() {

  // Controla o numero que está aparecendo na tela 
  const [valorAtual, setValorAtual]       = useState("0");

  // Guarda o numero anterior ao escolher um operador
  const [valorAnterior, setValorAnterior] = useState(null);

  // Estado que guarda o operador escolhido (+, −, ×, ÷, %)
  const [operador, setOperador]           = useState(null);

  // Controla se o próximo número digitado deve substituir o display ou continuar
  const [novoNumero, setNovoNumero]       = useState(false);

  // Cria uma referência para o TextInput invisível, para capturar teclado.
  const inputRef = useRef(null);

  // Joga o foco no input do teclado automaticamnte, permitindo que ele funcione
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  // Função chamada quando digita um numero
  const adicionarNumero = (num) => {
    setValorAtual((prev) => {
      // Se uma operação acabou de ser escolhida, começa um número novo do zero
      if (novoNumero) { setNovoNumero(false); return String(num); }

      // Impede adicionar mais de um ponto decimal no mesmo número
      if (num === "." && prev.includes(".")) return prev;

      return prev === "0" && num !== "." ? String(num) : prev + num;
    });
  };

  // Função chamada quando o usuário pressiona um operador (+, −, ×, ÷)
  const escolherOperador = (op) => {
    // Salva o valor atual como o primeiro número da operação
    setValorAnterior(valorAtual);

    // Armazena qual operador foi escolhido
    setOperador(op);

    // Sinaliza que o próximo dígito começa um número novo
    setNovoNumero(true);
  };

  // Função chamada ao pressionar "=" — realiza o cálculo entre valorAnterior e valorAtual
  const calcular = () => {
    // Se não há operador ou número anterior, não faz nada
    if (!operador || valorAnterior === null) return;

    // Converte os dois valores de string para número decimal
    const a = parseFloat(valorAnterior);
    const b = parseFloat(valorAtual);

    let resultado;

    // Executa a operação correta com base no operador armazenado
    switch (operador) {
      case "+": resultado = a + b; break;       
      case "−": resultado = a - b; break;       
      case "×": resultado = a * b; break;       
      case "÷": resultado = b !== 0 ? a / b : "Erro"; break; 
      default: return;
    }

    // Formata o resultado: remove zeros desnecessários após o ponto decimal
    const fmt =
      typeof resultado === "number"
        ? parseFloat(resultado.toFixed(10)).toString()
        : resultado;

    setValorAtual(fmt);

    setValorAnterior(null);
    setOperador(null);

    // Sinaliza que o próximo dígito começa um número novo
    setNovoNumero(true);
  };

  // Função que reseta completamente a calculadora para o estado inicial
  const limpar = () => {
    setValorAtual("0");
    setValorAnterior(null);
    setOperador(null);
    setNovoNumero(false);
  };

  // Função que apaga o último dígito digitado; se restar só um caractere, volta para "0"
  const apagar = () => {
    setValorAtual((prev) =>
      prev.length > 1 ? prev.slice(0, -1) : "0"
    );
  };

  // Função de porcentagem — comportamento depende se há operação pendente ou não
  const porcentagem = () => {
    setValorAtual((prev) => {
      const atual = parseFloat(prev);

      // Se há operador ativo e um número anterior, calcula % relativo ao valorAnterior
      // Exemplo: 200 + 10% → 10% de 200 = 20 → valorAtual vira 20
      if (operador && valorAnterior !== null) {
        const base = parseFloat(valorAnterior);
        const resultado = base * (atual / 100);
        return parseFloat(resultado.toFixed(10)).toString();
      } else {
        // Sem operação pendente: divide o valor por 100 diretamente
        // Exemplo: 50% → 0.5
        const resultado = atual / 100;
        return parseFloat(resultado.toFixed(10)).toString();
      }
    });
  };

  // Dicionário que mapeia teclas físicas do teclado para os operadores da calculadora
  const MAP_OPERADORES = { "+": "+", "-": "−", "*": "×", "/": "÷" };

  // Função que interpreta as teclas pressionadas no teclado físico
  const handleKeyPress = (e) => {
    // Obtém o valor da tecla pressionada (compatível com Expo Web e nativo)
    const key = (e.nativeEvent?.key ?? e.key ?? "").toString();

    // Teclas 0–9: adiciona o dígito ao display
    if (/^[0-9]$/.test(key))   return adicionarNumero(key);

    // Tecla ponto: adiciona decimal
    if (key === ".")            return adicionarNumero(".");

    // Teclas +, -, *, /: escolhe o operador correspondente
    if (MAP_OPERADORES[key])    return escolherOperador(MAP_OPERADORES[key]);

    // Tecla Enter: executa o cálculo (equivale ao "=")
    if (key === "Enter")        return calcular();

    // Tecla Backspace: apaga o último dígito
    if (key === "Backspace")    return apagar();

    // Tecla Escape: limpa tudo (equivale ao "C")
    if (key === "Escape")       return limpar();

    // Tecla %: aplica a função de porcentagem
    if (key === "%")            return porcentagem();
  };

  // Efeito que registra um listener global de teclado apenas no ambiente Web
  useEffect(() => {
    // Ignora em iOS e Android — lá o TextInput invisível já captura as teclas
    if (Platform.OS !== "web") return;

    const handler = (e) => {
      // Evita capturar teclas de outros campos de texto que não sejam o input da calculadora
      if (e.target.tagName === "INPUT" && e.target !== inputRef.current) return;
      handleKeyPress(e);
    };

    // Registra o listener no objeto global window
    window.addEventListener("keydown", handler);

    // Remove o listener quando o componente for desmontado (limpeza de memória)
    return () => window.removeEventListener("keydown", handler);
  });

  // Define o grid de botões da calculadora em formato de matriz (linhas × colunas)
  // Strings vazias "" representam espaços em branco invisíveis no grid
  const botoes = [
    ["C", "⌫", "%", "÷"],
    ["7", "8",  "9", "×"],
    ["4", "5",  "6", "−"],
    ["1", "2",  "3", "+"],
    ["0", ".",  "", "=" ],
  ];

  // Retorna o "tipo" de cada botão para aplicar o estilo visual correto
  const getTipo = (btn) => {
    if (btn === "=")                          return "igual";    
    if (["+","−","×","÷"].includes(btn))      return "operador";
    if (btn === "C")                          return "limpar";   
    if (btn === "⌫" || btn === "%")           return "apagar";   
    return "numero";                                             
  };

  const handlePress = (btn) => {
    if (btn === "")   return;

    if (btn === "C")  return limpar();

    if (btn === "⌫")  return apagar();

    if (btn === "%")  return porcentagem();

    if (btn === "=")  return calcular();

    if (["+","−","×","÷"].includes(btn)) return escolherOperador(btn);

    adicionarNumero(btn);

    if (inputRef.current) inputRef.current.focus();
  };


  const displayExpressao =
    operador && valorAnterior !== null ? `${valorAnterior} ${operador}` : " ";

  return (

    <View
      style={styles.container}
      onStartShouldSetResponder={() => {
        if (inputRef.current) inputRef.current.focus();
        return false;
      }}
    >
      {/* Input completamente invisível — único propósito é capturar o teclado físico */}
      {/* showSoftInputOnFocus={false} impede que o teclado virtual abra no celular */}
      <TextInput
        ref={inputRef}
        style={styles.inputInvisivel}
        onKeyPress={handleKeyPress}
        autoFocus
        caretHidden
        showSoftInputOnFocus={false}
      />

      <View style={styles.card}>

        <Text style={styles.titulo}>Calculadora</Text>

        <View style={styles.display}>
          <Text style={styles.displayExpressao}>{displayExpressao}</Text>

          <Text style={styles.displayValor} numberOfLines={1} adjustsFontSizeToFit>
            {valorAtual}
          </Text>
        </View>

        <View style={styles.grid}>
          {botoes.map((linha, i) => (

            <View key={i} style={styles.linha}>
              {linha.map((btn, j) => {
                const tipo  = getTipo(btn);       
                const vazio = btn === "";         
                return (
                  <TouchableOpacity
                    key={j}
                    style={[
                      styles.btn,                                      
                      tipo === "operador" && styles.btnOperador,        
                      tipo === "igual"    && styles.btnIgual,           
                      tipo === "limpar"   && styles.btnLimpar,          
                      tipo === "apagar"   && styles.btnApagar,         
                      operador === btn    && styles.btnOperadorAtivo,  
                      vazio               && styles.btnVazio,           
                    ]}
                    onPress={() => handlePress(btn)}
                    disabled={vazio}       
                    activeOpacity={0.7}    
                  >
                    <Text
                      style={[
                        styles.btnTexto,
                        ["operador","igual","limpar","apagar"].includes(tipo) &&
                          styles.btnTextoDestaque,
                      ]}
                    >
                      {btn}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d1f3c",
    padding: 20,
  },

  inputInvisivel: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  card: {
    width: "92%",
    backgroundColor: "#122a4e",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e8f0fe",
    marginBottom: 16,
    letterSpacing: 1.5,
  },

  display: {
    width: "100%",
    backgroundColor: "#0d2a4a",
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "flex-end",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1e4a7a",
    minHeight: 90,
    justifyContent: "flex-end",
  },

  displayExpressao: {
    fontSize: 14,
    color: "#7a9cbf",
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  displayValor: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#e8f0fe",
    letterSpacing: 1,
  },

  grid: { width: "100%" },

  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  btn: {
    flex: 1,
    marginHorizontal: 5,
    aspectRatio: 1,       
    backgroundColor: "#0d2a4a",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1e4a7a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  btnOperador:      { backgroundColor: "#1a4a7a", borderColor: "#2a6aaa" },

  btnOperadorAtivo: { backgroundColor: "#1a6fc4", borderColor: "#4da6ff" },

  btnIgual:         { backgroundColor: "#1a6fc4", borderColor: "#4da6ff",
                      shadowColor: "#1a6fc4", shadowOpacity: 0.5 },

  btnLimpar:        { backgroundColor: "#2a1a3a", borderColor: "#6a3a7a" },

  btnApagar:        { backgroundColor: "#1a2a3a", borderColor: "#3a5a7a" },

  btnVazio:         { backgroundColor: "transparent", borderColor: "transparent",
                      elevation: 0, shadowOpacity: 0 },

  btnTexto:         { fontSize: 20, fontWeight: "600", color: "#e8f0fe" },

  btnTextoDestaque: { fontSize: 22, fontWeight: "bold", color: "#ffffff" },

  dica: {
    marginTop: 16,
    fontSize: 11,
    color: "#3a6a9a",
    letterSpacing: 0.5,
  },
});
