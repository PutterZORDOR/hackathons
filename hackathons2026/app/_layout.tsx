import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 🔥 ปิด header ทั้งหมด
      }}
    />
  );
}

