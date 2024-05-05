import React, { FC, useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthFormData } from "../../../types/auth.interface";
import { useAuth } from "../../../hooks/useAuth";
import { AppConstants } from "../../../app.constants";
import { Loader } from "../../ui/Loader";
import { Button } from "../../ui/Button";
import { Signup } from "./Signup";
import { Signin } from "./Signin";
import { useNavigation } from "@react-navigation/native";

const db = require("../../../db.json");

export const Auth: FC = () => {
  const [isReg, setIsReg] = useState(false);
  const { control, reset, handleSubmit, watch } = useForm<IAuthFormData>({
    mode: "onChange",
  });
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation(); // Получаем объект навигации

  const onSubmit: SubmitHandler<IAuthFormData> = async (data) => {
    setIsLoading(true);
    if (!isReg) {
      const filterUser = db?.users?.filter((item) => item.email === data.email);
      if (filterUser.length) {
        const checkPassword = filterUser?.[0].password === data.password;

        if (checkPassword) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setUser({ ...filterUser[0] });
          reset();
          navigation.navigate("Home"); // Замените 'OtherPage' на имя вашего экрана
        } else {
          alert("you entered the wrong password for account " + data.email);
        }
      } else {
        alert("We did not find such an account, please register");
      }
    } else {
      alert("resцукуц");
    }
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // setUser({ _id: "", ...data });
    // reset();
    //
    // navigation.navigate("Home"); // Замените 'OtherPage' на имя вашего экрана
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          padding: 50,
        }}
      >
        <View style={{ gap: AppConstants.gapSizeMd }}>
          <Text
            style={{
              color: AppConstants.grayColor,
              fontSize: AppConstants.fontSizeLg,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {isReg ? "Sign up" : "Sign in"}
          </Text>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!isReg ? (
                <Signin control={control} />
              ) : (
                <Signup control={control} watch={watch} />
              )}
              <Button onPress={handleSubmit(onSubmit)}>Let's go</Button>
              <Pressable onPress={() => setIsReg(!isReg)}>
                <Text style={{ color: AppConstants.grayColor }}>
                  {isReg ? "SignIn" : "SignUp"}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
