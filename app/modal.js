// Screen: Modal
/* Vai trò:
	* Screen Modal (không nằm trong tabs)
    * Route: /modal
    * Hiển thị như modal (slide từ dưới lên)
*/

import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="information-circle-outline" size={64} color="#0a84ff" />
      <Text style={styles.title}>Modal Screen</Text>
      <Text style={styles.text}>
        Đây là modal popup{'\n'}
        Slide từ dưới lên trên
      </Text>

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Ionicons name="close-circle" size={20} color="#fff" />
        <Text style={styles.buttonText}>Close Modal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#ff3b30',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});