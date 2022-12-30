import { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import common from "../../config/styles.common";
import HomePage from "../../layouts/HomePage";
import { AuthenticatedUserContext } from "../../providers/AuthenticatedUserProvider";
import DatePicker from "react-native-modern-datepicker";
import { ErrorMessage, Field, Formik } from "formik";
import dayjs from "dayjs";
import theme from "../../config/theme";
import Modal from "react-native-modal";
import functionInstance from "../../config/firebase.functions";

async function addShift(values, userId) {
  const start = new Date(`${values.startDate} ${values.startTime}`)
  const end = dayjs(start).add(parseInt(values.hours), "h").toDate();
  const endpoint = functionInstance.httpsCallable("addShift")
  const body = {
    payPerHour: values.payPerHour,
    numRequired: values.numRequired,
    start: start.toJSON(),
    end: end.toJSON(),
    type: values.type,
    userId
  }
  await endpoint(body)
}

export default function AddShiftScreen({ navigation }) {
  const { user } = useContext(AuthenticatedUserContext);
  const [startPicker, setStartPicker] = useState(false);
  const formikRef = useRef(null);

  return (
    <HomePage>
      <Text style={[common.h4, { alignSelf: "center" }]}>Add Shift</Text>
      <Formik
        innerRef={formikRef}
        initialValues={{
          startDate: null,
          startTime: null,
          hours: 8,
          numRequired: 1,
          type: "guard",
          payPerHour: 12,
        }}
        onSubmit={(values) => addShift(values, user.uid).then(() => {
            formikRef.current.resetForm();
            navigation.navigate("Activity");
          }).catch((e) => console.log(e))
        }
        validateOnBlur={false}
        validate={(values) => !values.startDate || !values.startTime ? { "startDate": "Please enter both time and date" } : null }
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <>
            <View style={styles.container}>
              <View style={[common.row, { marginTop: 12 }]}>
                <Text style={common.h5}>Number required: </Text>
                <TextInput
                  style={[styles.input, { width: 80, textAlign: "center" }]}
                  maxLength={2}
                  name="numRequired"
                  onBlur={handleBlur("numRequired")}
                  keyboardType="number-pad"
                  value={values.numRequired?.toString()}
                  onChangeText={handleChange("numRequired")}
                />
              </View>
              <View style={[common.row, { marginTop: 12 }]}>
                <Text style={common.h5}>Pay Per Hour($): </Text>
                <TextInput
                  style={[styles.input, { width: 80, textAlign: "center" }]}
                  maxLength={4}
                  name="payPerHour"
                  onBlur={handleBlur("payPerHour")}
                  keyboardType="number-pad"
                  onChangeText={handleChange("payPerHour")}
                  value={values.payPerHour?.toString()}
                />
              </View>
              <Field name="hours">
                {({field}) => (
                  <View style={[common.row, {marginTop: 12}]}>
                    <Text style={common.h5}>Number of hours: </Text>
                    <TextInput
                      style={[styles.input, { width: 80, textAlign: "center" }]}
                      maxLength={4}
                      name={field.name}
                      onBlur={handleBlur(field.name)}
                      keyboardType="number-pad"
                      onChangeText={handleChange(field.name)}
                      value={field.value?.toString()}
                    />
                  </View>
                )}
              </Field>
              <Field name="type">
                {({ field }) => (
                  <View style={[common.row, { marginTop: 12 }]}>
                    <Text style={common.h5}>Type Required: </Text>
                    <View style={[common.row, { width: 160 }]}>
                      <TouchableOpacity
                        style={{
                          padding: 8,
                          borderWidth: 0.2,
                          borderRadius: 12,
                          backgroundColor:
                            field.value == "guard"
                              ? theme.colors.lightRed
                              : null,
                        }}
                        onPress={() => {
                          field.onChange(field.name)("guard");
                        }}
                      >
                        <Text style={common.normalText}>Guard</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 8,
                          borderWidth: 0.2,
                          borderRadius: 12,
                          backgroundColor:
                            field.value == "steward"
                              ? theme.colors.lightRed
                              : null,
                        }}
                        onPress={() => {
                          field.onChange(field.name)("steward");
                        }}
                      >
                        <Text style={common.normalText}>Steward</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Field>
              <View style={[common.row, { marginTop: 12 }]}>
                <Text style={common.h5}>Start date & time:</Text>
                <TouchableOpacity
                  onPress={() => setStartPicker(true)}
                  style={{ padding: 8, borderWidth: 0.2, borderRadius: 12 }}
                >
                  <Text style={common.normalText}>
                    {values.startDate && values.startTime
                      ? `${values.startDate} ${values.startTime}`
                      : "Set Time"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 42 }}>
              <ErrorMessage name="startDate">
                {(msg) => (
                  <Text style={[common.normalText, { color: "red" }]}>{msg}</Text>
                )}
              </ErrorMessage>
              <TouchableOpacity
                style={[common.button, {marginTop: 12}]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                { isSubmitting ? <ActivityIndicator color="white" /> : <Text style={common.h5}>Submit</Text> }
              </TouchableOpacity>
              </View>
            </View>
            <Modal
              isVisible={startPicker}
              onBackdropPress={() => setStartPicker(false)}
            >
              <DatePicker
                minimumDate={dayjs(new Date())
                  .add(1, "day")
                  .format("YYYY-MM-DD")}
                maximumDate={dayjs(new Date())
                  .add(3, "months")
                  .format("YYYY-MM-DD")}
                minuteInterval={10}
                selected={values.startDate}
                style={{
                  alignSelf: "center",
                  borderRadius: 18,
                  position: "absolute",
                  zIndex: 999,
                  marginTop: "20%",
                }}
                options={{ mainColor: theme.colors.blue }}
                onDateChange={(date) => handleChange("startDate")(date)}
                onTimeChange={(date) => handleChange("startTime")(date)}
              />
            </Modal>
          </>
        )}
      </Formik>
    </HomePage>
  );
}

const styles = StyleSheet.create({
  btn: {
    ...common.button,
    backgroundColor: theme.colors.lightBlue,
    width: "35%",
  },
  container: {
    padding: 24,
  },
  input: {
    backgroundColor: "#e5e5e5",
    borderRadius: 12,
    fontSize: 18,
    padding: 12,
  },
});
