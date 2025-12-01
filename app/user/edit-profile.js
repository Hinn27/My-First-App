// Screen: Edit Profile - Chỉnh sửa thông tin cá nhân
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import {
    Text,
    TextInput,
    Button,
    Card,
    SegmentedButtons,
    Surface,
    IconButton,
} from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../src/context/ThemeContext";
import { useUserStore } from "../../src/store/userStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import ScreenWrapper from "../../src/components/ScreenWrapper";

export default function EditProfileScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const styles = createStyles(theme);

    // Get user data from store
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);

    // Form state
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [gender, setGender] = useState(user?.gender || "other");
    const [birthDate, setBirthDate] = useState(
        user?.birthDate ? new Date(user.birthDate) : null
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check if birthdate is already set (can only set once)
    const hasBirthDate = !!user?.birthDate;

    const handleSave = async () => {
        // Validation
        if (!name.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập tên của bạn");
            return;
        }

        if (!email.trim()) {
            Alert.alert("Lỗi", "Vui lòng nhập email");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Lỗi", "Email không hợp lệ");
            return;
        }

        // Phone validation (optional but if provided must be valid)
        if (phone?.trim()) {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone.trim())) {
                Alert.alert("Lỗi", "Số điện thoại phải có 10 chữ số");
                return;
            }
        }

        setLoading(true);

        try {
            const updatedUser = {
                ...user,
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                gender: gender,
                birthDate: birthDate
                    ? birthDate.toISOString()
                    : user?.birthDate,
            };

            // Save to AsyncStorage
            await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

            // Update Zustand store
            setUser(updatedUser);

            Alert.alert("Thành công", "Cập nhật thông tin thành công", [
                {
                    text: "OK",
                    onPress: () => router.back(),
                },
            ]);
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Lỗi", "Không thể cập nhật thông tin");
        } finally {
            setLoading(false);
        }
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === "ios");
        if (selectedDate) {
            setBirthDate(selectedDate);
        }
    };

    const formatDate = (date) => {
        if (!date) return "Chưa thiết lập";
        return new Date(date).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={() => router.back()}
                />
                <Text variant="titleLarge" style={styles.headerTitle}>
                    Chỉnh sửa thông tin
                </Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.container}>
                <Card style={styles.card} mode="elevated">
                    <Card.Content>
                        {/* Name */}
                        <Text variant="labelLarge" style={styles.label}>
                            Họ và tên{" "}
                            <Text style={{ color: theme.error }}>*</Text>
                        </Text>
                        <TextInput
                            mode="outlined"
                            value={name}
                            onChangeText={setName}
                            placeholder="Nhập họ và tên"
                            style={styles.input}
                            left={<TextInput.Icon icon="account-outline" />}
                        />

                        {/* Email */}
                        <Text variant="labelLarge" style={styles.label}>
                            Email
                        </Text>
                        <TextInput
                            mode="outlined"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="email@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                            left={<TextInput.Icon icon="email-outline" />}
                        />

                        {/* Phone */}
                        <Text variant="labelLarge" style={styles.label}>
                            Số điện thoại{" "}
                            <Text style={{ color: theme.error }}>*</Text>
                        </Text>
                        <TextInput
                            mode="outlined"
                            value={phone}
                            onChangeText={setPhone}
                            placeholder=""
                            keyboardType="phone-pad"
                            maxLength={10}
                            style={styles.input}
                            left={<TextInput.Icon icon="phone-outline" />}
                        />

                        {/* Gender */}
                        <Text variant="labelLarge" style={styles.label}>
                            Giới tính
                        </Text>
                        <SegmentedButtons
                            value={gender}
                            onValueChange={setGender}
                            multiSelect={false}
                            buttons={[
                                {
                                    value: "male",
                                    label: "Nam",
                                    icon: "gender-male",
                                },
                                {
                                    value: "female",
                                    label: "Nữ",
                                    icon: "gender-female",
                                },
                                {
                                    value: "other",
                                    label: "Khác",
                                    icon: "gender-male-female",
                                },
                            ]}
                            style={styles.segmentedButtons}
                        />

                        {/* Birth Date */}
                        <Text variant="labelLarge" style={styles.label}>
                            Ngày sinh
                        </Text>

                        {hasBirthDate && (
                            <Surface style={styles.warningBox} elevation={0}>
                                <IconButton
                                    icon="alert-circle-outline"
                                    size={20}
                                    iconColor={theme.error}
                                    style={{ margin: 0 }}
                                />
                                <Text
                                    variant="bodySmall"
                                    style={{
                                        color: theme.error,
                                        flex: 1,
                                        marginLeft: 4,
                                    }}
                                >
                                    Ngày sinh chỉ được thêm duy nhất 1 lần
                                </Text>
                            </Surface>
                        )}

                        <Surface
                            style={[
                                styles.datePickerContainer,
                                hasBirthDate && styles.datePickerDisabled,
                            ]}
                            elevation={0}
                        >
                            <TextInput
                                mode="outlined"
                                value={formatDate(birthDate)}
                                editable={false}
                                style={[
                                    styles.input,
                                    { flex: 1 },
                                    hasBirthDate && { opacity: 0.6 },
                                ]}
                                left={
                                    <TextInput.Icon icon="calendar-outline" />
                                }
                            />
                            <IconButton
                                icon="calendar"
                                size={24}
                                mode="contained"
                                onPress={() =>
                                    !hasBirthDate && setShowDatePicker(true)
                                }
                                disabled={hasBirthDate}
                                style={styles.datePickerButton}
                            />
                        </Surface>

                        {showDatePicker && (
                            <DateTimePicker
                                value={birthDate || new Date()}
                                mode="date"
                                display={
                                    Platform.OS === "ios"
                                        ? "spinner"
                                        : "default"
                                }
                                onChange={onDateChange}
                                maximumDate={new Date()}
                                minimumDate={new Date(1900, 0, 1)}
                            />
                        )}
                    </Card.Content>
                </Card>

                {/* Save Button */}
                <Button
                    mode="contained"
                    onPress={handleSave}
                    loading={loading}
                    disabled={loading}
                    style={styles.saveButton}
                    icon="content-save"
                >
                    Lưu thay đổi
                </Button>

                <View style={{ height: 40 }} />
            </ScrollView>
        </ScreenWrapper>
    );
}

const createStyles = (theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 4,
            paddingVertical: 8,
            backgroundColor: theme.surface,
            borderBottomWidth: 1,
            borderBottomColor: theme.outlineVariant,
            minHeight: 56,
        },
        headerTitle: {
            fontWeight: "600",
            color: theme.onSurface,
            lineHeight: 24,
            textAlignVertical: "center",
        },
        card: {
            margin: 16,
            backgroundColor: theme.surface,
        },
        label: {
            marginTop: 16,
            marginBottom: 8,
            color: theme.onSurface,
            fontWeight: "600",
        },
        input: {
            backgroundColor: theme.surface,
        },
        segmentedButtons: {
            marginTop: 8,
        },
        datePickerContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        },
        datePickerDisabled: {
            opacity: 0.6,
        },
        datePickerButton: {
            marginTop: 0,
        },
        warningBox: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.errorContainer,
            borderRadius: 8,
            padding: 8,
            marginBottom: 8,
        },
        saveButton: {
            marginHorizontal: 16,
            marginTop: 24,
            paddingVertical: 6,
        },
    });
