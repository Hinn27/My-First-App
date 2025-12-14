import AsyncStorage from "@react-native-async-storage/async-storage";
import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            address: null, // Thêm state địa chỉ

            setUser: (user) => set({ user }),

            // Set Address
            setAddress: (address) =>
                set(
                    produce((state) => {
                        state.address = address;
                    })
                ),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
