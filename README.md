# 🍜 My First App - Food & Drink Ordering App

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Ứng dụng đặt đồ ăn & đồ uống, quản lý bán hàng với giao diện Material You Design

## 📱 Screenshots

-   🏠 Home Screen với category filters (bo tròn 10)
-   🛒 Shopping Cart với quantity controls
-   ❤️ Favorites với beautiful cards
-   💳 Payment với multiple methods
-   🎨 Material You Design color scheme
-   ✨ Smooth animations

---

## ✨ Tính năng chính

### 👥 Cho người mua (Buyer)

-   ✅ **Trang chủ nâng cao**: Search, filter theo category, grid layout
    -   Hiển thị "Xin chào, {Tên người dùng}!"
    -   Category buttons bo tròn 10
-   ✅ **Chi tiết sản phẩm**: Xem đầy đủ thông tin, chọn size, đánh giá
-   ✅ **Giỏ hàng**: Thêm/xóa/chỉnh sửa số lượng, tính tổng tiền tự động
-   ✅ **Yêu thích**: Lưu sản phẩm yêu thích, thêm vào giỏ nhanh
-   ✅ **Thanh toán**: Nhiều phương thức (Ví điện tử, Tiền mặt, Thẻ, Banking)
-   ✅ **Lịch sử đơn hàng**: Xem lại các đơn đã đặt

### 🏪 Cho người bán (Seller)

-   ✅ **Đăng ký bán hàng**: Form đăng ký với thông tin cửa hàng, upload ảnh
    -   Status: Pending → chờ duyệt trong 24h
    -   Status: Approved → Được bán hàng
-   ✅ **Đăng sản phẩm**: Form đầy đủ với validation
    -   Chọn icon emoji
    -   Nhập tên, mô tả, danh mục
    -   Set giá theo size (S/M/L)
    -   Nguyên liệu và đặc điểm
-   ✅ **Xem sản phẩm của bạn**: Quản lý danh sách sản phẩm đã đăng
    -   Sửa sản phẩm (coming soon)
    -   Xóa sản phẩm
-   ✅ **Quản lí doanh thu**: Theo dõi đơn hàng và doanh thu
    -   Tab "Đơn mới": Đơn hàng mới từ khách
    -   Tab "Đã giao": Lịch sử đơn đã hoàn thành
    -   Stats cards: Doanh thu đơn mới, đơn đã giao, tổng doanh thu
    -   Đánh dấu đã giao để chuyển đơn sang tab "Đã giao"

### 🔐 Authentication & State Management

