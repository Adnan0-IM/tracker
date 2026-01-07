import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "@/components/auth/header";
import SignUpForm from "@/components/auth/signUpForm";
import SubmitButton from "@/components/auth/submitButton";
import SocialSignIn from "@/components/auth/social-signIn";
import SignInFooter from "@/components/auth/footer";
import { useSession } from "@/components/ctx";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function SignUp() {
  const { signIn } = useSession();

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
            Get Started
          </Text>
          <Text className="text-center font-display text-text-muted-light dark:text-text-muted">
            Track your expenses effortlessly and watch your savings grow
          </Text>
        </View>
        {/* title  Sign Up */}
        <Header title="Sign Up" />
        {/* card container form */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          style={{ width: "100%" }}
        >
          <SignUpForm />
        </Animated.View>
        {/* submit */}

        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={{ width: "100%" }}
        >
          <SubmitButton text="Create Account" />
        </Animated.View>
        {/* social  */}

        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          style={{ width: "100%" }}
        >
          <SocialSignIn />
        </Animated.View>
        {/* footer  */}
        <SignInFooter text="Already have an account?" actionText="Sign In" />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
