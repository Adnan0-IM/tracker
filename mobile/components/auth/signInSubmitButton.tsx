import THEME from "@/constants/theme";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react-native";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

export default function SignInSubmitButton({
  text,
  handleSubmit,
  isLoading,
}: {
  text: string;
  handleSubmit: () => void;
  isLoading: boolean;
}) {
  return (
    <View className="w-full pt-6">
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => handleSubmit()}
        className="w-full px-4"
        activeOpacity={0.8}
      >
        <View
          className={cn(
            "flex-row items-center justify-center py-[0.9rem] bg-primary rounded-full gap-2 shadow-lg shadow-primary/20"
          )}
        >
          {isLoading ? (
            <ActivityIndicator color={THEME.dark.background} />
          ) : (
            <>
              <Text className="font-display font-bold text-lg text-background-dark">
                {text}
              </Text>
              <ArrowRight color={THEME.dark.background} strokeWidth={2.5} />
            </>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
