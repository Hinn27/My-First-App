import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import {
    Text,
    TextInput,
    IconButton,
    Button,
    Avatar,
} from "react-native-paper";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useChatStore } from "../../src/store/chatStore";
import { shops } from "../../src/data/shops";
import { useTheme } from "../../src/context/ThemeContext";

export default function ChatScreen() {
    const { shopId } = useLocalSearchParams();
    const router = useRouter();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    // Get all messages from store
    const allMessages = useChatStore((s) => s.messages);
    const addMessage = useChatStore((s) => s.addMessage);
    const markAsRead = useChatStore((s) => s.markAsRead);

    // Derive current conversation messages - memoize to prevent infinite loop
    const messages = useMemo(
        () => allMessages?.[shopId] || [],
        [allMessages, shopId]
    );

    const [text, setText] = useState("");
    const listRef = useRef(null);

    const shop = useMemo(
        () =>
            shops.find((s) => s.id === shopId) || {
                id: shopId,
                displayName: "Quán",
            },
        [shopId]
    );

    // Initialize conversation with greeting when first opened
    const hasInitialized = useRef(false);

    // Mark as read whenever screen is focused
    useFocusEffect(
        useCallback(() => {
            markAsRead(shopId);
        }, [shopId, markAsRead])
    );

    useEffect(() => {
        // Only add greeting on initial open, not every render
        if (!hasInitialized.current && shop?.greeting) {
            hasInitialized.current = true;

            // Add shop greeting
            addMessage(shopId, {
                id: `greeting-${shopId}-${Date.now()}`,
                text: shop.greeting,
                from: shopId,
                timestamp: Date.now(),
            });
        }
    }, [shopId, shop?.greeting, addMessage]);

    useEffect(() => {
        // scroll to top (newest-first list) when messages change
        setTimeout(() => {
            listRef.current?.scrollToOffset?.({ offset: 0, animated: true });
        }, 50);
    }, [messages]);

    const send = () => {
        const trimmed = (text || "").trim();
        if (!trimmed) return;
        const msg = {
            id: `msg-${Date.now()}`,
            text: trimmed,
            from: "me",
            timestamp: Date.now(),
        };
        addMessage(shopId, msg, { markRead: true });
        setText("");
    };

    const renderItem = ({ item }) => {
        const isMe = item.from === "me";
        return (
            <View
                style={[
                    styles.msgRow,
                    isMe ? styles.msgRowMe : styles.msgRowShop,
                ]}
            >
                {!isMe && (
                    <Avatar.Text
                        size={36}
                        label={shop.displayName
                            .split(" ")
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")
                            .toUpperCase()}
                        style={{ backgroundColor: theme.surfaceVariant }}
                    />
                )}
                <View
                    style={[
                        styles.bubble,
                        isMe ? styles.bubbleMe : styles.bubbleShop,
                    ]}
                >
                    <Text style={{ color: isMe ? "#fff" : theme.onSurface }}>
                        {item.text}
                    </Text>
                    <Text
                        variant="labelSmall"
                        style={{ color: theme.onSurfaceVariant, marginTop: 6 }}
                    >
                        {new Date(item.timestamp).toLocaleString()}
                    </Text>
                </View>
                {isMe && <View style={{ width: 36 }} />}
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={90}
        >
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                {/* Shop Name Subheader */}
                <View style={styles.subheader}>
                    <Avatar.Text
                        size={32}
                        label={shop.displayName
                            .split(" ")
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")
                            .toUpperCase()}
                        style={{ backgroundColor: theme.primaryContainer }}
                    />
                    <Text
                        variant="titleMedium"
                        style={{
                            fontWeight: "600",
                            marginLeft: 12,
                            color: theme.onSurface,
                        }}
                    >
                        {shop.displayName}
                    </Text>
                </View>

                {!messages || messages.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text variant="headlineSmall">
                            Lịch sử tin nhắn trống
                        </Text>
                        <Text
                            variant="bodyMedium"
                            style={{
                                color: theme.onSurfaceVariant,
                                marginTop: 8,
                            }}
                        >
                            Bắt đầu trò chuyện với quán bằng cách gửi tin nhắn.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        ref={listRef}
                        data={messages}
                        keyExtractor={(i) => i.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ padding: 16 }}
                        inverted // newest-first (we store newest-first in chatStore)
                    />
                )}

                <View style={styles.composerRow}>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Nhập tin nhắn..."
                        mode="outlined"
                        style={styles.input}
                    />
                    <Button
                        mode="contained"
                        onPress={send}
                        style={{ marginLeft: 8 }}
                    >
                        Gửi
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: { flex: 1 },
        subheader: {
            flexDirection: "row",
            alignItems: "center",
            padding: 12,
            backgroundColor: theme.surface,
            borderBottomWidth: 1,
            borderBottomColor: theme.outlineVariant,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        composerRow: {
            flexDirection: "row",
            padding: 12,
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: theme.surfaceVariant,
        },
        input: { flex: 1, backgroundColor: theme.surface },
        msgRow: {
            flexDirection: "row",
            marginBottom: 12,
            alignItems: "flex-end",
        },
        msgRowMe: { justifyContent: "flex-end" },
        msgRowShop: { justifyContent: "flex-start" },
        bubble: { maxWidth: "78%", padding: 10, borderRadius: 12 },
        bubbleMe: { backgroundColor: theme.primary, alignItems: "flex-end" },
        bubbleShop: {
            backgroundColor: theme.surface,
            alignItems: "flex-start",
        },
    });
