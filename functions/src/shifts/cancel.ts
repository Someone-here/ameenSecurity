import { firestore } from "firebase-admin";

interface CancelRequestData {
  userId: string;
  shiftId: string;
  status: "applied" | "confirmed";
}

async function cancel({ userId, shiftId, status }: CancelRequestData) {
  const userShift = firestore().collection(`users/${userId}/shifts`).doc(shiftId);
  const shiftDoc = firestore().collection('shifts').doc(shiftId);
  const businessDoc = <firestore.DocumentReference> (await shiftDoc.get()).data()?.business;
  const a1 = userShift.delete();
  const a2 = shiftDoc.update({ numOfApplicants: firestore.FieldValue.increment(-1) });
  const a3 = businessDoc.collection("shifts").doc(shiftId).update({ numOfApplicants: firestore.FieldValue.increment(-1) });
  const a4 = shiftDoc.collection("applicants").doc(userId).delete();
  return Promise.all([a1, a2, a3, a4]);
}

export default cancel;
