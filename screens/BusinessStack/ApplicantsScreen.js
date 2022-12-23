import { View, Text, ActivityIndicator, FlatList } from "react-native";
import HomePage from "../../layouts/HomePage";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import theme from "../../config/theme";
import Applicant from "../../components/Applicant";
import common from "../../config/styles.common";

export default function ApplicantsScreen({ route, navigation }) {
  const shiftId = route.params.id;
  console.log(shiftId);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    return firestore()
      .collection(`shifts/${shiftId}/applicants`)
      .onSnapshot((snap) => {
        setApplicants(snap.docs.map(doc => ({...doc.data(), id: doc.id})));
      });
  }, []);

  if (applicants.length < 1)
    return <ActivityIndicator size={"large"} color={theme.colors.blue} />;

  return (
    <HomePage>
      <Text style={[common.h4, { alignSelf: "center" }]}>Applicants</Text>
      <View style={{ paddingHorizontal: 18 }}>
        <FlatList
          data={applicants}
          renderItem={({ item, onPress }) => (
            <Applicant item={item} onPress={() => navigation.navigate("ApplicantReview", { userId: item.id, shiftId })} />
          )}
        />
      </View>
    </HomePage>
  );
}