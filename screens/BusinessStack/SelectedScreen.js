import { View, Text, FlatList } from "react-native";
import Applicant from "../../components/Applicant";
import HomePage from "../../layouts/HomePage";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import common from "../../config/styles.common";

export default function SelectedScreen({ route, navigation }) {
  const shiftId = route.params.id;
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    return firestore().collection(`shifts/${shiftId}/selected`).onSnapshot((snap) => {
      setSelected(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <HomePage>
      <View style={{ paddingHorizontal: 18 }}>
        <Text style={[common.h4, { alignSelf: "center" }]}>Selected</Text>
        <FlatList
          data={selected}
          renderItem={({ item }) => <Applicant item={item} onPress={() => navigation.navigate("SelectedReview", { userId: item.id, shiftId })} />}
        />
      </View>
    </HomePage>
  )
} 