-   ✅ **Đăng nhập**: Email/Password với Zustand + AsyncStorage
-   ✅ **Đăng ký**: Form đăng ký người dùng mới
-   ✅ **Profile**: Quản lý thông tin cá nhân
-   ✅ **Zustand Store**: State management với persist
    -   User data tự động lưu và restore khi mở lại app
    -   Đồng bộ data giữa tất cả màn hình

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
│   │   ├── add-product.js        # Seller: Add new product
│   │   ├── my-products.js        # Seller: View & manage products
│   │   └── revenue.js            # Seller: Revenue & order management
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
│       ├── productStore.js       # Zustand store + AsyncStorage
│       └── userStore.js          # User state management
└── assets/                       # Images, fonts, etc.
```

---

## 🚀 Cài đặt & Chạy

### Yêu cầu hệ thống

-   Node.js >= 18.x
-   npm hoặc yarn
-   Expo CLI
-   iOS Simulator hoặc Android Emulator (hoặc Expo Go app)

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

-   **React Native 0.81** - Framework
-   **Expo 54** - Development platform
-   **Expo Router 6** - File-based routing

### State Management

-   **zustand** - Lightweight state management
-   **immer** - Immutable state updates

### Storage & UI

-   **@react-native-async-storage/async-storage** - Persistent storage
-   **expo-linear-gradient** - Gradient backgrounds
-   **expo-image-picker** - Image selection
-   **@expo/vector-icons** - Icon library

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
    - Submit → Status "Chờ duyệt trong 24h"

2. **Đăng sản phẩm** (sau khi được duyệt)

    - Vào tab "Profile"
    - Tap "Đăng sản phẩm"
    - Điền form:
        - Chọn icon emoji
        - Tên sản phẩm
        - Loại (Đồ ăn/Đồ uống)
        - Danh mục
        - Mô tả ngắn & chi tiết
        - Giá theo size
        - Nguyên liệu (optional)
    - Submit → Sản phẩm được tạo

3. **Xem sản phẩm của bạn**

    - Tap "Xem sản phẩm của bạn" trong Profile
    - Xem danh sách tất cả sản phẩm đã đăng
    - Tap "Sửa" để chỉnh sửa (coming soon)
    - Tap "Xóa" để xóa sản phẩm

4. **Quản lí doanh thu**

    - Tap "Quản lí doanh thu" trong Profile
    - Xem 3 stats cards:
        - Doanh thu đơn mới
        - Doanh thu đơn đã giao
        - Tổng doanh thu
    - Tab "Đơn mới": Đơn hàng mới từ khách
        - Tap "Đánh dấu đã giao" để chuyển sang tab "Đã giao"
    - Tab "Đã giao": Lịch sử đơn đã hoàn thành

5. **Test nhanh** (Developer)
    - Vào tab "Profile"
    - Scroll xuống cuối Settings
    - Tap "🧪 Test: Set seller đã duyệt"
    - Menu seller sẽ xuất hiện với 3 tính năng

---

## 🎨 Thiết kế

### Theme System

-   **Material You Design** với dynamic colors
-   **Primary Color**: #0A84FF (Blue)
-   **Secondary Color**: #FF9500 (Orange)
-   **Category buttons**: Border radius 10, responsive layout
-   **Fixed category wrapper**: Prevents FlatList overlap

### Categories

-   **Món khô**: Phở, Bún chả, Cơm tấm, Bánh xèo
-   **Món ướt**: Bánh mì, Hủ tiếu, Bún bò Huế
-   **Ăn vặt**: Gỏi cuốn
-   **Cà phê**: Cà phê sữa đá, đen đá, Cappuccino, Latte
-   **Trà**: Matcha latte, Trà đào cam sả
-   **Trà sữa, Sinh tố, Nước ép, Soda**

---

## 🔧 Configuration

### Theme (src/context/ThemeContext.js)

```javascript
// Access theme
const { theme } = useTheme();
// theme contains Material You colors
```

### Store (src/store/productStore.js)

```javascript
// Access store
const addToCart = useProductStore((state) => state.addToCart);
const cartList = useProductStore((state) => state.cartList);
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

-   Vào Profile → Test Functions → Clear cache (if available)
-   Hoặc xóa app và cài lại

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

### ✅ Completed

-   [x] **Seller Management**: Đăng ký bán hàng, đăng sản phẩm
-   [x] **Revenue Management**: Quản lí đơn hàng và doanh thu
-   [x] **Product Management**: Xem/xóa sản phẩm của seller
-   [x] **Zustand Store**: User state với persist
-   [x] **Dynamic Greeting**: Hiển thị tên user trên Home
-   [x] **Category UI**: Bo tròn 10, fixed wrapper

### 🚧 In Progress

-   [ ] **Edit Product**: Chức năng sửa sản phẩm cho seller
-   [ ] **Order Management**: Khách hàng đặt đơn thật

### 📋 Planned

-   [ ] **Backend API integration**: Firebase hoặc Node.js
-   [ ] **Real-time notifications**: Thông báo đơn hàng mới
-   [ ] **Payment gateway**: Tích hợp VNPay, MoMo, ZaloPay
-   [ ] **Google Maps**: Theo dõi giao hàng
-   [ ] **Chat support**: Khách và seller chat trực tiếp
-   [ ] **Multi-language**: EN/VI
-   [ ] **Product reviews & ratings**: Đánh giá sản phẩm
-   [ ] **Seller analytics**: Biểu đồ doanh thu, thống kê
-   [ ] **Push notifications**: Expo Notifications

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

This project is licensed under the **MIT License**.

### What does this mean?

✅ **You can:**

-   Use this code for personal or commercial projects
-   Modify and distribute the code
-   Use it in private projects
-   Sell software that includes this code

❗ **You must:**

-   Include the original copyright notice
-   Include the MIT License text

⚠️ **You cannot:**

-   Hold the author liable for any damages

See the [LICENSE](LICENSE) file for full details.

---

## 👨‍💻 Author

**Hinn27**

-   GitHub: [@Hinn27](https://github.com/Hinn27)
-   Email: hduc27760@gmail.com

---

## 🙏 Acknowledgments

-   Inspired by [Coffee-Shop-App](https://github.com/darshanpawar101/Coffee-Shop-App)
-   Material You Design by Google
-   Icons by Expo Vector Icons
-   Built with ❤️ using React Native & Expo

---

## 📞 Support

If you have any questions or need help, please:

-   Open an issue on GitHub
-   Email: hduc27760@gmail.com

---

**⭐ If you like this project, please give it a star on GitHub!**
