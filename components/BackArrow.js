import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import theme from "../config/theme";

export default function BackArrow({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{marginLeft: 20}}>
      <FontAwesome name="arrow-left" size={24} color={theme.colors.blue} />
    </TouchableOpacity>
  )
}