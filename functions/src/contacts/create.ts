import { firestore } from "firebase-admin";
import { Guard, Steward, Business } from "../db.types";

interface ContactRequest {
  userId: string;
  businessId: string;
}

export default async function create({ userId, businessId }: ContactRequest) {
  const userDocRef = firestore().collection("users").doc(userId);
  const businessDocRef = firestore().collection("users").doc(businessId);
  const chatRoomDocRef = firestore()
    .collection("chatrooms")
    .doc(`${userId}-${businessId}`);
  const [userDoc, businessDoc] = await Promise.all([
    userDocRef.get(),
    businessDocRef.get(),
  ]);
  if (!(userDoc.exists && businessDoc.exists))
    return { error: "User/Business does not exist" };
  const userData = <Guard | Steward>userDoc.data();
  const businessData = <Business>businessDoc.data();
  const clientContactBody = {
    name: `${userData.firstName} ${userData.lastName}`,
    avatar: userData.avatar,
    lastMessage: "",
  };
  const businessContactBody = {
    name: businessData.name,
    avatar: businessData.avatar,
    lastMessage: "",
  };
  const businessAdd = businessDocRef
    .collection("contacts")
    .doc(userId)
    .set(clientContactBody);
  const userAdd = userDocRef
    .collection("contacts")
    .doc(businessId)
    .set(businessContactBody);
  const createChatRoom = chatRoomDocRef.set({
    client: `${userData.firstName} ${userData.lastName}`,
    business: businessData.name,
  }, { merge: true });
  Promise.all([businessAdd, userAdd, createChatRoom]);
  return { business: businessData.name, client: `${userData.firstName} ${userData.lastName}` }
}
