// Screen: Index - Redirect to Home
/* Chức năng:
 * File redirect mặc định cho tab root
 * Expo Router sẽ tự động chuyển hướng đến home.js (tương lai sẽ đem home qua đây, bỏ home.js)
 */
import { Redirect } from 'expo-router';

export default function Index() {
    return <Redirect href="/(tabs)/home" />;
}
