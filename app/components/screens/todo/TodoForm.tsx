import { ScrollView, Text, TextInput, View } from "react-native";
import { Button } from "../../ui/Button";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { AppConstants } from "../../../app.constants";
import uuid from "react-native-uuid";
import { SelectDragAndDrop } from "../../ui/SelectDragAndDrop";
import { UploadImage } from "../../ui/UploadImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainLoyaut } from "../../ui/loyaut/MainLoyaut";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "../../ui/DateTimePicker";

export const TodoForm = ({}) => {
  const [stateForm, setStateForm] = useState({
    label: "",
    description: "",
    location: "",
    date: "",
    dateCreate: "",
    timeCreate: "",
    complete: false,
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

  const route = useRoute();
  const taskId = route?.params?.id;

  const navigation = useNavigation();

  useEffect(() => {
    if (taskId) {
      const loadTasks = async () => {
        try {
          const jsonTasks = await AsyncStorage.getItem("@tasks");
          if (jsonTasks !== null) {
            setStateForm(JSON.parse(jsonTasks).find((el) => el._id === taskId));
          }
        } catch (error) {
          console.error("Ошибка загрузки задач:", error);
        }
      };

      loadTasks();

      return () => {
        // Если нужно выполнить какие-то действия при размонтировании, их можно выполнить здесь
      };
    }
  }, []);

  const handleAddTaskValid = async (addStateForm) => {
    let newErrorForm = { ...errorForm };

    if (!addStateForm.label.trim()) {
      newErrorForm.label = true;
    }

    if (!addStateForm.description.trim()) {
      newErrorForm.description = true;
    }

    if (Object.values(newErrorForm).some((error) => error)) {
      setErrorForm(newErrorForm);
    } else {
      const saveTasks = async () => {
        try {
          const nowDate = new Date().toLocaleDateString();
          const nowTime = new Date().toLocaleTimeString();

          const arrayTask = await AsyncStorage.getItem("@tasks");

          let currentArray = JSON.parse(arrayTask) || []; // Если текущий массив пустой, создаем новый массив

          currentArray.unshift({
            ...addStateForm,
            _id: uuid.v4(),
            timeCreate: nowTime,
            dateCreate: nowDate,
          });

          await AsyncStorage.setItem("@tasks", JSON.stringify(currentArray));
        } catch (error) {
          console.error("Ошибка сохранения задач:", error);
        }
      };

      saveTasks();

      navigation.navigate("Todo");
    }
  };

  const handleEditTask = async (editedTask) => {
    try {
      const nowDate = new Date().toLocaleDateString();
      const nowTime = new Date().toLocaleTimeString();
      const jsonTasks = await AsyncStorage.getItem("@tasks");
      const tasks = jsonTasks ? JSON.parse(jsonTasks) : [];

      const updatedTasks = tasks.map((task) => {
        if (task._id === editedTask._id) {
          // Обновляем поля времени и даты создания
          return {
            ...editedTask,
            timeCreate: nowTime,
            dateCreate: nowDate,
          };
        }
        return task;
      });

      await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));

      navigation.navigate("Todo");
    } catch (error) {
      console.error("Error updating task:", error);
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
    <MainLoyaut title={"new task"}>
      <ScrollView
        style={styles.taskAddTool}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
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
              gap: AppConstants.gapSizeMd,
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
            <DateTimePicker
              onChange={(value) => onChange("date", value)}
              mode="calendar"
              value={stateForm.date}
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
            <DateTimePicker
              mode="time"
              value={stateForm.time}
              onChange={(value) => onChange("time", value)}
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
              taskId
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
            {taskId ? "Update" : "Add new task"}
          </Button>
        </View>
      </ScrollView>
    </MainLoyaut>
  );
};

const styles = {
  labelHeader: {
    color: AppConstants.grayColor,
    fontWeight: "bold",
    fontSize: AppConstants.fontSizeSm,
    marginBottom: 5,
  },
  inputNew: (error) => ({
    height: 40,
    borderWidth: 1,
    borderColor: error ? AppConstants.errorColor : AppConstants.grayColor,
    width: "100%",
    borderRadius: 10,
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeSm,
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
    // marginBottom: 20,
  },
  taskAddTool: {
    backgroundColor: AppConstants.darkColor,
  },
  itemContainer: {
    position: "relative",
    marginBottom: AppConstants.gapSizeMd,
  },

  inputContainer: {
    position: "relative",
    marginBottom: 20,
  },
  scrollViewContainer: {
    // paddingTop: 10,
  },
};
