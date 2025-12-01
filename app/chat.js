import React, { useMemo } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Avatar, Badge, List } from "react-native-paper";
import { useRouter } from "expo-router";
import { useChatStore } from "../src/store/chatStore";
import { shops } from "../src/data/shops";
import { useTheme } from "../src/context/ThemeContext";

export default function ChatListScreen() {
    const router = useRouter();
    const { theme } = useTheme();
    const messages = useChatStore((s) => s.messages);
    const unread = useChatStore((s) => s.unread);

    // Build conversation list from messages keys
    const conversations = useMemo(() => {
        if (!messages) return [];
        return Object.keys(messages)
            .map((shopId) => {
                const msgs = messages[shopId] || [];
                const last = msgs.length > 0 ? msgs[0] : null; // msgs stored newest-first
                const shop = shops.find((s) => s.id === shopId) || {
                    id: shopId,
                    displayName: shopId,
                };
                return {
                    shopId,
                    shop,
                    lastMessage: last,
                    unreadCount: (unread && unread[shopId]) || 0,
                };
            })
            .sort((a, b) => {
                const ta = a.lastMessage ? a.lastMessage.timestamp || 0 : 0;
                const tb = b.lastMessage ? b.lastMessage.timestamp || 0 : 0;
                return tb - ta;
            });
    }, [messages, unread]);

    if (!conversations || conversations.length === 0) {
        return (
            <View
                style={[
                    styles.emptyContainer,
                    { backgroundColor: theme.background },
                ]}
            >
                <Text variant="headlineSmall" style={{ marginBottom: 8 }}>
                    Lịch sử chat đang trống
                </Text>
                <Text
                    variant="bodyMedium"
                    style={{ color: theme.onSurfaceVariant }}
                >
                    Bạn chưa có cuộc trò chuyện nào. Nhấn vào nút nhắn tin từ
                    quán để bắt đầu.
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <FlatList
                data={conversations}
                keyExtractor={(item) => item.shopId}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: `/chat/${item.shopId}`,
                                params: { shopId: item.shopId },
                            })
                        }
                    >
                        <List.Item
                            title={item.shop.displayName}
                            description={
                                item.lastMessage
                                    ? item.lastMessage.text
                                    : "Chưa có tin nhắn"
                            }
                            left={() => (
                                <Avatar.Icon
                                    size={40}
                                    icon="store"
                                    style={{
                                        backgroundColor: theme.surfaceVariant,
                                    }}
                                />
                            )}
                            right={() => (
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "flex-end",
                                    }}
                                >
                                    {item.unreadCount > 0 && (
                                        <Badge
                                            size={20}
                                            style={{ marginBottom: 6 }}
                                        >
                                            {item.unreadCount > 99
                                                ? "99+"
                                                : String(item.unreadCount)}
                                        </Badge>
                                    )}
                                    <Text
                                        variant="labelSmall"
                                        style={{
                                            color: theme.onSurfaceVariant,
                                        }}
                                    >
                                        {item.lastMessage
                                            ? new Date(
                                                  item.lastMessage.timestamp
                                              ).toLocaleString()
                                            : ""}
                                    </Text>
                                </View>
                            )}
                        />
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View
                        style={{
                            height: 1,
                            backgroundColor: theme.surfaceVariant,
                            marginHorizontal: 16,
                        }}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});
