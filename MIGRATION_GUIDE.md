# My-First-App - Coffee Shop Enhanced

## 🎉 Tính năng đã được migrate từ Coffee-Shop-App

### ✅ Đã hoàn thành

1. **State Management với Zustand + AsyncStorage**

    - Store toàn cục quản lý: products, cart, favorites, order history
    - Data persistence với AsyncStorage
    - File: `src/store/productStore.js`

2. **Dữ liệu sản phẩm**

    - CoffeeData: 8 sản phẩm đồ uống (cà phê, trà sữa, sinh tố...)
    - FoodData: 8 món ăn Việt Nam (phở, bún, cơm...)
    - Files: `src/data/CoffeeData.js`, `src/data/FoodData.js`

3. **Components tái sử dụng**

    - ProductCard: Card hiển thị sản phẩm với rating, price, favorite
    - CartItemCard: Card giỏ hàng với quantity controls
    - Files: `src/components/ProductCard.js`, `src/components/CartItemCard.js`

4. **Home Screen Enhanced** (`app/(tabs)/home-enhanced.js`)

    - Search bar tìm kiếm sản phẩm
    - Category filters (Tất cả, Cà phê, Trà sữa, Món Việt...)
    - Product grid với 2 columns
    - Add to cart, add to favorites
    - Beautiful gradient UI theo Coffee-Shop-App

5. **Product Detail Screen** (`app/product/[id].js`)

    - Large product image with icon
    - Product description (expand/collapse)
    - Size selection (S, M, L)
    - Rating and reviews count
    - Ingredients display
    - Add to cart with selected size
    - Toggle favorite

6. **Cart Screen Enhanced** (`app/(tabs)/cart-enhanced.js`)

    - Display cart items with CartItemCard
    - Increment/Decrement quantity per size
    - Auto remove item when quantity = 0
    - Calculate total price
    - Empty cart state
    - Checkout button → Payment screen

7. **Payment Screen** (`app/payment.js`)

    - Payment method selection (Wallet, Cash, Card, Banking)
    - Order summary with breakdown
    - Total amount display
    - Success animation
    - Auto add to order history after payment

8. **Favorites Screen** (`app/(tabs)/favorites.js`)

    - Display favorite products in grid
    - Remove from favorites
    - Add to cart from favorites
    - Empty state with "Explore" button

9. **Order History Screen** (`app/order-history.js`)
    - Display past orders
    - Order date, time, status
    - List of items in each order
    - Total price per order
    - Empty state

### 📱 Cấu trúc Tabs mới

```
Home (index) - Trang chủ gốc với location
Coffee Shop (home-enhanced) - Shop style Coffee-Shop-App ⭐
Favorites - Yêu thích
Cart - Giỏ hàng (sử dụng cart-enhanced thực tế)
Profile - Hồ sơ người dùng
```

### 🎨 Giao diện

-   **Material You Design**: Sử dụng theme colors từ ThemeContext
-   **Gradient UI**: LinearGradient cho cards và backgrounds
-   **Smooth Animations**: Success animations, toast notifications
-   **Icons**: Ionicons từ @expo/vector-icons

### 🚀 Cách sử dụng

1. **Cài đặt dependencies** (đã xong):

```bash
npm install zustand immer @react-native-async-storage/async-storage expo-linear-gradient
```

2. **Chạy app**:

```bash
npm start
# hoặc
npx expo start
```

3. **Navigate giữa các screens**:
    - Tab "Coffee Shop" → Xem sản phẩm, tìm kiếm, lọc
    - Tap vào ProductCard → Chi tiết sản phẩm
    - Tap nút "+" → Thêm vào giỏ
    - Tap icon heart → Thêm/Xóa yêu thích
    - Tab "Cart" → Xem giỏ hàng
    - Tap "Thanh toán" → Payment screen
    - Tap "Xác nhận thanh toán" → Success + Order History

### 🔧 Tính năng còn lại (chưa implement)

1. **Auth screens (Login/Register)**

    - Đăng nhập/Đăng ký người dùng
    - Form validation
    - Integrate với backend hoặc AsyncStorage

2. **Push Notifications**

    - Thông báo trạng thái đơn hàng
    - Sử dụng expo-notifications

3. **Store Locator với Map**

    - Tích hợp react-native-maps
    - Hiển thị vị trí cửa hàng
    - Directions/Navigation

4. **Reviews & Ratings**
    - Người dùng có thể đánh giá sản phẩm
    - Hiển thị reviews chi tiết
    - Filter by rating

### 📦 Structure

```
My-First-App/
├── src/
│   ├── store/
│   │   └── productStore.js          # Zustand store
│   ├── data/
│   │   ├── CoffeeData.js            # Coffee products
│   │   └── FoodData.js              # Food products
│   ├── components/
│   │   ├── ProductCard.js           # Product card component
│   │   └── CartItemCard.js          # Cart item component
│   └── context/
│       ├── CartContext.js           # Cart context (old)
│       └── ThemeContext.js          # Theme context
├── app/
│   ├── (tabs)/
│   │   ├── index.js                 # Home (original)
│   │   ├── home-enhanced.js         # Coffee Shop Home ⭐
│   │   ├── cart.js                  # Cart (original)
│   │   ├── cart-enhanced.js         # Enhanced Cart ⭐
│   │   ├── favorites.js             # Favorites ⭐
│   │   ├── profile.js               # Profile
│   │   └── _layout.js               # Tabs layout
│   ├── product/
│   │   └── [id].js                  # Product detail ⭐
│   ├── payment.js                   # Payment screen ⭐
│   ├── order-history.js             # Order history ⭐
│   └── _layout.js                   # Root layout
└── package.json
```

### 🎯 Next Steps

Để hoàn thiện app theo yêu cầu, bạn có thể:

1. Thay thế tab "Cart" bằng "cart-enhanced" trong `_layout.js`
2. Implement Auth screens với form validation
3. Thêm push notifications với expo-notifications
4. Tích hợp maps cho store locator
5. Thêm review/rating system
6. Connect với backend API thay vì mock data
7. Thêm loading states và error handling
8. Optimize performance với useMemo, useCallback

### 🎨 Theme Colors (Coffee Shop Style)

```javascript
Primary: #D17842 (Orange)
Background: #0C0F14 (Dark) / #FFFFFF (Light)
Surface: #252A32 (Dark) / #F7F8FB (Light)
Error: #DC3535 (Red)
Success: #4CAF50 (Green)
```

### 📝 Notes

-   Tất cả screens đều responsive và hỗ trợ dark mode
-   Data được persist với AsyncStorage
-   Sử dụng Expo Router cho navigation
-   Components có thể tái sử dụng với theme props
-   Icons sử dụng Ionicons

---

**Created by**: GitHub Copilot
**Date**: 2025
**Based on**: Coffee-Shop-App architecture
