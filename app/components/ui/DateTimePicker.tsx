import { Modal, Text, TouchableOpacity, View } from "react-native";
import { AppConstants } from "../../app.constants";
import { useCallback, useState } from "react";
import DatePicker from "react-native-modern-datepicker";

const DateTimePicker = ({ value, onChange, mode }: any) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const changeDate = useCallback((v) => {
    if (onChange) {
      onChange(v);
      setShowDatePicker(false);
    }
  }, []);

  const reversoDate =
    mode === "calendar" ? value?.split("/").reverse().join(".") : value;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={{
          borderWidth: 1,
          borderColor: AppConstants.grayColor,
          borderStyle: "solid",
          width: "100%",
          height: 40,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text style={{ color: AppConstants.grayColor }}>{reversoDate}</Text>
      </TouchableOpacity>

      <Modal visible={showDatePicker} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: AppConstants.darkColor,
              borderRadius: 10,
              padding: 20,
              width: "100%",
            }}
          >
            {mode === "calendar" ? (
              <DatePicker
                selected={value}
                mode="calendar"
                onDateChange={(value) => changeDate(value)}
                options={{
                  backgroundColor: AppConstants.darkColor,
                  textHeaderColor: AppConstants.grayColor,
                  textDefaultColor: AppConstants.grayColor,
                  selectedTextColor: AppConstants.darkColor,
                  mainColor: AppConstants.grayColor,
                  textSecondaryColor: AppConstants.grayColor,
                }}
              />
            ) : mode === "time" ? (
              <DatePicker
                selected={value}
                mode="time"
                onTimeChange={(value) => changeDate(value)}
                options={{
                  backgroundColor: AppConstants.darkColor,
                  textHeaderColor: AppConstants.grayColor,
                  textDefaultColor: AppConstants.grayColor,
                  selectedTextColor: AppConstants.darkColor,
                  mainColor: AppConstants.grayColor,
                  textSecondaryColor: AppConstants.grayColor,
                }}
              />
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DateTimePicker;
