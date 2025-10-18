// Screen: Modal
/* Vai trò:
	* Screen Modal (không nằm trong tabs)
    * Route: /modal
    * Hiển thị như modal (slide từ dưới lên)
*/

import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal Screen</Text>
      <Text style={styles.subtitle}>Đây là modal popup</Text>

      {/* Đóng modal */}
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});