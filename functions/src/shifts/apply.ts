import { firestore } from "firebase-admin";
import { Guard, Steward } from "../db.types";

interface ApplyShiftRequestData {
  shiftId: string
  userId: string
}

async function apply({ userId, shiftId }: ApplyShiftRequestData) {
  const userShiftDoc = firestore().collection(`users/${userId}/shifts`).doc(shiftId);
  if ((await userShiftDoc.get()).exists) return "User Already applied";
  const shiftDoc = firestore().collection("shifts").doc(shiftId);
  const userDoc = firestore().collection("users").doc(userId);
  const [userDataGetRef, shiftGetRef] = await Promise.all([userDoc.get(), shiftDoc.get()]);
  const userData = <Guard | Steward> userDataGetRef.data();
  const shiftData = shiftGetRef.data();
  const businessDoc = <firestore.DocumentReference> shiftData?.business;
  const businessShift = businessDoc.collection("shifts").doc(shiftId);
  const a1 = businessShift.update({ numOfApplicants: firestore.FieldValue.increment(1) });
  const a2 = shiftDoc.update({ numOfApplicants: firestore.FieldValue.increment(1) });
  const a3 = userShiftDoc.set({ ...shiftData, status: "applied" });
  const a4 = shiftDoc.collection("applicants").doc(userId).set({ 
    firstName: userData.firstName,
    lastName: userData.lastName,
    avatar: userData.avatar,
    rating: userData.rating
  });
  return await Promise.all([a1, a2, a3, a4]);
}

export default apply;
