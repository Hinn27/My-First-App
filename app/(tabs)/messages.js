// Screen: Messages - Tin nhắn
/* Chức năng:
 * Hiển thị danh sách tin nhắn với các quán ăn (thực)
 * Dữ liệu từ chatStore
 */

import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
    FlatList,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Avatar, Button, Divider, List, Text } from "react-native-paper";
import ScreenWrapper from "../../src/components/ScreenWrapper";
import { useTheme } from "../../src/context/ThemeContext";
import { shops } from "../../src/data/shops";
import { useChatStore } from "../../src/store/chatStore";
import { useUserStore } from "../../src/store/userStore";

export default function MessagesScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const styles = createStyles(theme);

    // Check if user is logged in
    const user = useUserStore((state) => state.user);
    const isLoggedIn = user?.isLoggedIn || false;

    // Get real chat data from store
    const messages = useChatStore((state) => state.messages);
    const unread = useChatStore((state) => state.unread || {});

    // Build conversations list from actual messages
    const conversations = useMemo(() => {
        if (!messages || Object.keys(messages).length === 0) {
            return [];
        }

        return Object.keys(messages)
            .map((shopId) => {
                const msgs = messages[shopId] || [];
                const lastMsg = msgs.length > 0 ? msgs[0] : null;
                const shop = shops.find((s) => s.id === shopId) || {
                    id: shopId,
                    displayName: shopId,
                };

                return {
                    shopId,
                    name: shop.displayName,
                    message: lastMsg ? lastMsg.text : "Chưa có tin nhắn",
                    time: lastMsg
                        ? new Date(lastMsg.timestamp).toLocaleString()
                        : "",
                    unread: unread[shopId] || 0,
                };
            })
            .sort((a, b) => {
                const aTime = messages[a.shopId]?.[0]?.timestamp || 0;
                const bTime = messages[b.shopId]?.[0]?.timestamp || 0;
                return bTime - aTime;
            });
    }, [messages, unread]);

    const handlePress = (item) => {
        // Navigate to chat screen with shop ID
        router.push({
            pathname: "/chat/[shopId]",
            params: { shopId: item.shopId },
        });
    };

    if (!isLoggedIn) {
        return (
            <ScreenWrapper style={styles.container}>
                <StatusBar
                    backgroundColor={theme.background}
                    barStyle={
                        theme.mode === "dark" ? "light-content" : "dark-content"
                    }
                />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                    }}
                >
                    <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
                        Đăng nhập để nhắn tin
                    </Text>
                    <Text
                        variant="bodyMedium"
                        style={{
                            color: theme.onSurfaceVariant,
                            marginBottom: 24,
                            textAlign: "center",
                        }}
                    >
                        Bạn cần đăng nhập tài khoản để có thể nhắn tin với các
                        quán ăn.
                    </Text>
                    <Button
                        mode="contained"
                        onPress={() => router.push("/auth/login")}
                    >
                        Đăng nhập
                    </Button>
                </View>
            </ScreenWrapper>
        );
    }

    if (!conversations || conversations.length === 0) {
        return (
            <ScreenWrapper style={styles.container}>
                <StatusBar
                    backgroundColor={theme.background}
                    barStyle={
                        theme.mode === "dark" ? "light-content" : "dark-content"
                    }
                />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                    }}
                >
                    <Text variant="headlineSmall" style={{ marginBottom: 8 }}>
                        Lịch sử tin nhắn trống
                    </Text>
                    <Text
                        variant="bodyMedium"
                        style={{ color: theme.onSurfaceVariant }}
                    >
                        Bạn chưa có cuộc trò chuyện nào. Ấn icon tin nhắn từ sản
                        phẩm để bắt đầu.
                    </Text>
                </View>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
            />

            <FlatList
                data={conversations}
                keyExtractor={(item) => item.shopId}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => handlePress(item)}>
                            <List.Item
                                title={item.name}
                                description={item.message}
                                left={(_props) => (
                                    <Avatar.Icon
                                        size={48}
                                        icon="store"
                                        style={{
                                            backgroundColor:
                                                theme.surfaceVariant,
                                        }}
                                    />
                                )}
                                right={(_props) => (
                                    <View style={styles.metaContainer}>
                                        <Text
                                            variant="bodySmall"
                                            style={styles.time}
                                        >
                                            {item.time}
                                        </Text>
                                        {item.unread > 0 && (
                                            <View style={styles.badge}>
                                                <Text style={styles.badgeText}>
                                                    {item.unread > 99
                                                        ? "99+"
                                                        : item.unread}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                )}
                                titleStyle={
                                    item.unread > 0
                                        ? styles.unreadTitle
                                        : styles.readTitle
                                }
                                descriptionStyle={
                                    item.unread > 0
                                        ? styles.unreadDesc
                                        : styles.readDesc
                                }
                            />
                        </TouchableOpacity>
                        <Divider />
                    </View>
                )}
            />
        </ScreenWrapper>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        metaContainer: {
            alignItems: "flex-end",
            justifyContent: "center",
        },
        time: {
            color: theme.onSurfaceVariant,
            marginBottom: 4,
        },
        badge: {
            backgroundColor: theme.primary,
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        badgeText: {
            color: "white",
            fontSize: 10,
            fontWeight: "bold",
        },
        unreadTitle: {
            fontWeight: "bold",
            color: theme.onSurface,
        },
        readTitle: {
            color: theme.onSurface,
        },
        unreadDesc: {
            color: theme.onSurface,
            fontWeight: "500",
        },
        readDesc: {
            color: theme.onSurfaceVariant,
        },
    });
