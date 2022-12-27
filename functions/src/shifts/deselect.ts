import { firestore } from "firebase-admin";

interface CancelRequestData {
  userId: string;
  shiftId: string;
}

export default async function deselect({ userId, shiftId }: CancelRequestData) {
  const userShift = firestore().collection(`users/${userId}/shifts`).doc(shiftId);
  const shiftDoc = firestore().collection('shifts').doc(shiftId);
  const businessDoc = <firestore.DocumentReference> (await shiftDoc.get()).data()?.business;
  const a1 = userShift.delete();
  const a2 = shiftDoc.update({ numOfSelected: firestore.FieldValue.increment(-1) });
  const a3 = businessDoc.collection("shifts").doc(shiftId).update({ numOfSelected: firestore.FieldValue.increment(-1) });
  const a4 = shiftDoc.collection("selected").doc(userId).delete();
  return Promise.all([a1, a2, a3, a4]);
}