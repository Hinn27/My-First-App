# 🍜 My First App - Coffee & Food Ordering App

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)](https://expo.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

> Ứng dụng đặt đồ ăn & đồ uống với giao diện Material You Design, hỗ trợ dark mode và quản lý bán hàng.

## 📱 Screenshots

### Light Mode
- 🏠 Home Screen với category filters
- 🛒 Shopping Cart với quantity controls  
- ❤️ Favorites với beautiful cards
- 💳 Payment với multiple methods

### Dark Mode
- 🌙 Full dark mode support
- 🎨 Material You color scheme
- ✨ Smooth animations

---

## ✨ Tính năng chính

### 👥 Cho người mua (Buyer)
- ✅ **Trang chủ nâng cao**: Search, filter theo category, grid layout
- ✅ **Chi tiết sản phẩm**: Xem đầy đủ thông tin, chọn size, đánh giá
- ✅ **Giỏ hàng**: Thêm/xóa/chỉnh sửa số lượng, tính tổng tiền tự động
- ✅ **Yêu thích**: Lưu sản phẩm yêu thích, thêm vào giỏ nhanh
- ✅ **Thanh toán**: Nhiều phương thức (Ví điện tử, Tiền mặt, Thẻ, Banking)
- ✅ **Lịch sử đơn hàng**: Xem lại các đơn đã đặt
- ✅ **Dark Mode**: Chuyển đổi theme sáng/tối

### 🏪 Cho người bán (Seller)
- ✅ **Đăng ký bán hàng**: Form đăng ký với thông tin cửa hàng, upload ảnh
- ✅ **Đăng sản phẩm**: Form đầy đủ với validation
  - Chọn icon emoji
  - Nhập tên, mô tả, danh mục
  - Set giá theo size (S/M/L)
  - Nguyên liệu và đặc điểm
- ✅ **Quản lý trạng thái**: Pending/Approved seller status

### 🔐 Authentication
- ✅ **Đăng nhập**: Email/Password với AsyncStorage
- ✅ **Đăng ký**: Form đăng ký người dùng mới
- ✅ **Profile**: Quản lý thông tin cá nhân

---

## 🗂️ Cấu trúc Project

```
My-First-App/
├── app/
│   ├── (tabs)/                    # Bottom Tab Navigation
│   │   ├── index.js              # Home screen gốc
│   │   ├── home-enhanced.js      # Home screen Coffee Shop style ⭐
│   │   ├── cart-enhanced.js      # Enhanced Cart screen
│   │   ├── favorites.js          # Favorites screen
│   │   ├── profile.js            # Profile & Settings
│   │   └── _layout.js            # Tab layout config
│   ├── auth/                     # Authentication
│   │   ├── login.js
│   │   ├── register.js
│   │   └── seller-register.js
│   ├── product/
│   │   └── [id].js               # Product detail (dynamic)
│   ├── seller/
│   │   └── add-product.js        # Seller: Add new product
│   ├── payment.js                # Payment screen
│   ├── order-history.js          # Order history
│   └── _layout.js                # Root layout
├── src/
│   ├── components/               # Reusable components
│   │   ├── ProductCard.js
│   │   ├── CartItemCard.js
│   │   └── EmptyState.js
│   ├── context/
│   │   └── ThemeContext.js       # Material You theme
│   ├── data/
│   │   ├── DrinkData.js          # Mock drink data
│   │   └── FoodData.js           # Mock food data
│   └── store/
│       └── productStore.js       # Zustand store + AsyncStorage
└── assets/                       # Images, fonts, etc.
```

---

## 🚀 Cài đặt & Chạy

### Yêu cầu hệ thống
- Node.js >= 18.x
- npm hoặc yarn
- Expo CLI
- iOS Simulator hoặc Android Emulator (hoặc Expo Go app)

### Cài đặt

```bash
# Clone repository
git clone https://github.com/Hinn27/My-First-App.git
cd My-First-App

# Cài đặt dependencies
npm install

# Hoặc nếu dùng yarn
yarn install
```

### Chạy app

```bash
# Start Expo development server
npm start

# Hoặc
npx expo start

# Chạy trên Android
npm run android

# Chạy trên iOS (macOS only)
npm run ios

# Chạy trên web
npm run web
```

### Clear cache (nếu gặp lỗi)

```bash
npx expo start --clear
```

---

## 📦 Dependencies

### Core
- **React Native 0.81** - Framework
- **Expo 54** - Development platform
- **Expo Router 6** - File-based routing

### State Management
- **zustand** - Lightweight state management
- **immer** - Immutable state updates

### Storage & UI
- **@react-native-async-storage/async-storage** - Persistent storage
- **expo-linear-gradient** - Gradient backgrounds
- **expo-image-picker** - Image selection
- **@expo/vector-icons** - Icon library

---

## 📚 Hướng dẫn sử dụng

### Cho người mua

1. **Xem sản phẩm**
   - Mở tab "Coffee Shop" (home-enhanced)
   - Dùng search bar để tìm kiếm
   - Chọn category để lọc (Món khô, Món ướt, Ăn vặt, Cà phê, Trà...)

2. **Thêm vào giỏ hàng**
   - Tap vào sản phẩm để xem chi tiết
   - Chọn size (S/M/L)
   - Tap nút "Thêm vào giỏ hàng"
   - Hoặc tap nút "+" trực tiếp từ ProductCard

3. **Quản lý giỏ hàng**
   - Vào tab "Giỏ hàng"
   - Tăng/giảm số lượng bằng nút +/-
   - Item tự động xóa khi số lượng = 0
   - Xem tổng tiền tự động

4. **Thanh toán**
   - Tap "Thanh toán" trong Cart
   - Chọn phương thức thanh toán
   - Xác nhận → Success animation
   - Đơn hàng tự động lưu vào lịch sử

5. **Yêu thích**
   - Tap icon ❤️ để thêm/xóa yêu thích
   - Vào tab "Yêu thích" để xem danh sách
   - Thêm vào giỏ trực tiếp từ Favorites

### Cho người bán

1. **Đăng ký bán hàng**
   - Vào tab "Profile"
   - Tap "Đăng ký bán hàng"
   - Điền thông tin: Tên, tên cửa hàng, địa chỉ, số điện thoại
   - Upload ảnh cửa hàng
   - Submit → Được duyệt tự động

2. **Đăng sản phẩm** (sau khi được duyệt)
   - Vào tab "Profile"
   - Tap "Đăng sản phẩm" (menu màu xanh lá)
   - Điền form:
     - Chọn icon emoji
     - Tên sản phẩm
     - Loại (Đồ ăn/Đồ uống)
     - Danh mục
     - Mô tả ngắn & chi tiết
     - Giá theo size
     - Nguyên liệu (optional)
   - Submit → Sản phẩm được tạo

3. **Test nhanh** (Developer)
   - Vào tab "Profile"
   - Scroll xuống "🧪 Test Functions"
   - Tap "Set làm Seller đã duyệt"
   - Menu "Đăng sản phẩm" sẽ xuất hiện

---

## 🎨 Thiết kế

### Theme System
- **Material You Design** với dynamic colors
- **Light Mode**: Primary #0A84FF, Secondary #FF9500
- **Dark Mode**: AMOLED black với primary colors
- **Smooth transitions** giữa themes

### Categories
- **Món khô**: Phở, Bún chả, Cơm tấm, Bánh xèo
- **Món ướt**: Bánh mì, Hủ tiếu, Bún bò Huế
- **Ăn vặt**: Gỏi cuốn
- **Cà phê**: Cà phê sữa đá, đen đá, Cappuccino, Latte
- **Trà**: Matcha latte, Trà đào cam sả
- **Trà sữa, Sinh tố, Nước ép, Soda**

---

## 🔧 Configuration

### Theme (src/context/ThemeContext.js)
```javascript
// Switch theme
const { theme, isDarkMode, toggleTheme } = useTheme();
```

### Store (src/store/productStore.js)
```javascript
// Access store
const addToCart = useProductStore(state => state.addToCart);
const cartList = useProductStore(state => state.cartList);
```

---

## 🐛 Troubleshooting

### Cache issues
```bash
# Clear Expo cache
npx expo start --clear

# Clear React Native cache
npx react-native start --reset-cache
```

### AsyncStorage reset
- Vào Profile → Test Functions → Clear cache (if available)
- Hoặc xóa app và cài lại

### iOS/Android build errors
```bash
# Update dependencies
npx expo install --check

# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 TODO / Roadmap

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Payment gateway integration
- [ ] Google Maps for delivery
- [ ] Chat support
- [ ] Multi-language support
- [ ] Product reviews & ratings
- [ ] Seller dashboard analytics
- [ ] Push notifications

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Hinn27**
- GitHub: [@Hinn27](https://github.com/Hinn27)
- Email: your-email@example.com

---

## 🙏 Acknowledgments

- Inspired by [Coffee-Shop-App](https://github.com/darshanpawar101/Coffee-Shop-App)
- Material You Design by Google
- Icons by Expo Vector Icons
- Built with ❤️ using React Native & Expo

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Email: your-email@example.com
- Join our Discord: [Your Discord Link]

---

**⭐ If you like this project, please give it a star on GitHub!**
