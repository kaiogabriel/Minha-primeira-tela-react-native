import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Vibration,
  Platform
} from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  const handleVibration = (pattern) => {
    if (Platform.OS === 'android') {
      Vibration.vibrate(pattern);
    } else {
      Vibration.vibrate();
    }
  };

  const onPress = () => {
    handleVibration(50); 
    
    if (count === 99) {
      handleVibration([100, 50, 200]); // Explosão
    }

    setCount(count + 1);
  };

  const getMessage = () => {
    if (count === 0) return "Olá!";
    if (count < 5) return "Ah, por que está fazendo isso?";
    if (count < 10) return "Ei, até que isso não é ruim!";
    if (count < 20) return "Legal, mas já está bom, chega!";
    if (count < 50) return "Chega, isso está doendo!";
    if (count < 100) return "PARA! VOU QUEBRAR PORRA!";
    return "QUEBREI!";
  };

  const getColors = () => {
    if (count < 5) return { btn: '#3498db', bg: '#f0f8ff' }; // Azul
    if (count < 10) return { btn: '#2ecc71', bg: '#e8f8f5' }; // Verde
    if (count < 20) return { btn: '#f1c40f', bg: '#fef9e7' }; // Amarelo
    if (count < 50) return { btn: '#e67e22', bg: '#fbe6d4' }; // Laranja
    if (count < 100) return { btn: '#e74c3c', bg: '#fadbd8' }; // Vermelho
    return { btn: '#000000', bg: '#2c3e50' }; // Preto / Quebrado
  };

  const colors = getColors();
  const isBroken = count >= 100;

  const scaleSize = 0.7 + (count * 0.017); 
  const finalScale = Math.min(scaleSize, 2.0);

  // Começa com 12px e chega a 32px
  const fontSize = 15 + (count * 0.1); 

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <StatusBar barStyle={isBroken ? "light-content" : "dark-content"} />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: isBroken ? '#fff' : '#333' }]}>
          {isBroken ? "VOCÊ QUEBROU O SISTEMA" : "Botão Inteligente"}
        </Text>
        <Text style={[styles.counter, { color: isBroken ? '#aaa' : '#666' }]}>
          Cliques: {count}
        </Text>

        <View style={styles.buttonArea}>
          
          {isBroken ? (

            <>
              {/* Cacos maiores para combinar com o botão gigante */}
              <View style={[styles.shard, styles.shardTL, styles.shardBig]} />
              <View style={[styles.shard, styles.shardTR, styles.shardBig]} />
              <View style={[styles.shard, styles.shardBL, styles.shardBig]} />
              <View style={[styles.shard, styles.shardBR, styles.shardBig]} />
              
              <Text style={styles.brokenText}>ERRO FATAL</Text>
            </>
          ) : (

            <TouchableOpacity
              onPress={onPress}
              activeOpacity={0.7}
              style={[
                styles.button, 
                { 
                  backgroundColor: colors.btn,
                  transform: [{ scale: finalScale }],
                  shadowColor: count > 90 ? "red" : "#000",
                  shadowOpacity: count > 90 ? 0.8 : 0.3
                }
              ]}
            >
              <Text style={[styles.buttonText, { fontSize: fontSize }]}>
                {getMessage()}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {count > 0 && (
          <TouchableOpacity 
            onPress={() => setCount(0)} 
            style={styles.resetButton}
          >
            <Text style={[styles.resetText, { color: isBroken ? '#fff' : '#888' }]}>
              Tentar Novamente
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counter: {
    fontSize: 18,
    marginBottom: 30,
    fontWeight: '600',
  },
  buttonArea: {

    width: 300, 
    height: 200, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {

    width: 200,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },

  shard: {
    position: 'absolute',
    width: 100,
    height: 40,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  shardBig: {
    width: 140, // Cacos maiores
    height: 60,
  },
  shardTL: { top: 20, left: 20, transform: [{ rotate: '-45deg' }] },
  shardTR: { top: 20, right: 20, transform: [{ rotate: '45deg' }] },
  shardBL: { bottom: 20, left: 20, transform: [{ rotate: '45deg' }] },
  shardBR: { bottom: 20, right: 20, transform: [{ rotate: '-45deg' }] },
  
  brokenText: {
    color: '#e74c3c',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#000',
    padding: 10,
    zIndex: 10,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
  },
  resetText: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
