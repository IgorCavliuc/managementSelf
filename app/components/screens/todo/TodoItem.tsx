import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AppConstants } from "../../../app.constants";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export const TodoItem = ({ item, index }) => {
  const { label, url, _id, image, link, description } = item;

  const navigation = useNavigation();
  return (
    <View style={styles.task}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("TodoView", { id: _id });
        }}
        style={{
          flexDirection: "column",
          flex: 1,
          maxHeight: 55,
          overflow: "hidden",
        }}
      >
        <Text style={styles.itemListLabel}>
          {label}{" "}
          {url || image || link ? (
            <AntDesign
              name="paperclip"
              size={16}
              color={AppConstants.grayColor}
            />
          ) : null}
        </Text>
        <Text style={styles.itemListDescription}>{description}</Text>
      </TouchableOpacity>
      <View style={styles.taskButtons}>
        <TouchableOpacity
          onPress={() => {
            setVisibleModal(true);
            setEditTask(item._id);
          }}
        >
          <AntDesign name="edit" size={16} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <AntDesign
            name="delete"
            size={16}
            style={{
              opacity: "0.6",
            }}
            color={AppConstants.grayColor}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  label: {
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeSm,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  input: (edite) => ({
    borderColor: AppConstants.grayColor,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    height: 40,
    borderRadius: 10,
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeSm,
    fontWeight: "bold",
    opacity: edite ? 1 : 0.3,
  }),
  inputNew: {
    borderColor: AppConstants.grayColor,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeSm,
    fontWeight: "bold",
    backgroundColor: "transparent",
    height: 30,
    // flex: 1,
  },
  button: {
    backgroundColor: "transparent",
  },

  container: {
    flexDirection: "row",
  },
  title: {
    fontSize: AppConstants.fontSizeMd,
    fontWeight: "bold",
    marginBottom: 20,
  },
  heading: {
    fontSize: AppConstants.fontSizeLg,
    fontWeight: "bold",
    marginBottom: 7,
    color: "green",
  },
  addButton: {
    alignItems: "center",
    borderRadius: 50,
    height: 60,
    width: 60,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: 20,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    fontSize: AppConstants.fontSizeSm,
    marginTop: AppConstants.gapSizeMd,
    gap: AppConstants.gapSizeMd,
  },
  itemListLabel: {
    color: AppConstants.grayColor,
    fontWeight: "bold",
    fontSize: AppConstants.fontSizeSm,
    marginBottom: 5,
  },
  itemListDescription: {
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeSm,
  },
  taskButtons: {
    flexDirection: "row",
    gap: AppConstants.gapSizeMd,
  },
};
