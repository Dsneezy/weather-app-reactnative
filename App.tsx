import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import tw from "twrnc";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    borderColor: '#58b55a',
    borderWidth: 15,
    backgroundColor: '#58b55a'
  }
})


