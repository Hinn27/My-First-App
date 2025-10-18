// Root Layout
/*
* Vai trò:
	* Layout chính của toàn bộ app
    * Wrap tất cả screens
    * Define navigation structure (Stack, Tabs, etc.)
*/

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* (tabs) folder sẽ render như 1 screen */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      {/* modal.js render như modal */}
      <Stack.Screen
        name="modal"
        options={{ presentation: 'modal' }}
      />
    </Stack>
  );
}