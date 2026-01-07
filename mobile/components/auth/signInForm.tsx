import { FormDataType } from "@/app/(auth)/sign-in";
import useTheme from "@/hooks/useTheme";
import { Eye, EyeOff, Mail } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import SubmitButton from "./signInSubmitButton";

export default function SignInForm({
  formData,
  setFormData,
  handleSubmit,
  isLoading,
}: {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  handleSubmit: () => void;
  isLoading: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { activeTheme } = useTheme();
  return (
    <View>
      <View key="sign-in" className="w-full px-2 flex flex-col gap-3">
        {/* Sign In */}
        <View className="flex flex-col gap-2">
          <Text className="text-sm font-semibold ml-1 text-text-main-light dark:text-white font-display">
            Email
          </Text>
          <View className="relative">
            <TextInput
              className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 text-text-main-light dark:text-white font-display"
              placeholder="adnan@example.com"
              placeholderTextColor={activeTheme.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, email: text }))
              }
              value={formData.email}
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
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, password: text }))
              }
              value={formData.password}
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
        <TouchableOpacity>
          <Text className="text-primary font-display font-semibold text-right mt-1">
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>
      {/* submit  */}
      <Animated.View
        entering={FadeInDown.delay(400).duration(1000).springify()}
        style={{ width: "100%" }}
      >
        <SubmitButton
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          text="Sign In"
        />
      </Animated.View>
    </View>
  );
}
