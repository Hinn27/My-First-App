import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create(
    persist(
        (set, get) => ({
            // State
            user: null,

            // Actions - Set User (Login/Register)
            setUser: (userData) =>
                set(() => ({
                    user: userData,
                })),

            // Actions - Update User (partial update)
            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),

            // Actions - Logout
            logout: () =>
                set(() => ({
                    user: null,
                })),

            // Actions - Set Seller Status
            setSellerStatus: (status, sellerInfo = null) =>
                set((state) => ({
                    user: state.user
                        ? {
                              ...state.user,
                              isSeller: true,
                              sellerStatus: status, // 'pending' | 'approved' | 'rejected'
                              sellerInfo: sellerInfo || state.user.sellerInfo,
                          }
                        : null,
                })),
        }),
        {
            name: 'user-storage', // unique name for AsyncStorage key
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
