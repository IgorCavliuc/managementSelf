import React, { FC, useEffect, useState } from "react";
import { MainLoyaut } from "../../ui/loyaut/MainLoyaut";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppConstants } from "../../../app.constants";
import { Button } from "../../ui/loyaut/Button";
import { AntDesign } from "@expo/vector-icons";
import { TodoForm } from "./TodoForm";
import { TodoView } from "./TodoView";

export const Todo: FC = () => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState();
  const [taskViewId, setTaskViewId] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonTasks = await AsyncStorage.getItem("@tasks");
        if (jsonTasks !== null) {
          setTasks(JSON.parse(jsonTasks));
        }
      } catch (error) {
        console.error("Ошибка загрузки задач:", error);
      }
    };

    loadTasks();

    return () => {
      // Если нужно выполнить какие-то действия при размонтировании, их можно выполнить здесь
    };
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Ошибка сохранения задач:", error);
      }
    };

    saveTasks();
  }, [tasks]);

  const handleAddTask = (task) => {
    if (task) {
      setTasks((prevState) => [...prevState, task]);
      setVisibleModal(false);
    }
  };

  const handleEditTask = (editedTask) => {
    const updatedTasks = tasks.map((task) => {
      if (task._id === editedTask._id) {
        return editedTask;
      }
      return task;
    });

    setTasks(updatedTasks);
    setVisibleModal(false);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <TouchableOpacity
        onPress={() => {
          setTaskViewId(item._id);
        }}
        style={{
          flexDirection: "column",
          flex: 1,
          maxHeight: 55,
          overflow: "hidden",
          // borderColor: AppConstants.grayColor,
          // borderStyle: "solid",
          // borderBottomWidth: 1,
          // paddingBottom: 10,
        }}
      >
        <Text style={styles.itemListLabel}>
          {item.label}{" "}
          {item?.url || item?.image || item?.link ? (
            <AntDesign
              name="paperclip"
              size={16}
              color={AppConstants.grayColor}
            />
          ) : null}
        </Text>
        <Text style={styles.itemListDescription}>{item.description}</Text>
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
          <AntDesign name="delete" size={16} color={AppConstants.errorColor} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <MainLoyaut title="Todo">
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 40,
          width: "full",
          gap: AppConstants.primaryGap,
          marginTop: AppConstants.primaryGap,
        }}
      >
        <TextInput
          style={{
            borderColor: AppConstants.grayColor,
            borderStyle: "solid",
            borderWidth: 1,
            padding: 10,
            height: 40,
            borderRadius: 10,
            color: AppConstants.grayColor,
            fontSize: 14,
            fontWeight: "bold",
            flex: 1,
          }}
          placeholder="Enter text"
        >
          <AntDesign name="search1" size={26} color={AppConstants.grayColor} />
        </TextInput>
        <Button
          style={{
            width: 40,
            padding: 0,
            alignItems: "center",
            backgroundColor: AppConstants.primaryColor,
            borderWidth: 1,
          }}
        >
          {" "}
          <AntDesign name="ellipsis1" size={26} color="white" />
        </Button>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.container}>
        <TodoView
          setTaskViewId={setTaskViewId}
          setVisibleModal={setVisibleModal}
          taskView={tasks.find((el) => el._id === taskViewId)}
          setEditTask={setEditTask}
        />
        <TodoForm
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          handleAddTask={handleAddTask}
          handleEditTask={handleEditTask}
          editTask={tasks.find((el) => el._id === editTask)}
          setEditTask={setEditTask}
        />

        <Button style={styles.addButton} onPress={() => setVisibleModal(true)}>
          <AntDesign name="plus" size={26} color="white" />
        </Button>
      </View>
    </MainLoyaut>
  );
};

const styles = {
  label: {
    color: AppConstants.grayColor,
    fontSize: 14,
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
    fontSize: 14,
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
    fontSize: 14,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  heading: {
    fontSize: 30,
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
    // marginBottom: 15,
    // paddingBottom: 10,
    height: 40,
    color: AppConstants.grayColor,
    fontSize: 18,
    marginTop: AppConstants.primaryGap,
    gap: AppConstants.primaryGap,
  },
  itemListLabel: {
    color: AppConstants.grayColor,
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
  itemListDescription: {
    color: AppConstants.grayColor,
    fontSize: 14,
  },
  taskButtons: {
    flexDirection: "row",
    gap: AppConstants.primaryGap,
  },
};
