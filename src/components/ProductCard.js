// Component: Product Card cho Home screen
import React, { useEffect } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { Text, Badge } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    Easing,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { wp } from "../utils/Responsive"; // Sử dụng wp để responsive
import PropTypes from "prop-types";
import { useRouter } from "expo-router";
import { shops } from "../data/shops";
import { useChatStore } from "../store/chatStore";

export default function ProductCard(props) {
    const {
        id,
        name,
        special_ingredient: _special_ingredient,
        imageIcon,
        imagelink_square,
        average_rating,
        prices,
        price,
        image,
        onPress,
        onAddToCart,
        onFavoritePress,
        favourite,
        theme,
        shopId,
    } = props;

    const router = useRouter();
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    // include shared values in dependency array to satisfy hooks linter
    useEffect(() => {
        opacity.value = withTiming(1, {
            duration: 400,
            easing: Easing.out(Easing.ease),
        });
        translateY.value = withTiming(0, {
            duration: 400,
            easing: Easing.out(Easing.ease),
        });
    }, [opacity, translateY]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateY: translateY.value }],
        opacity: opacity.value,
    }));

    const handlePressIn = () => {
        scale.value = withSpring(0.95, {
            damping: 15,
            stiffness: 300,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 15,
            stiffness: 300,
        });
    };

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    };

    // Determine display data
    const displayImage = imagelink_square || image;
    let displayPrice = 0;
    if (prices && prices.length > 0) {
        displayPrice = prices[0].price;
    } else if (price !== undefined) {
        displayPrice = price;
    }

    // choose shop from shopId or fall back to deterministic lookup
    const shop = shopId
        ? shops.find((s) => s.id === shopId)
        : (() => {
              const idx =
                  Array.from(String(name || id || "")).reduce(
                      (a, ch) => a + (ch.codePointAt(0) || 0),
                      0
                  ) % shops.length;
              return shops[idx];
          })();
    const unreadCount = useChatStore(
        (s) => (s.unread && s.unread[shop?.id]) || 0
    );

    return (
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
            <Pressable
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.pressable}
            >
                <LinearGradient
                    colors={
                        theme?.mode === "dark"
                            ? ["#252A32", "#0C0F14"]
                            : ["#FFFFFF", "#F7F8FB"]
                    }
                    style={styles.card}
                >
                    {/* Favorite Button */}
                    <Pressable
                        style={styles.favoriteButton}
                        onPress={onFavoritePress}
                    >
                        <Ionicons
                            name={favourite ? "heart" : "heart-outline"}
                            size={20}
                            color={favourite ? "#DC3535" : "#888"}
                        />
                    </Pressable>

                    {/* Image Icon */}
                    <View style={styles.imageContainer}>
                        {displayImage ? (
                            <Image
                                // Support both static require() module and URI string
                                source={
                                    typeof displayImage === "string"
                                        ? { uri: displayImage }
                                        : displayImage
                                }
                                style={styles.productImage}
                            />
                        ) : (
                            <Text style={styles.imageIcon}>
                                {imageIcon || "☕"}
                            </Text>
                        )}
                    </View>

                    {/* Product Info */}
                    <View style={styles.infoContainer}>
                        <Text
                            style={[
                                styles.name,
                                { color: theme?.onSurface || "#1c1c1e" },
                            ]}
                            numberOfLines={2}
                        >
                            {name}
                        </Text>
                        <Text
                            style={[
                                styles.ingredient,
                                { color: theme?.onSurfaceVariant || "#8e8e93" },
                            ]}
                            numberOfLines={1}
                        >
                            {shop ? shop.displayName : ""}
                        </Text>

                        {/* Rating and Price */}
                        <View style={styles.footer}>
                            <View style={styles.ratingContainer}>
                                <Ionicons
                                    name="star"
                                    size={14}
                                    color="#FFD700"
                                />
                                <Text
                                    style={[
                                        styles.rating,
                                        {
                                            color:
                                                theme?.onSurface || "#1c1c1e",
                                        },
                                    ]}
                                >
                                    {average_rating}
                                </Text>
                            </View>

                            <View style={styles.priceRow}>
                                <Text
                                    style={[
                                        styles.price,
                                        { color: theme?.primary || "#D17842" },
                                    ]}
                                >
                                    {Number.parseInt(
                                        displayPrice || 0
                                    ).toLocaleString("vi-VN")}
                                    đ
                                </Text>
                                <Pressable
                                    style={[
                                        styles.addButton,
                                        {
                                            backgroundColor:
                                                theme?.primary || "#D17842",
                                        },
                                    ]}
                                    onPress={onAddToCart}
                                >
                                    <Ionicons
                                        name="add"
                                        size={20}
                                        color="#FFF"
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={styles.shopRow}>
                        <Text
                            style={[
                                styles.shopName,
                                { color: theme?.onSurface || "#1c1c1e" },
                            ]}
                            numberOfLines={1}
                        >
                            {shop ? shop.displayName : "Quán"}
                        </Text>
                        {shop && (
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: `/chat/${shop.id}`,
                                        params: { shopId: shop.id },
                                    })
                                }
                                style={styles.shopChatButton}
                            >
                                <Ionicons
                                    name="chatbubble-ellipses-outline"
                                    size={18}
                                    color={theme?.primary || "#1677ff"}
                                />
                                {unreadCount > 0 && (
                                    <Badge style={styles.chatBadge} size={12}>
                                        {unreadCount > 99
                                            ? "99+"
                                            : String(unreadCount)}
                                    </Badge>
                                )}
                            </Pressable>
                        )}
                    </View>
                </LinearGradient>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: wp(44), // Responsive width ~44% màn hình
        marginBottom: 16,
        // Đảm bảo card không quá nhỏ hoặc quá to trên các màn hình dị biệt
        minWidth: 150,
        maxWidth: 220,
    },
    pressable: {
        width: "100%",
    },
    card: {
        borderRadius: 24,
        padding: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    favoriteButton: {
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderRadius: 20,
        padding: 6,
    },
    imageContainer: {
        height: wp(30), // Chiều cao ảnh cũng responsive theo chiều rộng
        maxHeight: 140, // Giới hạn chiều cao tối đa
        borderRadius: 20,
        backgroundColor: "rgba(135, 206, 235, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        overflow: "hidden",
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    imageIcon: {
        fontSize: wp(16), // Icon size responsive
    },
    infoContainer: {
        gap: 4,
    },
    name: {
        fontSize: 15, // Có thể dùng wp(3.8) nếu muốn font chữ cũng co giãn, nhưng để 15pt cho dễ đọc
        fontWeight: "700",
        lineHeight: 20,
        height: 40, // Cố định chiều cao cho 2 dòng text để các card bằng nhau
    },
    ingredient: {
        fontSize: 11,
        marginBottom: 4,
        height: 16, // Cố định chiều cao 1 dòng
    },
    footer: {
        marginTop: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 8,
    },
    rating: {
        fontSize: 13,
        fontWeight: "600",
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    price: {
        fontSize: 16,
        fontWeight: "700",
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    shopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
    },
    shopName: {
        fontSize: 13,
        fontWeight: "500",
        maxWidth: "80%",
    },
    shopChatButton: {
        padding: 4,
        borderRadius: 16,
        backgroundColor: "rgba(22, 119, 255, 0.1)",
    },
    chatBadge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "#DC3535",
        color: "#fff",
    },
});

ProductCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    special_ingredient: PropTypes.string,
    imageIcon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    imagelink_square: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    average_rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    prices: PropTypes.arrayOf(
        PropTypes.shape({
            size: PropTypes.string,
            price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            currency: PropTypes.string,
        })
    ),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    shopId: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func,
    onFavoritePress: PropTypes.func,
    favourite: PropTypes.bool,
    theme: PropTypes.shape({
        mode: PropTypes.string,
        onSurface: PropTypes.string,
        onSurfaceVariant: PropTypes.string,
        primary: PropTypes.string,
        background: PropTypes.string,
        surface: PropTypes.string,
        surfaceVariant: PropTypes.string,
    }),
};

ProductCard.defaultProps = {
    prices: [],
    favourite: false,
    theme: {},
};
