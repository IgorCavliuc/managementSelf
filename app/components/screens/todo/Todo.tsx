import React, { FC, useState } from "react";
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
import { Button } from "../../ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

interface Task {
  label: string;
  description: string;
  location: string;
  date: string;
  complete: boolean;
  time: string;
  image: string[];
  url: string;
  tag: string;
}

export const Todo: FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const loadTasks = async () => {
        try {
          const jsonTasks = await AsyncStorage.getItem("@tasks");
          const tasksStorage: Task[] = jsonTasks ? JSON.parse(jsonTasks) : [];
          setTasks(tasksStorage);
        } catch (error) {
          console.error("Ошибка загрузки задач:", error);
        }
      };

      loadTasks();

      setTimeout(loadTasks, 100);

      return () => {};
    }, []),
  );

  const handleDeleteTask = async (index: number) => {
    try {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
      await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
    }
  };

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    const handleToggleTaskState = async (index: number) => {
      try {
        const updatedTasks = [...tasks];
        updatedTasks[index].complete = !updatedTasks[index].complete;
        setTasks(updatedTasks);
        await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));
      } catch (error) {
        console.error("Ошибка изменения состояния задачи:", error);
      }
    };

    return (
      <View style={styles.task}>
        <TouchableOpacity
          onPress={() => handleToggleTaskState(index)} // Вызывается функция handleToggleTaskState с индексом текущей задачи
          style={{
            height: 20,
            width: 20,
            borderRadius: 5,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: AppConstants.grayColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item?.complete && (
            <AntDesign name="check" size={16} color={AppConstants.grayColor} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TodoView", { id: item._id });
          }}
          style={{
            flexDirection: "column",
            flex: 1,
            maxHeight: 55,
            overflow: "hidden",
          }}
        >
          <Text style={styles.itemListLabel}>
            {item.label}{" "}
            {item.url || item.image || item?.link ? (
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
              navigation.navigate("TodoForm", { id: item._id });
            }}
          >
            <AntDesign
              name="edit"
              size={16}
              style={{
                opacity: 0.6,
              }}
              color={AppConstants.grayColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(index)}>
            <AntDesign name="delete" size={16} color={AppConstants.grayColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <MainLoyaut title="Todo">
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 40,
          width: "full",
          gap: AppConstants.gapSizeMd,
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
          <AntDesign
            name="ellipsis1"
            size={26}
            color={AppConstants.darkColor}
          />
        </Button>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.container}>
        <Button
          style={styles.addButton}
          onPress={() => navigation.navigate("TodoForm")}
        >
          <AntDesign name="plus" size={26} color={AppConstants.darkColor} />
        </Button>
      </View>
    </MainLoyaut>
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
  input: (edite: boolean) => ({
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
    gap: AppConstants.gapSizeSm,
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
