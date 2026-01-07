import { Text, View } from "react-native";

export function Header({ title }: { title: string }) {
  return (
    <View className="w-full px-4  flex-row items-center justify-center gap-3">
      <View className="h-[1px] flex-1 bg-border-light dark:bg-border-dark opacity-50" />
      <Text className="text-sm font-display font-medium uppercase tracking-widest text-text-muted-light dark:text-text-muted">
        {title}
      </Text>
      <View className="h-[1px] flex-1 bg-border-light dark:bg-border-dark opacity-50" />
    </View>
  );
}
