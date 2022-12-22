import { firestore } from "firebase-admin";

interface ApplyShiftRequestData {
  shiftId: string
  userId: string
}

function apply({ userId, shiftId }: ApplyShiftRequestData) {
  const userDoc = firestore().collection("users").doc(userId);
  const shiftDoc = firestore().collection("shifts").doc(shiftId);
  const applyUser = userDoc.update({
    applied: firestore.FieldValue.arrayUnion(shiftDoc),
  });
  const applyShift = shiftDoc.update({
    applicants: firestore.FieldValue.arrayUnion(userDoc),
    status: "reviewing",
    numOfApplicants: firestore.FieldValue.increment(1),
  });
  return Promise.all([applyUser, applyShift]);
}

export default apply;
