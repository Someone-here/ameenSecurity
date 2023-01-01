import {region} from "firebase-functions";
import {add, apply, cancel, confirm, remove, deselect} from "./shifts";
import {create} from "./contacts";

exports.addShift = region("europe-west2").https.onCall(add);
exports.applyShift = region("europe-west2").https.onCall(apply);
exports.cancelShift = region("europe-west2").https.onCall(cancel);
exports.confirmShift = region("europe-west2").https.onCall(confirm);
exports.removeShift = region("europe-west2").https.onCall(remove);
exports.deselectShift = region("europe-west2").https.onCall(deselect);
exports.createContact = region("europe-west2").https.onCall(create);