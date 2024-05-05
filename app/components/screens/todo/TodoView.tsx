import { Modal, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MainLoyaut } from "../../ui/loyaut/MainLoyaut";
import { Button } from "../../ui/Button";
import { AppConstants } from "../../../app.constants";
import { AntDesign } from "@expo/vector-icons";
import Slider from "../../ui/Slider";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from "../../../../App";

export const TodoView = () => {
  const navigation = useNavigation();
  const [task, setTask] = useState({});

  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const jsonTasks = await AsyncStorage.getItem("@tasks");
        if (jsonTasks !== null) {
          setTask(JSON.parse(jsonTasks).find((el) => el._id === id));
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

  const images = task?.image;
  return (
    <MainLoyaut
      title="Task View"
      headerChildren={
        <Button
          onPress={() => navigation.navigate("TodoForm", { id: id })}
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
      }
    >
      <ScrollView>
        <View>
          {task?.dateCreate || task?.timeCreate ? (
            <Text style={styles.createTask}>
              create or update: {task?.dateCreate} in {task?.timeCreate}
            </Text>
          ) : null}
          <Text style={styles.labelHead}>{task?.label}</Text>
          <Text
            style={[styles.labelDesc, { marginBottom: AppConstants.gapSizeSm }]}
          >
            {task?.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: AppConstants.gapSizeSm,
              marginBottom: 0,
            }}
          >
            {task?.date && (
              <Text style={styles.labelDesc}>
                <Text style={{ fontWeight: "bold", opacity: 0.6 }}>Date:</Text>{" "}
                {task?.date}
              </Text>
            )}
            {task?.time && (
              <Text style={styles.labelDesc}>
                <Text style={{ fontWeight: "bold", opacity: 0.6 }}>Time:</Text>{" "}
                {task?.time}
              </Text>
            )}
          </View>
          {task?.location && (
            <Text style={[styles.labelDesc, { marginBottom: 10 }]}>
              <Text style={{ fontWeight: "bold", opacity: 0.6 }}>
                Location:{" "}
              </Text>
              {task?.location}
            </Text>
          )}
          <Slider photos={images} />
        </View>
      </ScrollView>
    </MainLoyaut>
  );
};

const styles = {
  labelHead: {
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeMd,
    fontWeight: "bold",
    marginBottom: AppConstants.gapSizeSm,
  },
  labelDesc: {
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeSm,
  },
  createTask: {
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeSm,
    marginBottom: AppConstants.gapSizeLg,
    opacity: 0.7,
  },
};
