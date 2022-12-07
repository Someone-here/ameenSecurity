import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomePage from "../../layouts/HomePage";
import { useState } from "react";
import common from "../../config/styles.common";
import dayjs from "dayjs";
import theme from "../../config/theme";

function ApplyButton() {
  return (
    <TouchableOpacity style={common.button}>
      <Text style={common.h4}>Apply</Text>
    </TouchableOpacity>
  )
}

function CancelButton() {
  return (
    <TouchableOpacity
      style={[common.button, { backgroundColor: theme.colors.red }]}
    >
      <Text style={common.h4}>Cancel</Text>
    </TouchableOpacity>
  );
}

function VenueProfileButton() {
  return (
    <TouchableOpacity style={common.button}>
      <Text style={common.h4}>Venue</Text>
    </TouchableOpacity>
  );
}

function VenueAndCancelButton() {
  return (
    <View style={[common.row, { width: "80%" }]}>
      <CancelButton />
      <VenueProfileButton />
    </View>
  )
}

const actions = {
  explore: ApplyButton,
  applied: CancelButton,
  confirmed: VenueAndCancelButton,
  completed: VenueProfileButton,
};

export default function ShiftDetailScreen({ route }) {
  const navigation = useNavigation();
  const shift = route.params.item;
  const Action = actions.hasOwnProperty(route.params.status)
    ? actions[route.params.status]
    : null;

  return (
    <HomePage>
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={[common.h4, { alignSelf: "center" }]}>Shift Details</Text>
        <View style={common.details}>
          <View style={common.row}>
            <Text style={common.h5}>Venue</Text>
            <Text style={common.normalText}>{shift.venue}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Pay per hour</Text>
            <Text style={common.normalText}>£ {shift.payPerHour}</Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Start Date</Text>
            <Text style={common.normalText}>
              {shift.start.toDate().toDateString()}
            </Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Timing</Text>
            <Text style={common.normalText}>
              {dayjs(shift.start.toDate()).format("HH:mm")} -{" "}
              {dayjs(shift.end.toDate()).format("HH:mm")}
            </Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Total time</Text>
            <Text style={common.normalText}>
              {dayjs(shift.end.toDate()).diff(shift.start.toDate(), "hours")}{" "}
              hours
            </Text>
          </View>
          <View style={common.row}>
            <Text style={common.h5}>Total Pay</Text>
            <Text style={common.normalText}>
              £{" "}
              {parseInt(
                dayjs(shift.end.toDate()).diff(shift.start.toDate(), "hours")
              ) * shift.payPerHour}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginTop: 150 }}>
          {Action && <Action />}
        </View>
      </View>
    </HomePage>
  );
}
