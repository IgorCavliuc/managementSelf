import { Modal, ScrollView, Text, View } from "react-native";
import React from "react";
import { MainLoyaut } from "../../ui/loyaut/MainLoyaut";
import { Button } from "../../ui/loyaut/Button";
import { AppConstants } from "../../../app.constants";
import { AntDesign } from "@expo/vector-icons";
import Slider from "../../ui/loyaut/Slider";

export const TodoView = ({
  taskView,
  setTaskViewId,
  setEditTask,
  setVisibleModal,
}: any) => {
  const images = taskView?.image;
  return (
    <Modal visible={Boolean(taskView)}>
      <MainLoyaut>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: AppConstants.primaryGap,
          }}
        >
          <Button
            onPress={() => setTaskViewId(null)}
            style={{
              backgroundColor: "transparent",
              alignItems: "center",
              borderRadius: 50,
              height: 50,
              width: 50,
            }}
          >
            <AntDesign
              name="leftcircleo"
              size={26}
              color={AppConstants.grayColor}
            />
          </Button>
          <Button
            onPress={() => {
              setEditTask(taskView._id);
              setVisibleModal(true);
            }}
            style={{
              backgroundColor: "transparent",
              alignItems: "center",
              borderRadius: 50,
              height: 50,
              width: 50,
            }}
          >
            <AntDesign name="edit" size={26} color={AppConstants.grayColor} />
          </Button>
        </View>
        <ScrollView>
          <View style={{ height: "100%" }}>
            <Text style={styles.labelHead}>{taskView?.label}</Text>
            <Text style={[styles.labelDesc, { marginBottom: 20 }]}>
              {taskView?.description}
            </Text>
            <View style={{ flexDirection: "row", gap: 20, marginBottom: 0 }}>
              <Text style={styles.labelDesc}>
                <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
                {taskView?.date}
              </Text>
              <Text style={styles.labelDesc}>
                <Text style={{ fontWeight: "bold" }}>Time:</Text>{" "}
                {taskView?.time}
              </Text>
            </View>
            <Text style={[styles.labelDesc, { marginBottom: 40 }]}>
              <Text style={{ fontWeight: "bold" }}>Location: </Text>
              {taskView?.location}
            </Text>
            <Slider photos={images} />
          </View>
        </ScrollView>
      </MainLoyaut>
    </Modal>
  );
};

const styles = {
  labelHead: {
    color: AppConstants.grayColor,
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop: 20,
  },
  labelDesc: {
    color: AppConstants.grayColor,
    fontSize: 20,
    fontWeight: "400",
  },
};
