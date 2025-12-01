// Screen: Messages - Tin nhắn
/*
 * Chức năng:
 * Hiển thị danh sách tin nhắn với các quán ăn (thực)
 * Dữ liệu từ chatStore
 */

import React, { useMemo } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { Text, Avatar, List, Divider } from "react-native-paper";
import { useRouter } from "expo-router";
import ScreenWrapper from "../../src/components/ScreenWrapper";
import { useTheme } from "../../src/context/ThemeContext";
import { useChatStore } from "../../src/store/chatStore";
import { shops } from "../../src/data/shops";

export default function MessagesScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const styles = createStyles(theme);

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
                const shop =
                    shops.find((s) => s.id === shopId) || {
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

    if (!conversations || conversations.length === 0) {
        return (
            <ScreenWrapper style={styles.container}>
                <StatusBar
                    backgroundColor={theme.background}
                    barStyle={
                        theme.mode === "dark"
                            ? "light-content"
                            : "dark-content"
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
                                left={(props) => (
                                    <Avatar.Icon
                                        size={48}
                                        icon="store"
                                        style={{ backgroundColor: theme.surfaceVariant }}
                                    />
                                )}
                                right={(props) => (
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
