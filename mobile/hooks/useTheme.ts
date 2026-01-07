import THEME from "@/constants/theme";
import { useColorScheme } from "nativewind";

export default function useTheme() {
  // Get current color scheme (defaults to light if undefined)
  const {colorScheme} = useColorScheme();
  const activeTheme = THEME[colorScheme === "dark" ? "dark" : "light"];

  const isDark = colorScheme === "dark";

  return { activeTheme, isDark };
}
