import { Platform } from 'react-native';

// Logic tự động chọn IP backend:
// 1. Nếu chạy trên Web -> Dùng localhost
// 2. Nếu chạy trên Android Emulator -> Dùng 10.0.2.2 (IP đặc biệt trỏ về máy host)
// 3. Nếu chạy trên thiết bị thật (Tunnel/LAN) -> Dùng IP máy tính của bạn

// ⚠️ THAY ĐỔI DÒNG DƯỚI ĐÂY THÀNH IP MÁY TÍNH CỦA BẠN
// Đã cập nhật theo thông tin IP bạn cung cấp
const YOUR_PC_IP = 'http://192.168.5.15:4000'; 

const getBaseUrl = () => {
    if (process.env.EXPO_PUBLIC_API_BASE) {
        return process.env.EXPO_PUBLIC_API_BASE;
    }

    if (Platform.OS === 'web') {
        return 'http://localhost:4000';
    }

    if (Platform.OS === 'android') {
        // Nếu là máy ảo Android Studio (Genymotion/Android Virtual Device)
        // Android Emulator dùng 10.0.2.2 để gọi về localhost của máy tính
        // return 'http://10.0.2.2:4000';
        
        // Vì bạn đang ưu tiên dùng điện thoại thật qua Wifi/Tunnel, nên return IP LAN luôn
        return YOUR_PC_IP;
    }

    // iOS và các trường hợp khác
    return YOUR_PC_IP;
};

export const API_BASE = getBaseUrl();
