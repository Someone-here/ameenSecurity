import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import dayjs from "dayjs";
import common from "../config/styles.common";
import theme from "../config/theme";
import firestore from "@react-native-firebase/firestore";

export default function Shift({ shift, onPress }) {

  const start = new firestore.Timestamp(...Object.values(shift.start));
  const end = new firestore.Timestamp(...Object.values(shift.end));

  return (
    <TouchableOpacity style={styles.shift} key={shift.id} onPress={onPress}>
      <View style={styles.date}>
        <Text style={common.h4}>
          {dayjs(start.toDate()).format("MMM")}
        </Text>
        <Text style={common.h4}>
          {dayjs(start.toDate()).format("DD")}
        </Text>
      </View>
      <View style={styles.shiftRow}>
        <View
          style={styles.rightRow}
        >
          <Text style={common.h5}>{shift.venue}</Text>
          <Text style={common.h5}>
            ({dayjs(end.toDate()).diff(start.toDate(), "hours")}{" "}
            hours)
          </Text>
          <Text style={common.h5}>£ {shift.payPerHour} /hour</Text>
        </View>
        <View
          style={styles.rightRow}
        >
          <Text style={common.h5}>
            {dayjs(start.toDate()).format("HH:mm")} -{" "}
            {dayjs(end.toDate()).format("HH:mm")}
          </Text>
          <Text style={[common.h5, { textTransform: "capitalize" }]}>
            {shift.serviceRequired}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shift: {
    backgroundColor: theme.colors.lightBlue,
    padding: 8,
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 12,
  },
  date: {
    alignItems: "center",
    backgroundColor: theme.colors.red,
    width: "20%",
    padding: 8,
    borderRadius: 12,
  },
  shiftRow: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  }
});
