import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import common from "../config/styles.common";
import theme from "../config/theme";
import { FontAwesome } from "@expo/vector-icons";

export default function Applicant({ item, onPress }) {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <View style={common.row}>
        <View style={[common.row, { width: "74%" }]}>
        <Image source={{ uri: item.avatar }} style={{ width: 70, aspectRatio: 1, borderRadius: 100 }} />
        <View>
          <Text style={common.h5}>{item.firstName} {item.lastName}</Text>
          <AirbnbRating defaultRating={item.rating} showRating={false} selectedColor="#000" size={24} st />
        </View>
        </View>
        <FontAwesome name="arrow-circle-right" size={40} />
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  container: {
    ...common.details,
    paddingVertical: 8,
    paddingHorizontal: 16,
  }
})