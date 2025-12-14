import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useChatStore = create(
    persist(
        (set, get) => ({
            // messages: { shopId: [msg,..] }
            messages: {},
            unread: {},

            addMessage: (shopId, message, options) =>
                set((state) => {
                    const msgs = state.messages[shopId]
                        ? [...state.messages[shopId]]
                        : [];
                    msgs.unshift(message);
                    const newMessages = { ...state.messages, [shopId]: msgs };
                    const newUnread = { ...state.unread };
                    const markRead = options?.markRead;
                    // If message is from shop (not 'me') and not marked read, increment unread
                    if (message.from && message.from !== "me" && !markRead) {
                        newUnread[shopId] = (newUnread[shopId] || 0) + 1;
                    }
                    return { messages: newMessages, unread: newUnread };
                }),

            markAsRead: (shopId) =>
                set((state) => {
                    const newUnread = { ...state.unread };
                    if (shopId in newUnread) {
                        delete newUnread[shopId];
                    }
                    return { unread: newUnread };
                }),

            getTotalUnread: () => {
                const state = get();
                return Object.values(state.unread || {}).reduce(
                    (s, v) => s + (v || 0),
                    0
                );
            },

            // Clear all messages and unread
            clearChat: () =>
                set(() => {
                    return { messages: {}, unread: {} };
                }),

            // Getter for unread count that can be used in selectors
            getUnread: () => {
                const state = get();
                return state.unread || {};
            },
        }),
        {
            name: "chat-storage",
            storage: createJSONStorage(() => AsyncStorage),
            version: 1,
        }
    )
);
