# 🍜 My First App - Ứng Dụng Đặt Đồ Ăn# 🍜 My First App - Food & Drink Ordering App

Ứng dụng di động để người dùng đặt đồ ăn từ các quán ăn và quản lý đơn hàng.[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)

[![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)](https://expo.dev/)

## 📱 Tính năng chính[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

### Cho khách hàng> Ứng dụng đặt đồ ăn & đồ uống, quản lý bán hàng với giao diện Material You Design

- 🏠 **Trang chủ**: Xem danh sách đồ ăn, tìm kiếm, lọc theo danh mục

- 🛒 **Giỏ hàng**: Thêm/xóa sản phẩm, chỉnh sửa số lượng**[🌍 English Version Below](#english-version)**

- ❤️ **Yêu thích**: Lưu những sản phẩm yêu thích

- 💬 **Tin nhắn**: Nhắn tin trực tiếp với các quán ăn## 📱 Screenshots

- 📋 **Lịch sử đơn**: Xem những đơn hàng đã đặt

- 💳 **Thanh toán**: Nhiều phương thức thanh toán- 🏠 Home Screen với category filters

- 🛒 Shopping Cart với quantity controls

### Cho người bán- ❤️ Favorites với beautiful cards

- 📝 **Đăng ký bán**: Tạo tài khoản bán hàng- 💳 Payment với multiple methods

- ➕ **Thêm sản phẩm**: Đăng sản phẩm với ảnh, giá tiền, mô tả - 🎨 Material Design 3 với React Native Paper

- 📊 **Quản lý doanh thu**: Xem đơn hàng và thu nhập- ✨ Smooth animations & haptic feedback

- 🎭 Font Playfair Display việt hóa

## 🚀 Cài đặt- 💙 Light Blue color scheme

### Yêu cầu---

- Node.js (phiên bản 18 trở lên)

- npm hoặc yarn## ✨ Tính năng chính

### Hướng dẫn### 👥 Cho người mua (Buyer)

```bash

# Tải code-   ✅ **Trang chủ nâng cao**: Search, filter theo category, grid layout

git clone https://github.com/Hinn27/My-First-App.git    -   Hiển thị "Xin chào, {Tên người dùng}!"

cd My-First-App    -   Category chips

    -   Haptic feedback khi tương tác

# Cài đặt thư viện-   ✅ **Chi tiết sản phẩm**: Xem đầy đủ thông tin, chọn size, đánh giá

npm install-   ✅ **Giỏ hàng**: Thêm/xóa/chỉnh sửa số lượng, tính tổng tiền tự động

-   ✅ **Yêu thích**: Lưu sản phẩm yêu thích, thêm vào giỏ nhanh

# Chạy ứng dụng-   ✅ **Thanh toán**: Nhiều phương thức (Ví điện tử, Tiền mặt, Thẻ, Banking)

npm start-   ✅ **Lịch sử đơn hàng**: Xem lại các đơn đã đặt

```

### 🏪 Cho người bán (Seller)

## 📱 Chạy trên điện thoại

- ✅ **Đăng ký bán hàng**: Form đăng ký với thông tin cửa hàng, upload ảnh

### Android - Status: Pending → chờ duyệt trong 24h

````bash -   Status: Approved → Được bán hàng

npm run android-   ✅ **Đăng sản phẩm**: Form đầy đủ với validation

```    -   Upload ảnh sản phẩm thật

    -   Nhập tên, mô tả, danh mục

### iOS (chỉ trên Mac)    -   Set giá theo size (S/M/L)

```bash    -   Nguyên liệu và đặc điểm

npm run ios    -   Tự động lưu vào store với AsyncStorage

```-   ✅ **Xem sản phẩm của bạn**: Quản lý danh sách sản phẩm đã đăng

    -   Hiển thị tất cả sản phẩm đã đăng

### Web    -   Xem ảnh, tên, giá sản phẩm

```bash    -   Sửa sản phẩm (coming soon)

npm run web    -   Xóa sản phẩm khỏi store

```-   ✅ **Quản lí doanh thu**: Theo dõi đơn hàng và doanh thu

    -   Tab "Đơn mới": Đơn hàng mới từ khách

## 🛠️ Cấu trúc thư mục    -   Tab "Đã giao": Lịch sử đơn đã hoàn thành

    -   Stats cards: Doanh thu đơn mới, đơn đã giao, tổng doanh thu

```    -   Đánh dấu đã giao để chuyển đơn sang tab "Đã giao"

My-First-App/

├── app/                    # Các màn hình chính### 🔐 Authentication & State Management

│   ├── (tabs)/            # Thanh điều hướng dưới

│   │   ├── index.js       # Trang chủ-   ✅ **Đăng nhập**: Email/Password với Zustand + AsyncStorage

│   │   ├── cart.js        # Giỏ hàng-   ✅ **Đăng ký**: Form đăng ký người dùng mới

│   │   ├── favorites.js   # Yêu thích-   ✅ **Profile**: Quản lý thông tin cá nhân

│   │   ├── messages.js    # Tin nhắn-   ✅ **Zustand Store**: State management với persist

│   │   ├── order-history.js # Lịch sử đơn    -   User data tự động lưu và restore khi mở lại app

│   │   └── profile.js     # Hồ sơ cá nhân    -   Đồng bộ data giữa tất cả màn hình

│   ├── chat/              # Màn hình chat

│   ├── auth/              # Đăng nhập, đăng ký---

│   ├── seller/            # Chức năng bán hàng

│   └── product/           # Chi tiết sản phẩm## 🗂️ Cấu trúc Project

├── src/

│   ├── components/        # Các thành phần tái sử dụng```

│   ├── context/           # Chủ đề và cài đặt giao diệnMy-First-App/

│   ├── data/              # Dữ liệu tĩnh (quán ăn, sản phẩm)├── app/

│   └── store/             # Quản lý dữ liệu (Zustand)│   ├── (tabs)/                    # Bottom Tab Navigation

└── assets/                # Hình ảnh và font chữ│   │   ├── index.js              # Redirect to home

```│   │   ├── home.js               # Home screen ⭐ (search, filter, grid)

│   │   ├── cart.js               # Cart screen (Zustand store)

## 🎨 Giao diện│   │   ├── favorites.js          # Favorites screen

│   │   ├── profile.js            # Profile & Settings

- Material Design 3 (giao diện hiện đại của Google)│   │   └── _layout.js            # Tab layout config

- Màu chủ đạo: Xanh da trời (#00BCD4)│   ├── auth/                     # Authentication

- Font chữ: Playfair Display (hỗ trợ tiếng Việt)│   │   ├── login.js

- Hoạt ảnh mượt mà│   │   ├── register.js

│   │   └── seller-register.js

## 📦 Công nghệ sử dụng│   ├── product/

│   │   └── [id].js               # Product detail (dynamic)

- **React Native 0.81**: Framework để tạo ứng dụng di động│   ├── seller/

- **Expo 54**: Nền tảng phát triển React Native│   │   ├── add-product.js        # Seller: Add new product

- **React Native Paper**: Thư viện giao diện Material Design│   │   ├── my-products.js        # Seller: View & manage products

- **Zustand**: Quản lý dữ liệu toàn cục│   │   └── revenue.js            # Seller: Revenue & order management

- **Expo Router**: Điều hướng trang│   ├── payment.js                # Payment screen

│   ├── order-history.js          # Order history

## 🐛 Lỗi thường gặp│   └── _layout.js                # Root layout

├── src/

### Lỗi "java.io.IOException"│   ├── components/               # Reusable components

```bash│   │   ├── ProductCard.js        # Product card with animations

npx expo start --tunnel│   │   ├── CartItemCard.js       # Cart item with Paper components

```│   │   ├── EmptyState.js         # Empty state component

│   │   └── ScreenWrapper.js      # Screen wrapper with fade-in animation

### Clear cache│   ├── context/

```bash│   │   └── ThemeContext.js       # Material You theme

npx expo start --clear│   ├── data/

```│   │   ├── DrinkData.js          # Mock drink data

│   │   └── FoodData.js           # Mock food data

### Lỗi khi chạy Android│   └── store/

```bash│       ├── productStore.js       # Zustand store + AsyncStorage

rm -rf node_modules package-lock.json│       └── userStore.js          # User state management

npm install└── assets/                       # Images, fonts, etc.

```    ├── images/                   # App icons, splash screens

    └── fonts/                    # Custom fonts (if any)

## 💡 Cách sử dụng```



### Khách hàng---

1. Mở app → Xem danh sách đồ ăn trên trang chủ

2. Chọn sản phẩm → Thêm vào giỏ## 🚀 Cài đặt & Chạy

3. Vào giỏ hàng → Thanh toán

4. Đơn được lưu vào lịch sử### Yêu cầu hệ thống



### Người bán-   Node.js >= 18.x

1. Tạo tài khoản → Đăng ký bán hàng-   npm hoặc yarn

2. Chờ duyệt (24h) → Được phép bán-   Expo CLI

3. Thêm sản phẩm → Chờ khách đặt-   iOS Simulator hoặc Android Emulator (hoặc Expo Go app)

4. Xem doanh thu trong tab "Quản lý doanh thu"

### Cài đặt

## 📝 Danh sách công việc

```bash

✅ Hoàn tất:# Clone repository

- Trang chủ với lọc danh mụcgit clone https://github.com/Hinn27/My-First-App.git

- Giỏ hàng và thanh toáncd My-First-App

- Yêu thích sản phẩm

- Chat với quán# Cài đặt dependencies

- Quản lý cho người bánnpm install

- Lịch sử đơn hàng

# Hoặc nếu dùng yarn

⏳ Đang làm:yarn install

- Sửa sản phẩm```



❌ Sắp tới:### Chạy app

- Đồng bộ dữ liệu với máy chủ (Backend API)

- Thông báo khi có đơn hàng```bash

- Thanh toán online thực (VNPay, MoMo...)# Start Expo development server

- Xem vị trí giao hàngnpm start

- Đánh giá sản phẩm

# Hoặc

## 👨‍💻 Tác giảnpx expo sta



**Hinn27**# Chạy trên Android

- GitHub: [@Hinn27](https://github.com/Hinn27)npm run android

- Email: hduc27760@gmail.com

# Chạy trên iOS (macOS only)

## 📄 Giấy phépnpm run ios



MIT License - Bạn có thể sử dụng cho bất kỳ mục đích nào# Chạy trên web

npm run web

## 🙏 Cảm ơn```



- React Native & Expo### Clear cache (nếu gặp lỗi)

- Material Design

- Icon từ Expo Vector Icons```bash

npx expo start --clear
````

# Lỗi java.io.IOException: Failed to download remote updates

```bash
npx expo start --tunnel
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
    - Mở tab **"Home"** (Trang chủ)
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
    - Ấn vào icon ❤️ để thêm/xóa yêu thích
    - Vào tab "Yêu thích" để xem danh sách
    - Thêm vào giỏ trực tiếp từ Favorites

### Cho người bán

1. **Đăng ký bán hàng**
    - Vào tab "Profile"
    - Ấn vào "Đăng ký bán hàng"
    - Điền thông tin: Tên, tên cửa hàng, địa chỉ, số điện thoại
    - Upload ảnh cửa hàng
    - Submit → Status "Chờ duyệt trong 24h"

2. **Đăng sản phẩm** (sau khi được duyệt)
    - Vào tab "Profile"
    - Ấn vào "Đăng sản phẩm"
    - Điền form:
        - Upload ảnh sản phẩm từ thư viện ảnh
        - Tên sản phẩm
        - Loại (Đồ ăn/Đồ uống)
        - Danh mục
        - Mô tả ngắn & chi tiết
        - Giá theo size
        - Nguyên liệu (optional)
    - Submit → Sản phẩm tự động lưu vào store

3. **Xem sản phẩm của bạn**
    - Ấn vào "Xem sản phẩm của bạn" trong Profile
    - Xem danh sách tất cả sản phẩm đã đăng (lưu trong Zustand store)
    - Hiển thị ảnh thật hoặc icon emoji (fallback)
    - Xem giá từ thấp đến cao
    - Ấn vào "Sửa" để chỉnh sửa (coming soon)
    - Ấn vào "Xóa" để xóa sản phẩm → Tự động xóa khỏi store

4. **Quản lí doanh thu**
    - Ấn vào "Quản lí doanh thu" trong Profile
    - Xem 3 stats cards:
        - Doanh thu đơn mới
        - Doanh thu đơn đã giao
        - Tổng doanh thu
    - Tab "Đơn mới": Đơn hàng mới từ khách
        - Ấn vào "Đánh dấu đã giao" để chuyển sang tab "Đã giao"
    - Tab "Đã giao": Lịch sử đơn đã hoàn thành

5. **Test nhanh** (Developer)
    - Vào tab "Profile"
    - Scroll xuống cuối Settings
    - Ấn vào "🧪 Test: Set seller đã duyệt"
    - Menu seller sẽ xuất hiện với 3 tính năng

---

## 🎨 Thiết kế

### Material Design 3 với React Native Paper

Ứng dụng sử dụng **React Native Paper** (Material UI cho React Native) và tuân theo **Material Design 3** guidelines:

- **UI Components**: TextInput, Button, Card, List, Chip, IconButton từ React Native Paper
- **Dynamic Color System**: Màu sắc chủ đạo Light Blue (#87CEEB)
- **Elevation System**: 6 levels từ 0 (flat) đến 5 (highest)
- **Shape System** - Bo góc mềm mại:
    - Extra Small: 10px radius
    - Small: 14px radius
    - Medium: 18px radius
    - Large: 28px radius
    - Extra Large: 36px radius
- **Typography**: Playfair Display font
- **Roundness**: 16px cho Paper components
- **Components**:
    - Flat Cards (không viền, bo góc mềm mại)
    - Elevated Cards với shadow
    - Filled/Outlined/Text buttons
    - Bottom Navigation với animations
    - Smooth tab transitions với haptic feedback

### Color Palette - Light Blue Theme

- **Primary**: #87CEEB (Sky Blue) - Main brand color
- **Primary Container**: #E0F6FF - Light blue container
- **Secondary**: #B0E0E6 (Powder Blue) - Supporting elements
- **Tertiary**: #ADD8E6 (Light Blue) - Accents
- **Surface**: #FFFBFE - Card backgrounds
- **Background**: #FFFBFE - App background
- **Error**: #B3261E - Error states

### Elevation Levels

- **Level 0**: Flat surfaces (no shadow)
- **Level 1**: Low elevation (cards, chips)
- **Level 2**: Medium elevation (app bar)
- **Level 3**: High elevation (FAB, dialogs)
- **Level 4**: Very high elevation (menus)
- **Level 5**: Highest elevation (modals)

### Categories

- **Món khô**: Phở, Bún chả, Cơm tấm, Bánh xèo,...
- **Món ướt**: Bánh mì, Hủ tiếu, Bún bò Huế,...
- **Ăn vặt**: Gỏi cuốn,...
- **Cà phê**: Cà phê sữa đá, đen đá, Cappuccino, Latte,...
- **Trà**: Matcha latte, Trà đào cam sả,...
- **Trà sữa, Sinh tố, Nước ép, Soda**

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

## 📝 TODO List

### ✅ Completed

- [x] **Seller Management**: Đăng ký bán hàng, đăng sản phẩm
- [x] **Revenue Management**: Quản lí đơn hàng và doanh thu
- [x] **Product Management**: Xem/xóa sản phẩm của seller
- [x] **Product Image Upload**: Upload ảnh thật cho sản phẩm
- [x] **Zustand Store**: User state và product state với persist
- [x] **Dynamic Greeting**: Hiển thị tên user trên Home
- [x] **Category UI**: Chips với animations khi chuyển đổi các tab
- [x] **Material Design 3**: Light Blue color theme (#87CEEB)
- [x] **React Native Paper**: Tích hợp Material UI components
- [x] **Playfair Display Font**: Font chữ t hỗ trợ tiếng Việt
- [x] **Animations**: Screen transitions, tab animations, haptic feedback
- [x] **Border Radius**: Bo góc mềm mại (10-36px)
- [x] **Code Refactor**: Merge duplicate files (home-enhanced, cart-enhanced)
- [x] **File Comments**: Thêm comments mô tả chức năng cho tất cả screens

### 🚧 In Progress

- [ ] **Edit Product**: Chức năng sửa sản phẩm cho seller
- [ ] **Order Management**: Khách hàng đặt đơn thật

### 📋 Planned

- [ ] **Backend API integration**: Supabase hoặc Node.js
- [ ] **Real-time notifications**: Thông báo đơn hàng mới
- [ ] **Payment gateway**: Tích hợp VNPay, MoMo, ZaloPay,...
- [ ] **Google Maps**: Theo dõi giao hàng
- [ ] **Chat support**: Khách và seller chat trực tiếp
- [ ] **Multi-language**: EN/VI
- [ ] **Product reviews & ratings**: Đánh giá sản phẩm
- [ ] **Seller analytics**: Biểu đồ doanh thu, thống kê
- [ ] **Push notifications**: Expo Notifications

---

---

# English Version

# 🍜 My First App - Food & Drink Ordering App

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Food & drink ordering app with seller management, built with Material You Design

## 📱 Screenshots

- 🏠 Home Screen with category filters (soft rounded corners)
- 🛒 Shopping Cart with quantity controls
- ❤️ Favorites with beautiful cards
- 💳 Payment with multiple methods
- 🎨 Material Design 3 with React Native Paper
- ✨ Smooth animations & haptic feedback
- 🎭 Playfair Display font (Vietnamese support)
- 💙 Light Blue color scheme

---

## ✨ Main Features

### 👥 For Buyers

- ✅ **Enhanced Home Page**: Search, filter by category, grid layout
    - Display "Hello, {Username}!"
    - Category chips with smooth animations
    - Haptic feedback on interactions
- ✅ **Product Details**: View full information, select size, ratings
- ✅ **Shopping Cart**: Add/remove/edit quantity, auto-calculate total
- ✅ **Favorites**: Save favorite products, quick add to cart
- ✅ **Payment**: Multiple methods (E-wallet, Cash, Card, Banking)
- ✅ **Order History**: View past orders

### 🏪 For Sellers

- ✅ **Seller Registration**: Registration form with store info, image upload
    - Status: Pending → awaiting approval within 24h
    - Status: Approved → Can sell products
- ✅ **Add Products**: Complete form with validation
    - Upload real product images
    - Enter name, description, category
    - Set prices by size (S/M/L)
    - Ingredients and features
    - Auto-save to store with AsyncStorage
- ✅ **View Your Products**: Manage posted products list
    - Display all posted products
    - View images, names, prices
    - Edit products (coming soon)
    - Delete products from store
- ✅ **Revenue Management**: Track orders and revenue
    - "New Orders" tab: New orders from customers
    - "Delivered" tab: Completed order history
    - Stats cards: Revenue from new orders, delivered orders, total revenue
    - Mark as delivered to move orders to "Delivered" tab

### 🔐 Authentication & State Management

- ✅ **Login**: Email/Password with Zustand + AsyncStorage
- ✅ **Registration**: New user registration form
- ✅ **Profile**: Manage personal information
- ✅ **Zustand Store**: State management with persist
    - User data auto-saves and restores on app reopen
    - Data syncs across all screens

---

## 🗂️ Project Structure

```
My-First-App/
├── app/
│   ├── (tabs)/                    # Bottom Tab Navigation
│   │   ├── index.js              # Redirect to home
│   │   ├── home.js               # Home screen ⭐ (search, filter, grid)
│   │   ├── cart.js               # Cart screen (Zustand store)
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
│   │   ├── ProductCard.js        # Product card with animations
│   │   ├── CartItemCard.js       # Cart item with Paper components
│   │   ├── EmptyState.js         # Empty state component
│   │   └── ScreenWrapper.js      # Screen wrapper with fade-in animation
│   ├── context/
│   │   └── ThemeContext.js       # Material You theme
│   ├── data/
│   │   ├── DrinkData.js          # Mock drink data
│   │   └── FoodData.js           # Mock food data
│   └── store/
│       ├── productStore.js       # Zustand store + AsyncStorage
│       └── userStore.js          # User state management
└── assets/                       # Images, fonts, etc.
    ├── images/                   # App icons, splash screens
    └── fonts/                    # Custom fonts (if any)
```

---

## 🚀 Installation & Running

### System Requirements

- Node.js >= 18.x
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation

```bash
# Clone repository
git clone https://github.com/Hinn27/My-First-App.git
cd My-First-App

# Install dependencies
npm install

# Or using yarn
yarn install
```

### Run the app

```bash
# Start Expo development server
npm start

# Or
npx expo start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on web
npm run web
```

### Clear cache (if errors occur)

```bash
npx expo start --clear
```

### Fix java.io.IOException: Failed to download remote updates

```bash
npx expo start --tunnel
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

### UI Components & Design

- **react-native-paper** - Material Design 3 components (MUI)
- **@expo-google-fonts/playfair-display** - Playfair Display font (Vietnamese support)
- **@expo/vector-icons** - Icon library
- **expo-linear-gradient** - Gradient backgrounds
- **expo-image-picker** - Image selection
- **expo-haptics** - Haptic feedback for better UX

### Storage & Utilities

- **@react-native-async-storage/async-storage** - Persistent storage
- **react-native-reanimated** - Smooth animations
- **react-native-gesture-handler** - Gesture handling

---

## 📚 User Guide

### For Buyers

1. **View Products**
    - Open the **"Home"** tab
    - Use search bar to find products
    - Select category to filter (Dry dishes, Wet dishes, Snacks, Coffee, Tea...)

2. **Add to Cart**
    - Tap on a product to view details
    - Select size (S/M/L)
    - Tap "Add to Cart" button
    - Or tap "+" button directly from ProductCard

3. **Manage Cart**
    - Go to "Cart" tab
    - Increase/decrease quantity with +/- buttons
    - Item auto-removes when quantity = 0
    - View auto-calculated total

4. **Checkout**
    - Tap "Checkout" in Cart
    - Select payment method
    - Confirm → Success animation
    - Order auto-saves to history

5. **Favorites**
    - Tap ❤️ icon to add/remove favorites
    - Go to "Favorites" tab to view list
    - Add to cart directly from Favorites

### For Sellers

1. **Register as Seller**
    - Go to "Profile" tab
    - Tap "Register as Seller"
    - Fill in information: Name, store name, address, phone
    - Upload store image
    - Submit → Status "Pending approval within 24h"

2. **Add Products** (after approval)
    - Go to "Profile" tab
    - Tap "Add Product"
    - Fill form:
        - Upload product image from gallery
        - Product name
        - Type (Food/Drink)
        - Category
        - Short & detailed description
        - Price by size
        - Ingredients (optional)
    - Submit → Product auto-saves to store

3. **View Your Products**
    - Tap "View Your Products" in Profile
    - View list of all posted products (saved in Zustand store)
    - Display real images or emoji icons (fallback)
    - View prices from low to high
    - Tap "Edit" to modify (coming soon)
    - Tap "Delete" to remove product → Auto-removes from store

4. **Revenue Management**
    - Tap "Revenue Management" in Profile
    - View 3 stats cards:
        - Revenue from new orders
        - Revenue from delivered orders
        - Total revenue
    - "New Orders" tab: New orders from customers
        - Tap "Mark as Delivered" to move to "Delivered" tab
    - "Delivered" tab: Completed order history

5. **Quick Test** (Developer)
    - Go to "Profile" tab
    - Scroll down to Settings
    - Tap "🧪 Test: Set approved seller"
    - Seller menu appears with 3 features

---

## 🎨 Design

### Material Design 3 (Material You)

The app follows **Material Design 3** guidelines by Google:

- **UI Components**: TextInput, Button, Card, List, Chip, IconButton from React Native Paper
- **Dynamic Color System**: Primary color Light Blue (#87CEEB)
- **Elevation System**: 6 levels from 0 (flat) to 5 (highest)
- **Shape System** - Soft rounded corners:
    - Extra Small: 10px radius
    - Small: 14px radius
    - Medium: 18px radius
    - Large: 28px radius
    - Extra Large: 36px radius
- **Typography**: Playfair Display font (full Vietnamese support)
- **Roundness**: 16px for Paper components
- **Components**:
    - Flat Cards (no border, soft rounded corners)
    - Elevated Cards with shadow
    - Filled/Outlined/Text buttons
    - Bottom Navigation with animations
    - Smooth tab transitions with haptic feedback

### Color Palette - Light Blue Theme

- **Primary**: #87CEEB (Sky Blue) - Main brand color
- **Primary Container**: #E0F6FF - Light blue container
- **Secondary**: #B0E0E6 (Powder Blue) - Supporting elements
- **Tertiary**: #ADD8E6 (Light Blue) - Accents
- **Surface**: #FFFBFE - Card backgrounds
- **Background**: #FFFBFE - App background
- **Error**: #B3261E - Error states

### Animations & Interactions

- **Screen Transitions**: Fade-in and slide-up animations when switching screens
- **Tab Animations**: Scale and opacity animations for tab icons
- **Product Cards**: Press animations with scale effect
- **Haptic Feedback**:
    - Light impact when switching tabs
    - Light impact when selecting category
    - Success notification when adding to cart
- **Smooth Scrolling**: Optimized FlatList and ScrollView

### Elevation Levels

- **Level 0**: Flat surfaces (no shadow) - Profile cards
- **Level 1**: Low elevation (cards, chips)
- **Level 2**: Medium elevation (app bar, tab bar)
- **Level 3**: High elevation (FAB, dialogs)
- **Level 4**: Very high elevation (menus)
- **Level 5**: Highest elevation (modals)

### Categories

- **Dry Dishes**: Pho, Bun Cha, Com Tam, Banh Xeo
- **Wet Dishes**: Banh Mi, Hu Tieu, Bun Bo Hue
- **Snacks**: Goi Cuon
- **Coffee**: Vietnamese Iced Coffee, Black Coffee, Cappuccino, Latte
- **Tea**: Matcha Latte, Peach Tea with Orange & Lemongrass
- **Milk Tea, Smoothies, Juice, Soda**

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

- Go to Profile → Test Functions → Clear cache (if available)
- Or delete app and reinstall

### iOS/Android build errors

```bash
# Update dependencies
npx expo install --check

# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 TODO List

### ✅ Completed

- [x] **Seller Management**: Seller registration, add products
- [x] **Revenue Management**: Manage orders and revenue
- [x] **Product Management**: View/delete seller products
- [x] **Product Image Upload**: Upload real product images
- [x] **Zustand Store**: User state and product state with persist
- [x] **Dynamic Greeting**: Display username on Home
- [x] **Category UI**: Chips with smooth animations
- [x] **Material Design 3**: Light Blue color theme (#87CEEB)
- [x] **React Native Paper**: Material UI components integration
- [x] **Playfair Display Font**: Beautiful font with Vietnamese support
- [x] **Animations**: Screen transitions, tab animations, haptic feedback
- [x] **Border Radius**: Soft rounded corners (10-36px)
- [x] **Code Refactor**: Merge duplicate files (home-enhanced, cart-enhanced)
- [x] **File Comments**: Add function descriptions for all screens

### 🚧 In Progress

- [ ] **Edit Product**: Product editing feature for sellers
- [ ] **Order Management**: Real customer orders

### 📋 Planned

- [ ] **Backend API integration**: Supabase or Node.js
- [ ] **Real-time notifications**: New order notifications
- [ ] **Payment gateway**: Integrate VNPay, MoMo, ZaloPay
- [ ] **Google Maps**: Delivery tracking
- [ ] **Chat support**: Direct chat between customers and sellers
- [ ] **Multi-language**: EN/VI
- [ ] **Product reviews & ratings**: Product reviews
- [ ] **Seller analytics**: Revenue charts, statistics
- [ ] **Push notifications**: Expo Notifications

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

- Use this code for personal or commercial projects
- Modify and distribute the code
- Use it in private projects
- Sell software that includes this code

❗ **You must:**

- Include the original copyright notice
- Include the MIT License text

⚠️ **You cannot:**

- Hold the author liable for any damages

See the [LICENSE](LICENSE) file for full details.

---

## 👨‍💻 Author

**Hinn27**

- GitHub: [@Hinn27](https://github.com/Hinn27)
- Email: hduc27760@gmail.com

---

## 🙏 Acknowledgments

- Inspired by [Coffee-Shop-App](https://github.com/darshanpawar101/Coffee-Shop-App)
- Material You Design by Google
- Icons by Expo Vector Icons
- Built with ❤️ using React Native & Expo
- Document by GPT-4

---

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Email: hduc27760@gmail.com

---

**⭐ If you like this project, please give it a star on GitHub!**
