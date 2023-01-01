import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import functionInstance from "../../config/firebase.functions";
import { Chat } from "@flyerhq/react-native-chat-ui";
import { useFocusEffect } from "@react-navigation/native";

function createContact({ userId, businessId }) {
  const action = functionInstance.httpsCallable("createContact");
  return action({ userId, businessId });
}


export default function ChatScreen({ route }) {
  const { userId, businessId, businessName } = route.params;
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  console.log(userId, businessId)

  const addMessage = useCallback(({ text }) => {
    firestore().collection(`chatrooms/${userId}-${businessId}/messages`).add({
      text,
      timestamp: firestore.Timestamp.fromDate(new Date()),
      type: "text",
      author: { id: userId },
    });
  }, [userId, businessId]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({ title: businessName });
      firestore().collection("chatrooms").doc(`${userId}-${businessId}`).get().then(doc => {
        if (!doc.exists) {
          console.log("Neww");
          createContact({ userId, businessId }) 
        }
      });
      const unsub = firestore()
        .collection(`chatrooms/${userId}-${businessId}/messages`).orderBy("timestamp", "desc")
        .onSnapshot((snap) => {
          setMessages(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });

      return () => {
        unsub();
        if (messages.length > 0) {
          console.log(messages.at(0))
          const a1 = firestore().collection(`users/${userId}/contacts`).doc(businessId).update({
            lastMessage: messages.at(0).text,
          });
          const a2 = firestore().collection(`users/${businessId}/contacts`).doc(userId).update({
            lastMessage: messages.at(0).text,
          });
          return Promise.all(a1, a2);
        }
      }
    }, [])
  );

  return (
    <Chat 
      messages={messages}
      onSendPress={addMessage}
      user={{ id: userId }}
    />
  );
}
