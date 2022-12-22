import { View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomePage from "../../layouts/HomePage";
import { useContext, useEffect, useState } from "react";
import common from "../../config/styles.common";
import dayjs from "dayjs";
import Applicant from "../../components/Applicant";
import theme from "../../config/theme";
import firestore from "@react-native-firebase/firestore";
import { AuthenticatedUserContext } from "../../providers/AuthenticatedUserProvider";

function applyForShift({ userId, shiftId }) {
  console.log(userId, shiftId);
  const userDoc = firestore().collection("users").doc(userId);
  const shiftDoc = firestore().collection("shifts").doc(shiftId);
  const applyUser = userDoc.update({
    applied: firestore.FieldValue.arrayUnion(shiftDoc),
  });
  const applyShift = shiftDoc.update({
    applicants: firestore.FieldValue.arrayUnion(userDoc),
  });
  return Promise.all([applyUser, applyShift]);
}

function deleteShift(userId, shiftId) {
  const doc = firestore().collection().doc(userId);
  return doc.update({});
}

async function getApplicants(applicants) {
  console.log(applicants);
  const appRefs = applicants.map(applicant => applicant.get());
  return (await Promise.all(appRefs)).map(doc => { return { id: doc.id, ...doc.data() } });
}

function ApplyButton(userId, shiftId) {
  return (
    <TouchableOpacity
      style={common.button}
      onPress={() => applyForShift(userId, shiftId)}
    >
      <Text style={common.h4}>Apply</Text>
    </TouchableOpacity>
  );
}

function DeleteButton({ userId, shiftId, status, navigation }) {
  return (
    <TouchableOpacity
      style={[common.button, { backgroundColor: theme.colors.red }]}
      onPress={() => deleteShift({ userId, shiftId, status }).then(() => navigation.navigate("Activity"))}
    >
      <Text style={common.h4}>Delete</Text>
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

function VenueAndCancelButton({ onCancel, onVenue }) {

  return (
    <View style={[common.row, { width: "80%" }]}>
      <CancelButton />
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
    advertised: () => <DeleteButton userId={user.uid} shiftId={shift.id} status="advertised" navigation={navigation} />,
    applied: () => <VenueAndCancelButton onVenue={navigateToBusiness} />,
    confirmed: VenueAndCancelButton,
    completed: () => <VenueProfileButton onPress={navigateToBusiness} />,
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
        <TouchableOpacity style={common.button} onPress={() => navigation.navigate("Applicants", { id: shift.id })}>
          <Text style={common.h4}>
            {shift.numOfApplicants} Applicants
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </HomePage>
  );
}
