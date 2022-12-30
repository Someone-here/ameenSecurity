import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomePage from "../../layouts/HomePage";
import { useContext, useState } from "react";
import common from "../../config/styles.common";
import dayjs from "dayjs";
import theme from "../../config/theme";
import { AuthenticatedUserContext } from "../../providers/AuthenticatedUserProvider";
import functionInstance from "../../config/firebase.functions";

function deleteShift({ userId, shiftId }) {
  const deleteShift = functionInstance.httpsCallable("removeShift");
  return deleteShift({ userId, shiftId });
}

function EditAndDeleteButton({ userId, shiftId, hasSelected, navigation }) {
  const [loading, setLoading] = useState(false);

  return (
    <TouchableOpacity
      disabled={loading}
      style={[common.button, { backgroundColor: theme.colors.red }]}
      onPress={() => {
        setLoading(true);
        deleteShift({ userId, shiftId }).then(() => {
          setLoading(false);
          navigation.navigate("Activity");
        });
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={common.h4}>Delete</Text>
      )}
    </TouchableOpacity>
  );
}

export default function ShiftDetailScreen({ route }) {
  const navigation = useNavigation();
  const shift = route.params.item;

  const { user } = useContext(AuthenticatedUserContext);

  const actions = {
    advertised: () => (
      <EditAndDeleteButton
        userId={user.uid}
        shiftId={shift.id}
        status="advertised"
        navigation={navigation}
        hasSelect={shift.numOfSelected > 0}
      />
    ),
  };

  const Action = actions.hasOwnProperty(route.params.status)
    ? actions[route.params.status]
    : null;

  return (
    <HomePage>
      <ScrollView style={{ paddingHorizontal: 18 }}>
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
        <View style={{ alignItems: "center", marginTop: 40, marginBottom: 50 }}>
          {Action && <Action />}
        </View>
        <TouchableOpacity
          style={common.button}
          onPress={() =>
            shift.numOfApplicants > 0 &&
            navigation.navigate("Applicants", { id: shift.id })
          }
        >
          <Text style={common.h4}>
            {shift.numOfApplicants} Applicant
            {shift.numOfApplicants != 1 ? "s" : ""}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[common.button, { marginTop: 18 }]}
          onPress={() =>
            shift.numOfSelected > 0 &&
            navigation.navigate("Selected", { id: shift.id })
          }
        >
          <Text style={common.h4}>{shift.numOfSelected} Selected</Text>
        </TouchableOpacity>
      </ScrollView>
    </HomePage>
  );
}
