import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "@/components/auth/header";
import SignInForm from "@/components/auth/signInForm";
import SocialSignIn from "@/components/auth/social-signIn";
import SignInFooter from "@/components/auth/footer";
import { useSession } from "@/components/ctx";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useState } from "react";

export type FormDataType = {
  email: string;
  password: string;
};
export default function SignIn() {
  const { signIn } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);
    try {
      await signIn(formData.email, formData.password);
    } catch (error: any) {
      console.log("Failed to sign-in", error);
      setError(
        error?.response?.data?.message ||
          (error as Error).message ||
          "Failed to sign in"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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

        {/* title Sign In  */}
        <Header title="Sign In" />
        {error && (
          <Text className="text-red-500 font-semibold text-center">
            {error}
          </Text>
        )}
        {/* card container form  */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          style={{ width: "100%" }}
        >
          <SignInForm
            isLoading={isSubmitting}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        </Animated.View>

        {/* social  */}
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          style={{ width: "100%" }}
        >
          <SocialSignIn />
        </Animated.View>

        {/* footer  */}
        <SignInFooter text="Don't have an account?" actionText="Sign Up" />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
