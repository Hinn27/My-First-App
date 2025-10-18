// Screen: Explore tab
/* Vai trò:
 * Screen Explore (tab thứ 2)
 * Route: /explore
 */

import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DATA = [
    { id: "1", title: "React Native", icon: "logo-react" },
    { id: "2", title: "JavaScript", icon: "logo-javascript" },
    { id: "3", title: "Expo", icon: "rocket-outline" },
    { id: "4", title: "Mobile Dev", icon: "phone-portrait-outline" },
];

export default function ExploreScreen() {
    const renderItem = ({ item }) => (
        <Pressable style={styles.card}>
            <Ionicons name={item.icon} size={32} color="#0a84ff" />
            <Text style={styles.cardTitle}>{item.title}</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.subtitle}>Tìm kiếm và khám phá</Text>

            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f8fb",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 24,
    },
    list: {
        gap: 12,
    },
    card: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        margin: 6,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 8,
    },
});
