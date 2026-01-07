import useTheme from "@/hooks/useTheme";
import { Eye, EyeOff, Mail } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { activeTheme } = useTheme();
  return (
    <View key="sign-in" className="w-full px-2 flex flex-col gap-3">
      {/* Sign In */}
      <View  className="flex flex-col gap-2">
        <Text className="text-sm font-semibold ml-1 text-text-main-light dark:text-white font-display">
          Email
        </Text>
        <View className="relative">
          <TextInput
            className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 text-text-main-light dark:text-white font-display"
            placeholder="you@example.com"
            placeholderTextColor={activeTheme.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View
            style={{
              position: "absolute",
              right: 12,
              top: 0,
              bottom: 0,
              justifyContent: "center",
            }}
          >
            <Mail color={activeTheme.icon} size={20} />
          </View>
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <Text className="text-sm font-semibold ml-1 text-text-main-light dark:text-white font-display">
          Password
        </Text>
        <View className="relative">
          <TextInput
            className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4  text-text-main-light dark:text-white font-display"
            placeholder="••••••••"
            placeholderTextColor={activeTheme.placeholder}
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 12,
              top: 0,
              bottom: 0,
              justifyContent: "center",
            }}
          >
            {showPassword ? (
              <EyeOff color={activeTheme.icon} size={20} />
            ) : (
              <Eye color={activeTheme.icon} size={20} />
            )}
          </Pressable>
        </View>
      </View>
      <View>
        <Text className="text-primary font-display font-semibold text-right mt-1">
          Forget Password?
        </Text>
      </View>
    </View>
  );
}
