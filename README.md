# 🍜 My First App - Food & Drink Ordering App

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Ứng dụng đặt đồ ăn & đồ uống, quản lý bán hàng với giao diện Material You Design

**[🌍 English Version Below](#english-version)**

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
    -   Upload ảnh sản phẩm thật
    -   Nhập tên, mô tả, danh mục
    -   Set giá theo size (S/M/L)
    -   Nguyên liệu và đặc điểm
    -   Tự động lưu vào store với AsyncStorage
-   ✅ **Xem sản phẩm của bạn**: Quản lý danh sách sản phẩm đã đăng
    -   Hiển thị tất cả sản phẩm đã đăng
    -   Xem ảnh, tên, giá sản phẩm
    -   Sửa sản phẩm (coming soon)
    -   Xóa sản phẩm khỏi store
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
npx expo sta

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

# Lỗi java.io.IOException: Failed to download remote updates

```bash
npx expo start --tunnel
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

### Material Design 3 (Material You)

Ứng dụng tuân theo **Material Design 3** guidelines của Google:

-   **Dynamic Color System**: Màu sắc chủ đạo với Cyan (#006A6A)
-   **Elevation System**: 6 levels từ 0 (flat) đến 5 (highest)
-   **Shape System**:
    -   Small components: 8px radius
    -   Medium components: 12px radius
    -   Large components: 16-24px radius
-   **Typography**: Roboto font family
-   **Components**:
    -   Elevated Cards với shadow
    -   Floating Action Buttons (FAB)
    -   Filled/Outlined/Text buttons
    -   Bottom Navigation với ripple effect

### Color Palette

-   **Primary**: #006A6A (Cyan) - Main brand color
-   **Secondary**: #4A6363 (Teal-gray) - Supporting elements
-   **Tertiary**: #4B607C (Blue-gray) - Accents
-   **Surface**: #FFFBFE - Card backgrounds
-   **Background**: #FFFBFE - App background
-   **Error**: #B3261E - Error states

### Elevation Levels

-   **Level 0**: Flat surfaces (no shadow)
-   **Level 1**: Low elevation (cards, chips)
-   **Level 2**: Medium elevation (app bar)
-   **Level 3**: High elevation (FAB, dialogs)
-   **Level 4**: Very high elevation (menus)
-   **Level 5**: Highest elevation (modals)

### Categories

-   **Món khô**: Phở, Bún chả, Cơm tấm, Bánh xèo,...
-   **Món ướt**: Bánh mì, Hủ tiếu, Bún bò Huế,...
-   **Ăn vặt**: Gỏi cuốn,...
-   **Cà phê**: Cà phê sữa đá, đen đá, Cappuccino, Latte,...
-   **Trà**: Matcha latte, Trà đào cam sả,...
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

## 📝 TODO List

### ✅ Completed

-   [x] **Seller Management**: Đăng ký bán hàng, đăng sản phẩm
-   [x] **Revenue Management**: Quản lí đơn hàng và doanh thu
-   [x] **Product Management**: Xem/xóa sản phẩm của seller
-   [x] **Product Image Upload**: Upload ảnh thật cho sản phẩm
-   [x] **Zustand Store**: User state và product state với persist
-   [x] **Dynamic Greeting**: Hiển thị tên user trên Home
-   [x] **Category UI**: Bo tròn 10, fixed wrapper
-   [x] **Material Design 3**: Cyan color theme
-   [x] **Code Refactor**: Merge duplicate files (home-enhanced, cart-enhanced)
-   [x] **File Comments**: Thêm comments mô tả chức năng cho tất cả screens

### 🚧 In Progress

-   [ ] **Edit Product**: Chức năng sửa sản phẩm cho seller
-   [ ] **Order Management**: Khách hàng đặt đơn thật

### 📋 Planned

-   [ ] **Backend API integration**: Supabase hoặc Node.js
-   [ ] **Real-time notifications**: Thông báo đơn hàng mới
-   [ ] **Payment gateway**: Tích hợp VNPay, MoMo, ZaloPay,...
-   [ ] **Google Maps**: Theo dõi giao hàng
-   [ ] **Chat support**: Khách và seller chat trực tiếp
-   [ ] **Multi-language**: EN/VI
-   [ ] **Product reviews & ratings**: Đánh giá sản phẩm
-   [ ] **Seller analytics**: Biểu đồ doanh thu, thống kê
-   [ ] **Push notifications**: Expo Notifications

---

---

# English Version

# 🍜 My First App - Food & Drink Ordering App

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Food & drink ordering app with seller management, built with Material You Design

## 📱 Screenshots

-   🏠 Home Screen with category filters (rounded corners)
-   🛒 Shopping Cart with quantity controls
-   ❤️ Favorites with beautiful cards
-   💳 Payment with multiple methods
-   🎨 Material You Design color scheme
-   ✨ Smooth animations

---

## ✨ Main Features

### 👥 For Buyers

-   ✅ **Enhanced Home Page**: Search, filter by category, grid layout
    -   Display "Hello, {Username}!"
    -   Rounded category buttons
-   ✅ **Product Details**: View full information, select size, ratings
-   ✅ **Shopping Cart**: Add/remove/edit quantity, auto-calculate total
-   ✅ **Favorites**: Save favorite products, quick add to cart
-   ✅ **Payment**: Multiple methods (E-wallet, Cash, Card, Banking)
-   ✅ **Order History**: View past orders

### 🏪 For Sellers

-   ✅ **Seller Registration**: Registration form with store info, image upload
    -   Status: Pending → awaiting approval within 24h
    -   Status: Approved → Can sell products
-   ✅ **Add Products**: Complete form with validation
    -   Upload real product images
    -   Enter name, description, category
    -   Set prices by size (S/M/L)
    -   Ingredients and features
    -   Auto-save to store with AsyncStorage
-   ✅ **View Your Products**: Manage posted products list
    -   Display all posted products
    -   View images, names, prices
    -   Edit products (coming soon)
    -   Delete products from store
-   ✅ **Revenue Management**: Track orders and revenue
    -   "New Orders" tab: New orders from customers
    -   "Delivered" tab: Completed order history
    -   Stats cards: Revenue from new orders, delivered orders, total revenue
    -   Mark as delivered to move orders to "Delivered" tab

### 🔐 Authentication & State Management

-   ✅ **Login**: Email/Password with Zustand + AsyncStorage
-   ✅ **Registration**: New user registration form
-   ✅ **Profile**: Manage personal information
-   ✅ **Zustand Store**: State management with persist
    -   User data auto-saves and restores on app reopen
    -   Data syncs across all screens

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

## 🚀 Installation & Running

### System Requirements

-   Node.js >= 18.x
-   npm or yarn
-   Expo CLI
-   iOS Simulator or Android Emulator (or Expo Go app)

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

-   **Dynamic Color System**: Primary color Cyan (#006A6A)
-   **Elevation System**: 6 levels from 0 (flat) to 5 (highest)
-   **Shape System**:
    -   Small components: 8px radius
    -   Medium components: 12px radius
    -   Large components: 16-24px radius
-   **Typography**: Roboto font family
-   **Components**:
    -   Elevated Cards with shadow
    -   Floating Action Buttons (FAB)
    -   Filled/Outlined/Text buttons
    -   Bottom Navigation with ripple effect

### Color Palette

-   **Primary**: #006A6A (Cyan) - Main brand color
-   **Secondary**: #4A6363 (Teal-gray) - Supporting elements
-   **Tertiary**: #4B607C (Blue-gray) - Accents
-   **Surface**: #FFFBFE - Card backgrounds
-   **Background**: #FFFBFE - App background
-   **Error**: #B3261E - Error states

### Elevation Levels

-   **Level 0**: Flat surfaces (no shadow)
-   **Level 1**: Low elevation (cards, chips)
-   **Level 2**: Medium elevation (app bar)
-   **Level 3**: High elevation (FAB, dialogs)
-   **Level 4**: Very high elevation (menus)
-   **Level 5**: Highest elevation (modals)

### Categories

-   **Dry Dishes**: Pho, Bun Cha, Com Tam, Banh Xeo
-   **Wet Dishes**: Banh Mi, Hu Tieu, Bun Bo Hue
-   **Snacks**: Goi Cuon
-   **Coffee**: Vietnamese Iced Coffee, Black Coffee, Cappuccino, Latte
-   **Tea**: Matcha Latte, Peach Tea with Orange & Lemongrass
-   **Milk Tea, Smoothies, Juice, Soda**

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

-   Go to Profile → Test Functions → Clear cache (if available)
-   Or delete app and reinstall

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

-   [x] **Seller Management**: Seller registration, add products
-   [x] **Revenue Management**: Manage orders and revenue
-   [x] **Product Management**: View/delete seller products
-   [x] **Product Image Upload**: Upload real product images
-   [x] **Zustand Store**: User state and product state with persist
-   [x] **Dynamic Greeting**: Display username on Home
-   [x] **Category UI**: Rounded corners, fixed wrapper
-   [x] **Material Design 3**: Cyan color theme
-   [x] **Code Refactor**: Merge duplicate files (home-enhanced, cart-enhanced)
-   [x] **File Comments**: Add function descriptions for all screens

### 🚧 In Progress

-   [ ] **Edit Product**: Product editing feature for sellers
-   [ ] **Order Management**: Real customer orders

### 📋 Planned

-   [ ] **Backend API integration**: Supabase or Node.js
-   [ ] **Real-time notifications**: New order notifications
-   [ ] **Payment gateway**: Integrate VNPay, MoMo, ZaloPay
-   [ ] **Google Maps**: Delivery tracking
-   [ ] **Chat support**: Direct chat between customers and sellers
-   [ ] **Multi-language**: EN/VI
-   [ ] **Product reviews & ratings**: Product reviews
-   [ ] **Seller analytics**: Revenue charts, statistics
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
-   Document by GPT-4

---

## 📞 Support

If you have any questions or need help, please:

-   Open an issue on GitHub
-   Email: hduc27760@gmail.com

---

**⭐ If you like this project, please give it a star on GitHub!**
