// Screen: Messages - Tin nhắn
/*
 * Chức năng:
 * Hiển thị danh sách tin nhắn với các quán ăn
 * Mock data cho demo
 */

import React from "react";
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

const MOCK_MESSAGES = [
    {
        id: "1",
        name: "Phở Gia Truyền",
        message: "Cảm ơn bạn đã ủng hộ quán!",
        time: "10:30 AM",
        avatar: "https://i.pravatar.cc/150?u=1",
        unread: 2,
    },
    {
        id: "2",
        name: "Cơm Tấm Sài Gòn",
        message: "Đơn hàng của bạn đang được chuẩn bị.",
        time: "Yesterday",
        avatar: "https://i.pravatar.cc/150?u=2",
        unread: 0,
    },
    {
        id: "3",
        name: "Bún Bò Huế",
        message: "Quán hôm nay nghỉ sớm nha bạn.",
        time: "Mon",
        avatar: "https://i.pravatar.cc/150?u=3",
        unread: 0,
    },
];

export default function MessagesScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const styles = createStyles(theme);

    const handlePress = (item) => {
        // Navigate to chat screen with shop ID
        router.push({
            pathname: "/chat/[shopId]",
            params: { shopId: item.id },
        });
    };

    return (
        <ScreenWrapper style={styles.container}>
            <StatusBar
                backgroundColor={theme.background}
                barStyle={
                    theme.mode === "dark" ? "light-content" : "dark-content"
                }
            />

            <FlatList
                data={MOCK_MESSAGES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => handlePress(item)}>
                            <List.Item
                                title={item.name}
                                description={item.message}
                                left={(props) => (
                                    <Avatar.Image
                                        size={48}
                                        source={{ uri: item.avatar }}
                                        style={styles.avatar}
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
                                                    {item.unread}
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
        avatar: {
            marginRight: 10,
            marginVertical: 8,
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
