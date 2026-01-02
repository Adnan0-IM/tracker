import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { useSession } from "../components/ctx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AudioWaveform,
  User,
} from "lucide-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Svg, { Path } from "react-native-svg";
import { useColorScheme } from "nativewind";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Define theme colors for usage in props (Icons, placeholderTextColor)
const THEME = {
  light: {
    primary: "#13ec5b",
    textMain: "#0f172a",
    textMuted: "#64748b",
    icon: "#64748b",
    placeholder: "#94a3b8", // slate-400
    background: "#f6f8f6",
  },
  dark: {
    primary: "#13ec5b",
    textMain: "#FFFFFF",
    textMuted: "#9db9a6",
    icon: "#9db9a6",
    placeholder: "#9db9a6",
    background: "#102216",
  },
};

export default function SignIn() {
  const { signIn } = useSession();
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Get current color scheme (defaults to light if undefined)
  const { colorScheme } = useColorScheme();
  const activeTheme = THEME[colorScheme === "dark" ? "dark" : "light"];
  const isDark = colorScheme === "dark";

  const toggleAuthMode = (value: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSignIn(value);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      extraHeight={80}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      {/* Background: Light vs Dark */}
      <SafeAreaView className="flex-1 justify-center gap-6 bg-background-light dark:bg-background-dark p-4 items-center">
        {/* headline */}
        <View className=" flex gap-2">
          <Text className="text-center font-display font-bold text-3xl text-text-main-light dark:text-white">
            Welcome Back
          </Text>
          <Text className="text-center font-display text-text-muted-light dark:text-text-muted">
            Track your expenses effortlessly and watch your savings grow
          </Text>
        </View>

        {/* segmented Sign In / Sign Up */}
        <View className="flex w-full px-4">
          <View className="flex-row w-full bg-surface-alt-light dark:bg-surface-dark rounded-xl p-1">
            <TouchableOpacity
              onPress={() => toggleAuthMode(true)}
              className={cn(
                "flex-1 rounded-lg py-3",
                isSignIn
                  ? "bg-white dark:bg-border-dark shadow-sm"
                  : "bg-transparent"
              )}
            >
              <Text
                className={cn(
                  "text-center font-display font-medium",
                  isSignIn
                    ? "text-text-main-light dark:text-white"
                    : "text-text-muted-light dark:text-text-muted"
                )}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleAuthMode(false)}
              className={cn(
                "flex-1 rounded-lg py-3",
                !isSignIn
                  ? "bg-white dark:bg-border-dark shadow-sm"
                  : "bg-transparent"
              )}
            >
              <Text
                className={cn(
                  "text-center font-display font-medium",
                  !isSignIn
                    ? "text-text-main-light dark:text-white"
                    : "text-text-muted-light dark:text-text-muted"
                )}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* card container */}
        <View className="w-full px-4">
          <View className="min-h-[203px]" style={{ overflow: "hidden" }}>
            {isSignIn ? (
              <View key="sign-in" className="w-full flex flex-col gap-3">
                {/* Sign In */}
                <View className="flex flex-col gap-2">
                  <Text className="text-sm font-semibold ml-1 text-text-main-light dark:text-white font-display">
                    Email
                  </Text>
                  <View className="relative">
                    <TextInput
                      className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 pr-12 text-text-main-light dark:text-white font-display"
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
                      className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-4 pr-12 text-text-main-light dark:text-white font-display"
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
            ) : (
              <View key="sign-up" className="w-full">
                {/* Sign Up */}
                <View className="flex flex-col gap-2">
                  <Text className="text-sm font-semibold ml-1 text-text-main-light dark:text-white font-display">
                    Full Name
                  </Text>

                  <View className="relative">
                    <TextInput
                      className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-3 text-text-main-light dark:text-white font-display"
                      placeholder="Ada Lovelace"
                      placeholderTextColor={activeTheme.placeholder}
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
                      <User color={activeTheme.icon} size={20} />
                    </View>
                  </View>
                </View>
                <View className="flex flex-col gap-2">
                  <Text className="text-sm font-semibold ml-1 text-text-main-light dark:text-white font-display">
                    Email
                  </Text>
                  <View className="relative">
                    <TextInput
                      className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-3 pr-12 text-text-main-light dark:text-white font-display"
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
                      className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl p-3 pr-12 text-text-main-light dark:text-white font-display"
                      placeholder="••••••••"
                      placeholderTextColor={activeTheme.placeholder}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
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
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* submit */}
        <TouchableOpacity className="w-full px-4" activeOpacity={0.8}>
          <View
            className={cn(
              "flex-row items-center justify-center py-4 bg-primary rounded-full gap-2 shadow-lg shadow-primary/20"
            )}
          >
            <Text className="font-display font-bold text-lg text-background-dark">
              {isSignIn ? "Sign In" : "Create Account"}
            </Text>
            <ArrowRight color={THEME.dark.background} strokeWidth={2.5} />
          </View>
        </TouchableOpacity>

        <View className="my-4">
          <AudioWaveform color={activeTheme.primary} size={40} />
        </View>
        <View className="relative w-full flex items-center px-4 justify-center">
          <Text className="border-b w-full border-border-light dark:border-border-dark" />
          <Text className="uppercase text-sm absolute top-1/2 bg-background-light dark:bg-background-dark px-4 font-display font-medium text-text-muted-light dark:text-text-muted">
            or continue with
          </Text>
        </View>
        <View className="flex gap-4 my-4 w-full px-4 flex-row">
          {/* Google */}
          <TouchableOpacity className="flex-1 h-14 items-center justify-center rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.7662 15.9274 23.766 12.2764Z"
                fill="#4285F4"
              />
              <Path
                d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                fill="#34A853"
              />
              <Path
                d="M5.50253 14.3003C5.00236 12.8199 5.00236 11.1799 5.50253 9.69967V6.60879H1.51649C-0.18551 10.0056 -0.18551 13.9945 1.51649 17.3912L5.50253 14.3003Z"
                fill="#FBBC05"
              />
              <Path
                d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.60879L5.50264 9.69967C6.45514 6.86006 9.11388 4.74966 12.2401 4.74966Z"
                fill="#EA4335"
              />
            </Svg>
          </TouchableOpacity>

          {/* Apple */}
          <TouchableOpacity className="flex-1 h-14 items-center justify-center rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
            <Svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill={isDark ? "white" : "black"}
            >
              <Path d="M16.3637 12.9248C16.3888 11.2335 17.6329 10.1611 17.697 10.1098C16.6575 8.65064 15.0294 8.41165 14.3546 8.38466C12.9554 8.24354 11.6635 9.19942 10.9765 9.19942C10.2736 9.19942 9.16788 8.37537 7.99955 8.40228C6.48007 8.42361 5.07604 9.27366 4.29824 10.5982C2.67919 13.3486 3.90483 17.436 5.48514 19.6736C6.25732 20.767 7.17066 22.0002 8.3855 21.9548C9.57077 21.9074 10.0151 21.2078 11.4589 21.2078C12.8727 21.2078 13.2773 21.9548 14.509 21.9306C15.7753 21.9074 16.6074 20.793 17.3621 19.7024C17.9355 18.8783 18.4287 17.8488 18.924 16.7841C18.8878 16.7646 16.3284 15.8087 16.3637 12.9248ZM12.9805 6.64966C13.6338 5.86981 14.0628 4.79375 13.9431 3.73743C12.9693 3.77641 11.7897 4.37894 11.087 5.18732C10.4571 5.90878 9.90547 7.01828 10.0465 8.05872C11.1309 8.14781 12.2711 7.48119 12.9805 6.64966Z" />
            </Svg>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity className="flex-1 h-14 items-center justify-center rounded-2xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M22 12.0634C22 6.50293 17.5229 2 12 2C6.47715 2 2 6.50293 2 12.0634C2 17.087 5.65651 21.2599 10.4375 22V14.9691H7.89844V12.0634H10.4375V9.87325C10.4375 7.37526 11.9298 5.99285 14.2146 5.99285C15.3088 5.99285 16.4531 6.18683 16.4531 6.18683V8.63973H15.1922C13.9657 8.63973 13.5833 9.3957 13.5833 10.1713V12.0634H16.3635L15.919 14.9691H13.5833V22C18.3642 21.2599 22 17.087 22 12.0634Z"
                fill="#1877F2"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        {isSignIn ? (
          <View className="flex flex-row gap-2">
            <Text className="text-text-muted-light dark:text-text-muted font-display">
              Don&apos;t have an account?
            </Text>
            <TouchableOpacity onPress={() => toggleAuthMode(false)}>
              <Text className="text-primary font-bold font-display">
                {" "}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex flex-row gap-2">
            <Text className="text-text-muted-light dark:text-text-muted font-display">
              Already have an account?
            </Text>
            <Pressable onPress={() => toggleAuthMode(true)}>
              <Text className="text-primary font-bold font-display">
                {" "}
                Sign In
              </Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
