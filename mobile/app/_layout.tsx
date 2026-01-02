import { SessionProvider, useSession } from "../components/ctx";
import "../global.css";
import { Stack } from "expo-router";
import { SplashScreenController } from "@/components/splash";

export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen options={{ headerShown: false }} name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen options={{ headerShown: false }} name="sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
