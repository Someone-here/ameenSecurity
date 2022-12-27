import { firestore  } from "firebase-admin";

interface ShiftRemoveRequest {
  userId: string
  shiftId: string
}

export default function remove({ userId, shiftId }: ShiftRemoveRequest) {
  const userShiftDocDelete = firestore().collection(`users/${userId}/shifts/`).doc(shiftId).delete();
  const applicantsRemove = 
    firestore().collection(`shifts/${shiftId}/applicants`).get()
    .then((snap) => { 
      const actions = snap.docs.map(({ id }) => (
        firestore().collection(`users/${id}/shifts`).doc(shiftId).delete()
      ));
      Promise.all(actions);
    });
  const shiftRemove = firestore().recursiveDelete(firestore().collection("shifts").doc(shiftId));
  return Promise.all([userShiftDocDelete, applicantsRemove, shiftRemove]);
}