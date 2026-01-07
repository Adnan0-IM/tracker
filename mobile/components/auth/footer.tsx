import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function SignInFooter({
  text,
  actionText,
}: {
  text: string;
  actionText: string;
}) {
  return (
    <View className="flex flex-row gap-2">
      <Text className="text-text-muted-light dark:text-text-muted font-display">
        {text}
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (actionText.toLowerCase().includes("up")) {
            router.push("/(auth)/sign-up");
          } else {
            router.push("/(auth)/sign-in");
          }
        }}
      >
        <Text className="text-primary font-bold font-display">
          {actionText}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
