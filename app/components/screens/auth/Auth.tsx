import React, {FC, useState} from "react";
import {Keyboard, Pressable, Text, TouchableWithoutFeedback, View} from "react-native";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthFormData} from "../../../types/auth.interface";
import {useAuth} from "../../../hooks/useAuth";
import {AppConstants} from "../../../app.constants";
import {Loader} from "../../ui/loyaut/Loader";
import {Button} from "../../ui/loyaut/Button";
import {Signup} from "./Signup";
import {Signin} from "./Signin";
import {useNavigation} from "@react-navigation/native";

export const Auth: FC = () => {
    const [isReg, setIsReg] = useState(false);
    const {control, reset, handleSubmit, watch} = useForm<IAuthFormData>({mode: "onChange"});
    const {setUser} = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation(); // Получаем объект навигации

    const onSubmit: SubmitHandler<IAuthFormData> = async (data) => {

        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setUser({_id: "", ...data});
        reset();
        setIsLoading(false);

        navigation.navigate('Home'); // Замените 'OtherPage' на имя вашего экрана
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{alignItems: 'center', justifyContent: "center", flex: 1, padding: 50}}>
                <View style={{gap: AppConstants.primaryGap}}>
                    <Text
                        style={{color: AppConstants.grayColor, fontSize: 30, fontWeight: "bold", textAlign: 'center'}}>
                        {isReg ? "Sign up" : "Sign in"}
                    </Text>
                    {isLoading ? (
                        <Loader/>
                    ) : (
                        <>
                            {!isReg ?
                                <Signin control={control}/>
                                : <Signup control={control} watch={watch}/>}
                            <Button onPress={handleSubmit(onSubmit)}>Let's go</Button>
                        </>
                    )}
                    <Pressable onPress={() => setIsReg(!isReg)}>
                        <Text style={{color: AppConstants.grayColor}}>{isReg ? "SignIn" : "SignUp"}</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};
