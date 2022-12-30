import { firestore } from "firebase-admin";
import { Guard, Steward } from "../db.types";

interface ShiftConfirmRequest {
  userId: string
  shiftId: string
}

export default async function confirm({ userId, shiftId } : ShiftConfirmRequest) {
  const selectedRef = firestore().collection(`shifts/${shiftId}/selected`);
  const shiftDocRef = firestore().collection("shifts").doc(shiftId);
  const userDoc = firestore().collection("users").doc(userId);
  const addUserToSelected = 
    userDoc.get().then(doc => {
      const data = <Guard | Steward> doc.data();
      selectedRef.doc(userId).set({
        firstName: data.firstName,
        avatar: data.avatar,
        lastName: data.lastName,
        rating: data.rating,
      });
    });
  const updateCountShift = shiftDocRef.update({
    numOfSelected: firestore.FieldValue.increment(1),
    numOfApplicants: firestore.FieldValue.increment(-1),
  });
  const updateCountBusiness = shiftDocRef.get().then(doc => {
    const biz = <firestore.DocumentReference> doc.data()?.business;
    firestore().collection(`users/${biz.id}/shifts`).doc(shiftId).update({  
      numOfSelected: firestore.FieldValue.increment(1),
      numOfApplicants: firestore.FieldValue.increment(-1),
    });
  });
  const removeFromApplicants = shiftDocRef.collection("applicants").doc(userId).delete();
  const updateClientStatus = userDoc.collection("shifts").doc(shiftId).update({ status: "selected" });
  
  return await Promise.all([addUserToSelected, updateCountBusiness, updateCountShift, removeFromApplicants, updateClientStatus]);
}