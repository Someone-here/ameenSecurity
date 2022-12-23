import { firestore } from "firebase-admin";

interface ApplyShiftRequestData {
  shiftId: string
  userId: string
}

interface Steward {
  firstName: string
  lastName: string
  avatar: string
  email: string
  phoneNumber: string
  rating: number
}

interface Guard {
  firstName: string
  lastName: string
  avatar: string
  SIA: string
  address: string
  email: string
  dateOfBirth: string
  phoneNumber: string
  rating: number
  skills: string[]
}

async function apply({ userId, shiftId }: ApplyShiftRequestData) {
  const userShiftDoc = firestore().collection(`users/${userId}/shifts`).doc(shiftId);
  const shiftDoc = firestore().collection("shifts").doc(shiftId);
  const data = (await shiftDoc.get()).data();
  const userDoc = firestore().collection("users").doc(userId);
  const userData = <Guard | Steward>(await userDoc.get()).data();
  const businessDoc = <firestore.DocumentReference> data?.business;
  const businessShift = businessDoc.collection("shifts").doc(shiftId);
  const a1 = businessShift.update({ numOfApplicants: firestore.FieldValue.increment(1) });
  const a2 = shiftDoc.update({ numOfApplicants: firestore.FieldValue.increment(1) });
  const a3 = userShiftDoc.set({ ...data, status: "applied" });
  const a4 = shiftDoc.collection("applicants").doc(userId).set({ 
    firstName: userData.firstName,
    lastName: userData.lastName,
    avatar: userData.avatar,
    rating: userData.rating
  });
  return await Promise.all([a1, a2, a3, a4]);
}

export default apply;
