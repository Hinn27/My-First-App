// Screen: Product Detail - Chi tiết sản phẩm
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Dimensions,
    Alert,
    StatusBar,
    Image,
    TextInput,
    Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Import SafeAreaInsets
import { useTheme } from "../../src/context/ThemeContext";
import { useProductStore } from "../../src/store/productStore";
import { useUserStore } from "../../src/store/userStore";

const { height } = Dimensions.get("window");

// Helper: Return fixed comments list (from user-provided data) with reasonable ratings
const generateRandomComments = (productId) => {
    // List provided by user (names + comment). We'll map to objects with ratings.
    const raw = [
        ["Nguyễn Minh Hòa", "Món này rất ngon, mình sẽ quay lại!"],
        ["Trần Gia Khánh", "Hơi ngọt so với khẩu vị của mình, nhưng vẫn ổn."],
        ["Lê Anh Thư", "Giao hàng nhanh, đóng gói cẩn thận."],
        ["Phạm Quốc Bảo", "Vị đậm đà, rất thích hợp cho bữa sáng."],
        ["Võ Hải Yến", "Không ngon như mong đợi, cần cải thiện thêm."],
        ["Hoàng Tuấn Kiệt", "Tuyệt vời! Chắc chắn sẽ giới thiệu cho bạn bè."],
        ["Đinh Thảo Nguyên", "Giá hơi cao nhưng chất lượng tương xứng."],
        ["Bùi Khánh Linh", "Món ăn nóng hổi, rất ngon miệng."],
        ["Ngô Minh Trí", "Nhân viên phục vụ nhiệt tình, món ăn ra nhanh."],
        ["Phan Nhật Vy", "Sẽ ủng hộ quán dài dài."],
        ["Nguyễn Hữu Phát", "Món này rất ngon, mình sẽ quay lại!"],
        ["Trần Thanh Tuyền", "Hơi ngọt so với khẩu vị của mình, nhưng vẫn ổn."],
        ["Lê Đức Thịnh", "Giao hàng nhanh, đóng gói cẩn thận."],
        ["Phạm Ngọc Hà", "Vị đậm đà, rất thích hợp cho bữa sáng."],
        ["Võ Đăng Khoa", "Không ngon như mong đợi, cần cải thiện thêm."],
        ["Hoàng Mai Chi", "Tuyệt vời! Chắc chắn sẽ giới thiệu cho bạn bè."],
        ["Đinh Quốc Hưng", "Giá hơi cao nhưng chất lượng tương xứng."],
        ["Bùi Tố Uyên", "Món ăn nóng hổi, rất ngon miệng."],
        ["Ngô Thanh Sơn", "Nhân viên phục vụ nhiệt tình, món ăn ra nhanh."],
        ["Phan Diệu My", "Sẽ ủng hộ quán dài dài."],
        ["Nguyễn Hồng Anh", "Món này rất ngon, mình sẽ quay lại!"],
        ["Trần Chí Công", "Hơi ngọt so với khẩu vị của mình, nhưng vẫn ổn."],
        ["Lê Thanh Hương", "Giao hàng nhanh, đóng gói cẩn thận."],
        ["Phạm Minh Tâm", "Vị đậm đà, rất thích hợp cho bữa sáng."],
        ["Võ Khánh Duy", "Không ngon như mong đợi, cần cải thiện thêm."],
        ["Hoàng Thị Thảo", "Tuyệt vời! Chắc chắn sẽ giới thiệu cho bạn bè."],
        ["Đinh Ngọc Long", "Giá hơi cao nhưng chất lượng tương xứng."],
        ["Bùi Huỳnh Như", "Món ăn nóng hổi, rất ngon miệng."],
        ["Ngô Lâm Phong", "Nhân viên phục vụ nhiệt tình, món ăn ra nhanh."],
        ["Phan Mỹ Duyên", "Sẽ ủng hộ quán dài dài."],
        ["Nguyễn Thanh Sang", "Món này rất ngon, mình sẽ quay lại!"],
        ["Trần Hà Mi", "Hơi ngọt so với khẩu vị của mình, nhưng vẫn ổn."],
        ["Lê Quốc Khánh", "Giao hàng nhanh, đóng gói cẩn thận."],
        ["Phạm Linh Đan", "Vị đậm đà, rất thích hợp cho bữa sáng."],
        ["Võ Tấn Đạt", "Không ngon như mong đợi, cần cải thiện thêm."],
        ["Hoàng Gia Hân", "Tuyệt vời! Chắc chắn sẽ giới thiệu cho bạn bè."],
        ["Đinh Thiên Phúc", "Giá hơi cao nhưng chất lượng tương xứng."],
        ["Bùi Quỳnh Như", "Món ăn nóng hổi, rất ngon miệng."],
        ["Ngô Trọng Tín", "Nhân viên phục vụ nhiệt tình, món ăn ra nhanh."],
        ["Phan Ngọc Ái", "Sẽ ủng hộ quán dài dài."],
        ["Nguyễn Quốc Việt", "Món này rất ngon, mình sẽ quay lại!"],
        ["Trần Thu Hà", "Hơi ngọt so với khẩu vị của mình, nhưng vẫn ổn."],
        ["Lê Ngọc Thiện", "Giao hàng nhanh, đóng gói cẩn thận."],
        ["Phạm Minh Khang", "Vị đậm đà, rất thích hợp cho bữa sáng."],
        ["Võ Như Quỳnh", "Không ngon như mong đợi, cần cải thiện thêm."],
        ["Hoàng Hoài Nam", "Tuyệt vời! Chắc chắn sẽ giới thiệu cho bạn bè."],
        ["Đinh Phương Trinh", "Giá hơi cao nhưng chất lượng tương xứng."],
        ["Bùi Thế Anh", "Món ăn nóng hổi, rất ngon miệng."],
        ["Ngô Hạ Vy", "Nhân viên phục vụ nhiệt tình, món ăn ra nhanh."],
        ["Phan Gia Lộc", "Sẽ ủng hộ quán dài dài."],
    ];

    // Map comment text to reasonable rating
    const ratingForText = (text) => {
        if (/không ngon|cần cải thiện/i.test(text)) return 2;
        if (/hơi ngọt/i.test(text)) return 4;
        if (/giá hơi cao/i.test(text)) return 3;
        if (
            /giao hàng nhanh|nhân viên phục vụ nhiệt tình|đóng gói cẩn thận/i.test(
                text
            )
        )
            return 5;
        if (/tuyệt vời|rất ngon|ủng hộ quán/i.test(text)) return 5;
        return 4;
    };

    const fullComments = raw.map((arr, i) => ({
        id: `c-${productId}-${i}`,
        userId: `u-${i}`,
        userName: arr[0],
        avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(arr[0])}`,
        content: arr[1],
        rating: ratingForText(arr[1]),
        date: `${(i % 5) + 1} ngày trước`,
        isMyComment: false,
    }));

    // Distribute comments pseudo-randomly per product: pick between 3-12 comments per product
    // We will use productId's codepoints to seed a deterministic index
    const seed = Array.from(productId).reduce(
        (a, ch) => a + (ch.codePointAt(0) || 0),
        0
    );
    const start = seed % Math.max(1, fullComments.length - 6);
    const count = 3 + (seed % 10); // 3..12
    const selected = [];
    for (let i = 0; i < count; i++) {
        selected.push(fullComments[(start + i) % fullComments.length]);
    }

    return selected;
};

export default function ProductDetailScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const { id, type } = useLocalSearchParams();
    const insets = useSafeAreaInsets(); // Get safe area insets
    const styles = createStyles(theme); // Pass insets to styles

    // Get product from store
    const drinkList = useProductStore((state) => state.drinkList);
    const foodList = useProductStore((state) => state.foodList);
    const addToCart = useProductStore((state) => state.addToCart);
    const calculateCartPrice = useProductStore(
        (state) => state.calculateCartPrice
    );
    const addToFavoriteList = useProductStore(
        (state) => state.addToFavoriteList
    );
    const deleteFromFavoriteList = useProductStore(
        (state) => state.deleteFromFavoriteList
    );
    const user = useUserStore((state) => state.user);

    // Find product by ID instead of index
    const productList = type === "Drink" ? drinkList : foodList;
    const product = productList
        ? productList.find((item) => String(item.id) === String(id))
        : null;

    // Hooks must be declared unconditionally
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [fullDesc, setFullDesc] = useState(false);
    // Comment state
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [likedComments, setLikedComments] = useState([]);

    // Load comments and selected price on mount or id change
    useEffect(() => {
        const randomComments = generateRandomComments(id);
        setComments(randomComments);
        // Reset other states when product changes
        if (product && product.prices && product.prices.length > 0) {
            setSelectedPrice(product.prices[0]);
        } else {
            setSelectedPrice(null);
        }
        setFullDesc(false);
        setNewComment("");
        setLikedComments([]);
    }, [id, product]);

    // Derive average rating and ratings count from comments
    const [avgRating, setAvgRating] = React.useState(() => {
        if (!comments || comments.length === 0)
            return product ? product.average_rating || 0 : 0;
        const avg =
            comments.reduce((s, c) => s + (Number(c.rating) || 0), 0) /
            comments.length;
        return Math.round(avg * 10) / 10;
    });
    const [ratingsCount, setRatingsCount] = React.useState(
        () => comments.length
    );

    useEffect(() => {
        if (!comments || comments.length === 0) {
            setRatingsCount(0);
            setAvgRating(product ? product.average_rating || 0 : 0);
            return;
        }
        const sum = comments.reduce((s, c) => s + (Number(c.rating) || 0), 0);
        const avg = sum / comments.length;
        setAvgRating(Math.round(avg * 10) / 10);
        setRatingsCount(comments.length);
    }, [comments, product]);

    // Toggle favorite
    const handleToggleFavorite = () => {
        if (!product) return;

        const isFavorited = product.favourite || false;
        if (isFavorited) {
            deleteFromFavoriteList(product.type, product.id);
        } else {
            addToFavoriteList(product.type, product.id);
        }
    };

    // Add to cart
    const handleAddToCart = () => {
        if (!product) {
            Alert.alert("Lỗi", "Không thể tìm thấy sản phẩm");
            return;
        }

        addToCart({
            id: product.id,
            index: product.index,
            name: product.name,
            roasted: product.roasted,
            imageIcon: product.imageIcon,
            special_ingredient: product.special_ingredient,
            type: product.type,
            prices: selectedPrice ? [{ ...selectedPrice, quantity: 1 }] : [],
        });
        calculateCartPrice();
        Alert.alert("Thành công", `Đã thêm ${product.name} vào giỏ hàng!`, [
            {
                text: "Xem giỏ hàng",
                onPress: () => router.push("/cart"),
            },
            { text: "Tiếp tục mua" },
        ]);
    };

    // Handle Post Comment
    const handlePostComment = () => {
        if (!newComment.trim()) return;

        if (!user) {
            Alert.alert("Thông báo", "Vui lòng đăng nhập để bình luận.", [
                {
                    text: "Đăng nhập",
                    onPress: () => router.push("/auth/login"),
                },
                { text: "Hủy" },
            ]);
            return;
        }

        const comment = {
            id: Date.now().toString(),
            userId: user.email || "me",
            userName: user.name || "Tôi",
            avatar: null,
            content: newComment,
            rating: 5,
            date: "Vừa xong",
            isMyComment: true,
        };

        setComments([comment, ...comments]);
        setNewComment("");
    };

    // Handle Delete Comment
    const handleDeleteComment = (commentId) => {
        Alert.alert("Xác nhận", "Bạn có chắc muốn xóa bình luận này?", [
            { text: "Hủy", style: "cancel" },
            {
                text: "Xóa",
                style: "destructive",
                onPress: () => {
                    setComments(comments.filter((c) => c.id !== commentId));
                },
            },
        ]);
    };

    // Handle Like Comment
    const handleLikeComment = (commentId) => {
        if (likedComments.includes(commentId)) {
            setLikedComments(likedComments.filter((id) => id !== commentId));
        } else {
            setLikedComments([...likedComments, commentId]);
        }
    };

    // Handle case if product not found (render a friendly message)
    if (!product) {
        return (
            <View
                style={[
                    styles.container,
                    { justifyContent: "center", alignItems: "center" },
                ]}
            >
                <Text>Sản phẩm không tồn tại</Text>
                <Pressable
                    onPress={() => router.back()}
                    style={{ marginTop: 20 }}
                >
                    <Text style={{ color: theme.primary }}>Quay lại</Text>
                </Pressable>
            </View>
        );
    }

    // No longer need shopForProduct - using product.shopName and product.shopId directly

    return (
        <View style={styles.container}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content" // Vì ảnh header thường sáng màu hoặc có nền sáng
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                bounces={false} // Prevent bouncing at top to avoid gap
            >
                {/* Image Header */}
                <View style={styles.imageSection}>
                    <View style={styles.imageContainer}>
                        {/* Product Image */}
                        <View style={styles.imageIconContainer}>
                            {product?.imagelink_square ? (
                                <Image
                                    source={
                                        typeof product.imagelink_square ===
                                        "string"
                                            ? { uri: product.imagelink_square }
                                            : product.imagelink_square
                                    }
                                    style={styles.productImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Text style={styles.imageIcon}>
                                    {product.imageIcon || "🍽️"}
                                </Text>
                            )}
                        </View>

                        {/* Product Basic Info Overlay */}
                        <View style={styles.overlayInfo}>
                            <View style={styles.basicInfo}>
                                <View style={styles.nameSection}>
                                    <Text style={styles.productName}>
                                        {product.name}
                                    </Text>
                                    <Text style={styles.specialIngredient}>
                                        {product.special_ingredient}
                                    </Text>
                                </View>

                                <View style={styles.statsRow}>
                                    <View style={styles.statBox}>
                                        <Ionicons
                                            name="star"
                                            size={20}
                                            color="#FFD700"
                                        />
                                        <Text style={styles.statText}>
                                            {avgRating}
                                        </Text>
                                        <Text style={styles.statLabel}>
                                            ({ratingsCount})
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.contentSection}>
                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Mô tả</Text>
                        <Pressable onPress={() => setFullDesc(!fullDesc)}>
                            <Text
                                style={styles.description}
                                numberOfLines={fullDesc ? undefined : 3}
                            >
                                {product.description}
                            </Text>
                            <Text style={styles.readMore}>
                                {fullDesc ? "Thu gọn" : "Xem thêm"}
                            </Text>
                        </Pressable>
                    </View>

                    {/* Size Selection - Only for drinks */}
                    {type === "Drink" && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Kích cỡ</Text>
                            <View style={styles.sizeContainer}>
                                {product.prices.map((priceItem) => (
                                    <Pressable
                                        key={
                                            priceItem.size ||
                                            priceItem.id ||
                                            `${product.id}-${Math.random()}`
                                        }
                                        style={[
                                            styles.sizeButton,
                                            selectedPrice.size ===
                                                priceItem.size &&
                                                styles.sizeButtonActive,
                                        ]}
                                        onPress={() =>
                                            setSelectedPrice(priceItem)
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.sizeText,
                                                selectedPrice.size ===
                                                    priceItem.size &&
                                                    styles.sizeTextActive,
                                            ]}
                                        >
                                            {priceItem.size}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Shop name and direct message */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tên quán</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.ingredients}>
                                {product?.shopName || "Không có"}
                            </Text>
                            {product?.shopId && (
                                <Pressable
                                    onPress={() => {
                                        // Check if user is logged in
                                        if (!user?.isLoggedIn) {
                                            Alert.alert(
                                                "Vui lòng đăng nhập",
                                                "Bạn cần đăng nhập để nhắn tin với quán.",
                                                [
                                                    {
                                                        text: "Đăng nhập",
                                                        onPress: () =>
                                                            router.push(
                                                                "/auth/login"
                                                            ),
                                                    },
                                                    {
                                                        text: "Hủy",
                                                        onPress: () => {},
                                                    },
                                                ]
                                            );
                                            return;
                                        }

                                        // Navigate to chat
                                        router.push({
                                            pathname: "/chat/[shopId]",
                                            params: {
                                                shopId: product.shopId,
                                            },
                                        });
                                    }}
                                >
                                    <Ionicons
                                        name="chatbubble-ellipses-outline"
                                        size={24}
                                        color={theme.primary}
                                    />
                                </Pressable>
                            )}
                        </View>
                    </View>

                    {/* Comments Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Bình luận & Đánh giá ({comments.length})
                        </Text>

                        {/* Input Comment */}
                        <View style={styles.commentInputContainer}>
                            <TextInput
                                placeholder="Viết bình luận..."
                                value={newComment}
                                onChangeText={setNewComment}
                                style={[
                                    styles.commentInput,
                                    { color: theme.onSurface },
                                ]}
                                placeholderTextColor={theme.onSurfaceVariant}
                            />
                            <IconButton
                                icon="send"
                                size={24}
                                iconColor={theme.primary}
                                onPress={handlePostComment}
                                disabled={!newComment.trim()}
                            />
                        </View>

                        {/* Comment List */}
                        {comments.map((item) => (
                            <View key={item.id} style={styles.commentItem}>
                                <View style={styles.commentHeader}>
                                    {item.avatar ? (
                                        <Avatar.Image
                                            size={32}
                                            source={{ uri: item.avatar }}
                                        />
                                    ) : (
                                        <Avatar.Icon
                                            size={32}
                                            icon="account"
                                            style={{
                                                backgroundColor:
                                                    theme.primaryContainer,
                                            }}
                                        />
                                    )}
                                    <View style={styles.commentInfo}>
                                        <Text style={styles.commentUser}>
                                            {item.userName}
                                        </Text>
                                        <View style={styles.ratingRow}>
                                            {new Array(item.rating)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <Ionicons
                                                        key={`${item.id}-star-${i}`}
                                                        name="star"
                                                        size={12}
                                                        color="#FFD700"
                                                    />
                                                ))}
                                            <Text style={styles.commentDate}>
                                                • {item.date}
                                            </Text>
                                        </View>
                                    </View>
                                    {/* Delete button if it's my comment */}
                                    {item.isMyComment && (
                                        <IconButton
                                            icon="trash-can-outline"
                                            size={18}
                                            iconColor={theme.error}
                                            onPress={() =>
                                                handleDeleteComment(item.id)
                                            }
                                        />
                                    )}
                                </View>
                                <Text style={styles.commentContent}>
                                    {item.content}
                                </Text>
                                <View style={styles.commentActions}>
                                    <Pressable
                                        style={styles.actionButton}
                                        onPress={() =>
                                            handleLikeComment(item.id)
                                        }
                                    >
                                        <Ionicons
                                            name={
                                                likedComments.includes(item.id)
                                                    ? "heart"
                                                    : "heart-outline"
                                            }
                                            size={16}
                                            color={
                                                likedComments.includes(item.id)
                                                    ? "#DC3535"
                                                    : theme.onSurfaceVariant
                                            }
                                        />
                                        <Text style={styles.actionText}>
                                            Thích
                                        </Text>
                                    </Pressable>
                                    <Pressable style={styles.actionButton}>
                                        <Text style={styles.actionText}>
                                            Trả lời
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Header Buttons - Positioned Absolutely */}
            <View
                style={[
                    styles.headerButtons,
                    {
                        top:
                            Platform.OS === "android"
                                ? insets.top + 10
                                : insets.top,
                    },
                ]}
            >
                <Pressable
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={theme.onSurface}
                    />
                </Pressable>

                <Pressable
                    style={styles.favoriteButton}
                    onPress={handleToggleFavorite}
                >
                    <Ionicons
                        name={product.favourite ? "heart" : "heart-outline"}
                        size={24}
                        color={product.favourite ? "#DC3535" : "#888"}
                    />
                </Pressable>
            </View>

            {/* Footer - Price and Add to Cart */}
            <View style={styles.footer}>
                <View style={styles.priceSection}>
                    <Text style={styles.priceLabel}>Giá</Text>
                    <Text style={styles.priceValue}>
                        {selectedPrice
                            ? Number.parseInt(
                                  selectedPrice.price
                              ).toLocaleString("vi-VN")
                            : "0"}{" "}
                        đ
                    </Text>
                </View>

                <Pressable style={styles.addButton} onPress={handleAddToCart}>
                    <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
                </Pressable>
            </View>
        </View>
    );
}

// Dynamic styles
const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        scrollContent: {
            paddingBottom: 100,
        },
        imageSection: {
            height: height * 0.5,
        },
        imageContainer: {
            flex: 1,
            position: "relative",
        },
        // Header Buttons
        headerButtons: {
            position: "absolute",
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            zIndex: 100, // Ensure buttons are above everything
        },
        backButton: {
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.8)", // Semi-transparent white
            justifyContent: "center",
            alignItems: "center",
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        favoriteButton: {
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.8)",
            justifyContent: "center",
            alignItems: "center",
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        imageIconContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0", // Placeholder color while loading
        },
        imageIcon: {
            fontSize: 120,
        },
        productImage: {
            width: "100%",
            height: "100%",
        },
        overlayInfo: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor:
                theme.mode === "dark"
                    ? "rgba(0,0,0,0.7)"
                    : "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            padding: 20,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
        },
        basicInfo: {
            gap: 16,
        },
        nameSection: {
            gap: 4,
        },
        productName: {
            fontSize: 24,
            fontWeight: "700",
            color: theme.onBackground,
        },
        specialIngredient: {
            fontSize: 14,
            color: theme.onSurfaceVariant,
        },
        statsRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
        },
        statBox: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            flex: 1,
        },
        statText: {
            fontSize: 15,
            fontWeight: "600",
            color: theme.onSurface,
        },
        statLabel: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
        },
        divider: {
            width: 1,
            height: 30,
            backgroundColor: theme.outline,
        },
        contentSection: {
            padding: 20,
            gap: 24,
        },
        section: {
            gap: 12,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: "700",
            color: theme.onBackground,
        },
        description: {
            fontSize: 15,
            lineHeight: 24,
            color: theme.onSurfaceVariant,
        },
        readMore: {
            fontSize: 14,
            color: theme.primary,
            fontWeight: "600",
            marginTop: 8,
        },
        sizeContainer: {
            flexDirection: "row",
            gap: 12,
        },
        sizeButton: {
            flex: 1,
            paddingVertical: 12,
            borderRadius: 12,
            backgroundColor: theme.surface,
            borderWidth: 2,
            borderColor: theme.outline,
            alignItems: "center",
        },
        sizeButtonActive: {
            borderColor: theme.primary,
            backgroundColor:
                theme.mode === "dark"
                    ? "rgba(209, 120, 66, 0.15)"
                    : "rgba(209, 120, 66, 0.08)",
        },
        sizeText: {
            fontSize: 16,
            fontWeight: "600",
            color: theme.onSurface,
        },
        sizeTextActive: {
            color: theme.primary,
        },
        ingredients: {
            fontSize: 15,
            lineHeight: 22,
            color: theme.onSurfaceVariant,
        },
        footer: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            backgroundColor: theme.surface,
            borderTopWidth: 1,
            borderTopColor: theme.outline,
            gap: 16,
        },
        priceSection: {
            gap: 4,
        },
        priceLabel: {
            fontSize: 13,
            color: theme.onSurfaceVariant,
        },
        priceValue: {
            fontSize: 24,
            fontWeight: "700",
            color: theme.primary,
        },
        addButton: {
            flex: 1,
            backgroundColor: theme.primary,
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: "center",
        },
        addButtonText: {
            fontSize: 16,
            fontWeight: "700",
            color: "#FFFFFF",
        },
        commentInputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.surfaceVariant,
            borderRadius: 24,
            paddingLeft: 16,
            marginBottom: 16,
        },
        commentInput: {
            flex: 1,
            paddingVertical: 12,
            fontSize: 14,
        },
        commentItem: {
            marginBottom: 16,
            paddingBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: theme.outlineVariant,
        },
        commentHeader: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
        },
        commentInfo: {
            marginLeft: 12,
            flex: 1,
        },
        commentUser: {
            fontWeight: "700",
            fontSize: 14,
            color: theme.onSurface,
        },
        ratingRow: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 2,
        },
        commentDate: {
            fontSize: 12,
            color: theme.onSurfaceVariant,
            marginLeft: 8,
        },
        commentContent: {
            fontSize: 14,
            lineHeight: 20,
            color: theme.onSurface,
            marginBottom: 8,
        },
        commentActions: {
            flexDirection: "row",
            gap: 16,
        },
        actionButton: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
        },
        actionText: {
            fontSize: 12,
            color: theme.onSurfaceVariant,
        },
    });
