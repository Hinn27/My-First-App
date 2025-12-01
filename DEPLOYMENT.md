# Hướng Dẫn Deploy App với EAS

## 🚀 Đã Hoàn Thành

-   ✅ Đăng nhập Expo account
-   ✅ Cài đặt EAS CLI
-   ✅ Khởi tạo project với EAS
-   ✅ Cấu hình build cho Android & iOS
-   ✅ Đang build APK preview cho Android

## 📱 Các Loại Build

### 1. **Preview Build** (Đang chạy)

-   Tạo APK có thể cài trực tiếp trên thiết bị Android
-   Không cần Google Play Store
-   Dùng để test và demo

```bash
eas build --platform android --profile preview
```

### 2. **Production Build**

-   Build để submit lên Google Play Store / App Store
-   Tự động tăng version code

```bash
eas build --platform android --profile production
eas build --platform ios --profile production
```

### 3. **Development Build**

-   Build với development client cho debugging

```bash
eas build --platform android --profile development
```

## 📲 Kiểm Tra Trạng Thái Build

Xem các build đang chạy:

```bash
eas build:list
```

Xem chi tiết build cụ thể:

```bash
eas build:view [BUILD_ID]
```

## 🌐 EAS Update (Over-the-Air Updates)

Sau khi build xong, bạn có thể push update JavaScript/asset mà không cần build lại:

### Cấu hình EAS Update

```bash
eas update:configure
```

### Publish update

```bash
eas update --branch preview --message "Update mô tả món ăn"
```

## 📦 Tải APK Sau Khi Build Xong

1. EAS sẽ gửi email thông báo khi build hoàn tất
2. Link download APK sẽ có trong email hoặc terminal
3. Truy cập https://expo.dev để xem tất cả builds
4. Quét QR code hoặc tải APK về điện thoại

## 🔗 Links Quan Trọng

-   **EAS Dashboard**: https://expo.dev/accounts/hinn06/projects/myapp
-   **Builds**: https://expo.dev/accounts/hinn06/projects/myapp/builds
-   **Updates**: https://expo.dev/accounts/hinn06/projects/myapp/updates

## 📝 Lưu Ý

### Android

-   APK preview có thể cài trực tiếp (không qua Play Store)
-   Production build cần submit lên Google Play Console
-   Cần Android Keystore (EAS tự động tạo và quản lý)

### iOS

-   Cần Apple Developer account ($99/năm)
-   Cần provisioning profile và certificates
-   Chỉ có thể test trên máy Mac hoặc qua TestFlight

## 🚀 Submit Lên Store

### Google Play Store

```bash
eas submit --platform android
```

### Apple App Store

```bash
eas submit --platform ios
```

## 🔄 Workflow Thông Dụng

1. **Development**: Code và test local với `npx expo start`
2. **Preview Build**: Build APK để test trên thiết bị thật
3. **Production Build**: Build để submit lên store
4. **EAS Update**: Push update nhanh cho JavaScript/assets
5. **Submit**: Gửi app lên Google Play / App Store

## 🛠️ Troubleshooting

### Build bị lỗi

```bash
# Xem log chi tiết
eas build:view [BUILD_ID]

# Build lại
eas build --platform android --profile preview --clear-cache
```

### Thay đổi app version

Cập nhật trong `app.json`:

```json
{
    "expo": {
        "version": "1.0.1"
    }
}
```

### Thay đổi bundle identifier

Cập nhật trong `app.json`:

```json
{
    "expo": {
        "android": {
            "package": "com.hinne.myapp"
        },
        "ios": {
            "bundleIdentifier": "com.hinne.myapp"
        }
    }
}
```

## 📞 Hỗ Trợ

-   **Expo Docs**: https://docs.expo.dev/build/introduction/
-   **EAS Docs**: https://docs.expo.dev/eas/
-   **Discord**: https://chat.expo.dev/
