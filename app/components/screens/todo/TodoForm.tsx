import { Modal, ScrollView, Text, TextInput, View } from "react-native";
import { Button } from "../../ui/loyaut/Button";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { AppConstants } from "../../../app.constants";
import uuid from "react-native-uuid";
import { SelectDragAndDrop } from "../../ui/loyaut/SelectDragAndDrop";
import { UploadImage } from "../../ui/loyaut/UploadImage";

export const TodoForm = ({
  visibleModal,
  setVisibleModal,
  handleAddTask,
  handleEditTask,
  editTask,
  setEditTask,
}) => {
  const [stateForm, setStateForm] = useState({
    label: "",
    description: "",
    location: "",
    date: "",
    time: "",
    image: [],
    url: "",
    tag: "Famally",
  });

  const [errorForm, setErrorForm] = useState({
    label: "",
    description: "",
    location: "",
    date: "",
    time: "",
    image: "",
    url: "",
    tag: "",
  });

  useEffect(() => {
    if (editTask && visibleModal) setStateForm(editTask);
  }, [editTask, visibleModal]);
  const handleAddTaskValid = (task) => {
    let newErrorForm = { ...errorForm };

    if (!task?.label?.trim()) {
      newErrorForm.label = true;
    }

    if (!task?.description?.trim()) {
      newErrorForm.description = true;
    }

    if (Object.values(newErrorForm).some((error) => error)) {
      setErrorForm(newErrorForm);
    } else {
      handleAddTask({ ...task, _id: uuid.v4() });
      setStateForm({});
      setErrorForm({});
    }
  };

  const optionTag = [
    { title: "Family" },
    { title: "Work" },
    { title: "Spirit" },
    { title: "Other" },
  ];

  const onChange = (name, value) => {
    setErrorForm({});
    setStateForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Modal visible={visibleModal}>
      <ScrollView
        style={styles.taskAddTool}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.addButtonWrapper}>
          <Button
            style={{ flex: 1, backgroundColor: AppConstants.grayColor }}
            onPress={() => {
              setVisibleModal(false);
              setStateForm({});
              setErrorForm({});
              setEditTask({});
            }}
            style={{
              backgroundColor: "transparent",
              alignItems: "center",
              borderRadius: 50,
              width: 50,
            }}
          >
            <AntDesign
              name="leftcircleo"
              size={26}
              color={AppConstants.grayColor}
            />
          </Button>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: AppConstants.grayColor,
              textTransform: "uppercase",
              position: "absolute",
              left: "25%",
            }}
          >
            Add new task
          </Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.labelHeader}>Label</Text>
          <TextInput
            style={styles.inputNew(errorForm.label)}
            value={stateForm.label}
            onChangeText={(value) => onChange("label", value)}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.labelHeader}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={[
              styles.inputNew(errorForm.description),
              styles.inputDescription,
            ]}
            value={stateForm.description}
            onChangeText={(value) => onChange("description", value)}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.labelHeader}>
            Tag{" "}
            <AntDesign name="tags" size={16} color={AppConstants.grayColor} />
          </Text>
          <SelectDragAndDrop
            selected={stateForm.tag}
            onSelect={(select) => onChange("tag", select)}
            options={optionTag}
          />
        </View>
        <View
          style={[
            styles.itemContainer,
            {
              flexDirection: "row",
              flex: 1,
              gap: AppConstants.primaryGap,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.labelHeader}>
              Date{" "}
              <AntDesign
                name="calendar"
                size={16}
                color={AppConstants.grayColor}
              />
            </Text>
            <TextInput
              style={styles.inputNew(errorForm.date)}
              value={stateForm.date}
              onChangeText={(value) => onChange("date", value)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.labelHeader}>
              Time{" "}
              <AntDesign
                name="clockcircleo"
                size={16}
                color={AppConstants.grayColor}
              />
            </Text>
            <TextInput
              style={styles.inputNew(errorForm.time)}
              value={stateForm.time}
              onChangeText={(value) => onChange("time", value)}
            />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.labelHeader}>
            Location{" "}
            <AntDesign
              name="enviromento"
              size={16}
              color={AppConstants.grayColor}
            />
          </Text>
          <TextInput
            style={styles.inputNew(errorForm.location)}
            value={stateForm.location}
            onChangeText={(value) => onChange("location", value)}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.labelHeader}>
            URL{" "}
            <AntDesign name="link" size={16} color={AppConstants.grayColor} />
          </Text>
          <TextInput
            style={styles.inputNew(errorForm.url)}
            value={stateForm.url}
            onChangeText={(value) => onChange("url", value)}
          />
        </View>
        <View style={styles.itemContainer}>
          <UploadImage
            taskImage={stateForm.image}
            setTaskImage={(value) =>
              setStateForm((prevState) => ({
                ...prevState,
                image: [...prevState.image, value],
              }))
            }
          />
        </View>
        <View style={{ marginBottom: 120 }}>
          <Button
            onPress={() => {
              setEditTask({});
              editTask
                ? handleEditTask(stateForm)
                : handleAddTaskValid(stateForm);
            }}
            style={{
              borderColor: AppConstants.primaryColor,

              alignItems: "center",
              borderRadius: 10,
              flex: 1,
            }}
          >
            {editTask ? "Update" : "Add new task"}
          </Button>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = {
  labelHeader: {
    color: AppConstants.grayColor,
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
  inputNew: (error) => ({
    height: 40,
    borderWidth: 1,
    borderColor: error ? AppConstants.errorColor : AppConstants.grayColor,
    width: "100%",
    borderRadius: 10,
    color: AppConstants.grayColor,
    fontSize: 19,
    marginBottom: 5,
    padding: 10,
  }),
  inputDescription: {
    height: 150,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  addButtonWrapper: {
    marginTop: "auto",
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  taskAddTool: {
    backgroundColor: AppConstants.darkColor,
    paddingTop: 50,
    padding: 20,
    paddingBottom: 120,
  },
  itemContainer: {
    position: "relative",
    marginBottom: AppConstants.primaryGap,
  },

  inputContainer: {
    position: "relative",
    marginBottom: 20,
  },
  input: {
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 10,
  },
  scrollViewContainer: {
    paddingTop: 10,
  },
};
