import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomePage from "../../layouts/HomePage";
import { useContext, useState } from "react";
import common from "../../config/styles.common";
import dayjs from "dayjs";
import theme from "../../config/theme";
import { AuthenticatedUserContext } from "../../providers/AuthenticatedUserProvider";
import functionInstance from "../../config/firebase.functions";

function applyForShift({ userId, shiftId }) {
  const action = functionInstance.httpsCallable("applyShift");
  return action({ userId, shiftId });
}

function cancelShift({ userId, shiftId, status }) {
  const action = functionInstance.httpsCallable("cancelShift");
  return action({ userId, shiftId, status });
}

function ApplyButton({ userId, shiftId, navigation }) {
  return (
    <TouchableOpacity
      style={common.button}
      onPress={() =>
        applyForShift({ userId, shiftId }).then(navigation.navigate("Activity"))
      }
    >
      <Text style={common.h4}>Apply</Text>
    </TouchableOpacity>
  );
}

function CancelButton({ userId, shiftId, navigation, status }) {

  const [loading, setLoading] = useState(false);

  return (
    <TouchableOpacity
      style={[common.button, { backgroundColor: theme.colors.red }]}
      disabled={loading}
      onPress={() => {
        setLoading(true);
        cancelShift({ userId, shiftId, status }).then(() => { setLoading(false); navigation.navigate("Home") })
      }}
    >
      { loading ? <ActivityIndicator color="#fff" /> : <Text style={common.h4}>Cancel</Text> }
    </TouchableOpacity>
  );
}

function VenueProfileButton({ onPress }) {
  return (
    <TouchableOpacity style={common.button} onPress={onPress}>
      <Text style={common.h4}>Venue</Text>
    </TouchableOpacity>
  );
}

function VenueAndCancelButton({ userId, shiftId, status, onVenue, navigation }) {
  return (
    <View style={[common.row, { width: "80%" }]}>
      <CancelButton userId={userId} shiftId={shiftId} status={status} navigation={navigation}  />
      <VenueProfileButton onPress={onVenue} />
    </View>
  );
}

export default function ShiftDetailScreen({ route }) {
  const navigation = useNavigation();
  const shift = route.params.item;
  const { user } = useContext(AuthenticatedUserContext);

  const navigateToBusiness = () =>
    navigation.navigate("BusinessProfile", {
      businessRef: shift.business,
    });

  const actions = {
    explore: () => (
      <ApplyButton
        userId={user.uid}
        shiftId={shift.id}
        navigation={navigation}
      />
    ),
    applied: () => (
      <VenueAndCancelButton
        userId={user.uid}
        shiftId={shift.id}
        status="applied"
        onVenue={navigateToBusiness}
        navigation={navigation}
      />
    ),
    confirmed: () => (
      <VenueProfileButton
        onPress={navigateToBusiness}
        navigation={navigation}
      />
    ),
    completed: () => (
      <VenueProfileButton
        onPress={navigateToBusiness}
        navigation={navigation}
      />
    ),
  };

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
