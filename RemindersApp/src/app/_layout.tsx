import { Stack, router } from "expo-router";
import { Text } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="createUpdateReminder"
          options={{
            presentation: 'modal',
            headerTitle: () => <Text style={{marginLeft: 110, fontSize: 18}} >New Reminder</Text>,
            headerLeft: () => <Text style={{ color: '#0E7AFE' }} onPress={() => router.back()}>Cancel</Text>
          }}
        />
      </Stack>
    </QueryClientProvider>
  )
}