import THEME from "@/constants/theme";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

export default function SubmitButton({ text }: { text: string }) {
  return (
    <View className="w-full">
      <TouchableOpacity className="w-full px-4" activeOpacity={0.8}>
        <View
          className={cn(
            "flex-row items-center justify-center py-[0.9rem] bg-primary rounded-full gap-2 shadow-lg shadow-primary/20",
          )}
        >
          <Text className="font-display font-bold text-lg text-background-dark">
            {text}
          </Text>
          <ArrowRight color={THEME.dark.background} strokeWidth={2.5} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
