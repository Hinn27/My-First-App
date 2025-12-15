# 🍜 ReFood - Food Ordering App

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)](https://expo.dev/)
[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Ứng dụng đặt đồ ăn & đồ uống, quản lý bán hàng với giao diện Material Design 3
>
> **Sứ mệnh:** Hỗ trợ các cô chú lao động ban đêm và kết nối "Quán ăn 0 đồng" với các nhóm thiện nguyện, đưa những bữa ăn miễn phí đến với người cao tuổi neo đơn

---

## 🎯 Mục tiêu xã hội

ReFood không chỉ là ứng dụng đặt đồ ăn thông thường, mà còn là cầu nối thiện nguyện:

-   🌙 **Hỗ trợ lao động ban đêm**: Giúp các cô chú dễ dàng tìm và đặt đồ ăn trong ca làm việc đêm
-   ❤️ **Quán ăn 0 đồng**: Kết nối các quán ăn thiện nguyện với nhóm từ thiện
-   👵👴 **Chăm sóc người già neo đơn**: Đưa bữa ăn miễn phí đến tận tay những người cần giúp đỡ
-   🤝 **Cộng đồng thiện nguyện**: Tạo mạng lưới kết nối giữa người cho và người nhận

---

## ✨ Tính năng chính

### 👥 Cho người mua (Buyer)

-   ✅ **Trang chủ**: Search, filter theo category, grid layout với animations
-   ✅ **Chi tiết sản phẩm**: Xem thông tin đầy đủ, chọn size, đánh giá
-   ✅ **Giỏ hàng**: Thêm/xóa/chỉnh sửa số lượng, tính tổng tiền tự động
-   ✅ **Yêu thích**: Lưu sản phẩm yêu thích với haptic feedback
-   ✅ **Tin nhắn**: Chat trực tiếp với quán ăn (real-time ready)
-   ✅ **Lịch sử đơn hàng**: Xem lại các đơn đã đặt
-   ✅ **Thanh toán**: Nhiều phương thức (Ví điện tử, Tiền mặt, Thẻ, Banking)
-   🌙 **Dành cho lao động ban đêm**: Tìm quán mở muộn, đặt món nhanh chóng

### 🏪 Cho người bán (Seller)

-   ✅ **Đăng ký bán hàng**: Form đăng ký với upload ảnh cửa hàng
-   ✅ **Đăng sản phẩm**: Upload ảnh, nhập thông tin, set giá theo size
-   ✅ **Quản lý sản phẩm**: Xem/Sửa/Xóa sản phẩm đã đăng
-   ✅ **Quản lý doanh thu**: Theo dõi đơn hàng mới và đã giao, thống kê doanh thu

### ❤️ Cho nhóm thiện nguyện (Charity)

-   🎯 **Quán ăn 0 đồng**: Đăng ký và quản lý suất ăn miễn phí
-   📍 **Định vị người cần giúp đỡ**: Tìm người già neo đơn trong khu vực
-   📦 **Quản lý phân phát**: Theo dõi lịch sử phát suất ăn
-   🤝 **Kết nối cộng đồng**: Liên hệ với các nhóm từ thiện khác

### 🔐 Authentication & State

-   ✅ **Đăng nhập/Đăng ký**: Email/Password validation
-   ✅ **Zustand + AsyncStorage**: State persist, auto-restore khi mở app
-   ✅ **Profile**: Quản lý thông tin cá nhân, settings

---

## 🎨 Highlights

-   🎨 **Material Design 3** với React Native Paper
-   ✨ **Smooth Animations** với Reanimated
-   📱 **Haptic Feedback** cho UX tốt hơn
-   🎭 **Font Playfair Display** việt hóa
-   💙 **Light Blue Theme** với dark mode ready
-   🔄 **TypeScript** config với path aliases
-   📝 **Centralized Logger** cho debugging

---

## 🚀 Cài đặt & Chạy

### Yêu cầu

-   Node.js 18+
-   npm hoặc yarn
-   Expo CLI

### Hướng dẫn

```bash
# Clone repository
git clone https://github.com/Hinn27/ReFood.git
cd ReFood

# Cài đặt dependencies
npm install

# Chạy app
npm start

# Hoặc chạy trên thiết bị cụ thể
npm run android  # Android
npm run ios      # iOS (chỉ trên Mac)
npm run web      # Web
```

### Scripts có sẵn

```bash
npm start           # Start Expo dev server
npm run android     # Run on Android
npm run ios         # Run on iOS
npm run lint        # Check ESLint errors
npm run type-check  # Check TypeScript errors
npm run clean       # Clean cache & builds
```

---

## 🗂️ Cấu trúc Project

```
ReFood/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Bottom Tab Navigation
│   │   ├── index.js             # 🏠 Trang chủ
│   │   ├── messages.js          # 💬 Tin nhắn
│   │   ├── order-history.js     # 📋 Đơn hàng
│   │   ├── profile.js           # 👤 Tài khoản
│   │   ├── cart.js              # 🛒 Giỏ hàng (hidden)
│   │   └── favorites.js         # ❤️ Yêu thích (hidden)
│   ├── auth/                     # Authentication
│   │   ├── login.js
│   │   ├── register.js
│   │   └── seller-register.js
│   ├── seller/                   # Seller features
│   │   ├── add-product.js       # Thêm sản phẩm
│   │   ├── my-products.js       # Quản lý sản phẩm
│   │   └── revenue.js           # Quản lý doanh thu
│   ├── chat/
│   │   └── [shopId].js          # Chat với quán
│   ├── product/
│   │   └── [id].js              # Chi tiết sản phẩm
│   ├── payment.js                # Thanh toán
│   └── _layout.js                # Root layout
├── src/
│   ├── components/               # Reusable components
│   │   ├── ProductCard.js
│   │   ├── CartItemCard.js
│   │   ├── EmptyState.js
│   │   ├── ScreenWrapper.js
│   │   ├── TabBarIconWithBadge.js
│   │   └── AnimatedTabIcon.js
│   ├── context/
│   │   └── ThemeContext.js       # Material You theme
│   ├── data/
│   │   ├── FoodData.js           # Mock food data (29 items)
│   │   ├── shops.js              # Shop registry
│   │   └── helpData.js           # "Quán ăn 0 đồng" (empty)
│   ├── store/
│   │   ├── productStore.js       # Zustand + AsyncStorage
│   │   ├── userStore.js          # User state
│   │   └── chatStore.js          # Chat state
│   └── utils/
│       ├── logger.js             # Centralized logging
│       └── Responsive.js         # Screen dimensions
└── assets/                       # Images & fonts
    ├── images/food/              # Food images (29 items)
    └── fonts/                    # Playfair Display
```

---

## 📚 Tech Stack

| Category         | Technology                                  |
| ---------------- | ------------------------------------------- |
| **Framework**    | React Native 0.81, Expo 54                  |
| **UI Library**   | React Native Paper 5.14 (Material Design 3) |
| **Navigation**   | Expo Router 6.0 (file-based)                |
| **State**        | Zustand 5.0 + AsyncStorage 2.2              |
| **Animations**   | Reanimated 4.1, Expo Haptics                |
| **Type Safety**  | TypeScript 5.9 (config only)                |
| **Code Quality** | ESLint 9.25, Expo Config                    |
| **Fonts**        | Playfair Display, M PLUS Rounded 1c         |
| **Image Picker** | Expo Image Picker 17.0                      |
| **Forms**        | React Native Paper components               |

---

## 💡 Cách sử dụng

### Khách hàng

1. Mở app → Xem danh sách đồ ăn trên **Trang chủ**
2. Tìm kiếm hoặc lọc theo danh mục
3. Chọn sản phẩm → Xem chi tiết → Chọn size → Thêm vào giỏ
4. Vào giỏ hàng → Điều chỉnh số lượng → Thanh toán
5. Chọn phương thức thanh toán → Hoàn tất đơn
6. Xem lịch sử đơn hàng tại tab **Đơn hàng**

### Người bán

1. Vào tab **Tài khoản** → Đăng ký bán hàng
2. Điền thông tin: Tên, tên cửa hàng, địa chỉ, SĐT
3. Upload ảnh cửa hàng → Submit
4. Sau khi được duyệt → Menu seller xuất hiện
5. Thêm sản phẩm: Upload ảnh, nhập thông tin, giá
6. Quản lý sản phẩm: Xem/Sửa/Xóa
7. Theo dõi doanh thu tại "Quản lý doanh thu"

### Test nhanh Seller (Developer)

1. Vào tab **Tài khoản**
2. Scroll xuống phần Settings
3. Tap "🧪 Test: Set seller đã duyệt"

---

## 🛣️ Roadmap

**Phase 1: Foundation (Current)**

-   [x] Core UI với Material Design 3
-   [x] Navigation structure
-   [x] State management với Zustand
-   [x] Mock data & screens

**Phase 2: Backend Integration**

-   [ ] REST API setup
-   [ ] Authentication backend
-   [ ] Product management API
-   [ ] Order management API
-   [ ] Real-time chat với WebSocket

**Phase 3: Social Impact Features**

-   [ ] Hệ thống "Quán ăn 0 đồng" đầy đủ
-   [ ] Đăng ký nhóm thiện nguyện
-   [ ] Geolocation cho người già neo đơn
-   [ ] Lịch phân phát suất ăn
-   [ ] Thống kê tác động xã hội (số suất ăn phát, người được giúp đỡ)
-   [ ] Xác minh danh tính người nhận hỗ trợ

\*\*Phase 4: Features

-   [ ] Push notifications
-   [ ] Google Maps integration
-   [ ] Payment gateway (Momo, ZaloPay, Banking)
-   [ ] Order tracking
-   [ ] Review & rating system
-   [ ] Lọc quán mở ban đêm cho lao động ca 3

**Phase 5: Polish**

-   [ ] Dark mode toggle
-   [ ] Multi-language (EN/VI)
-   [ ] Performance optimization
-   [ ] Testing suite (Jest + Testing Library)
-   [ ] CI/CD pipeline

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

## 👨‍💻 Author

**Hinn27**

-   Email: hduc27760@gmail.com
-   GitHub: [@Hinn27](https://github.com/Hinn27)

---

## 🙏 Acknowledgments

-   React Native & Expo teams
-   React Native Paper contributors
-   All open-source libraries used in this project

---

_Made with ❤️ and ☕ by Hinn27_
