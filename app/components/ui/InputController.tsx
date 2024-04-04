import {Text, TextInput, View} from "react-native";
import {AppConstants} from "../../app.constants";
import {Controller, ControllerProps} from "react-hook-form";
import React, {FC} from "react";

type InputControllerProps = ControllerProps & {
    render: any,
    label: string
}

export const InputController: FC<InputControllerProps> = ({...props}) => {

    return (
        <Controller
            {...props}
            render={({field: {value, onBlur, onChange}, fieldState: {error}}) => (
                <>
                    <Text style={{
                        color: error ? AppConstants.errorColor : AppConstants.grayColor,
                        fontSize: 14,
                        fontWeight: "bold",
                        marginBottom: -10,
                        marginLeft: 3
                    }}>{props.label}</Text>
                    <View style={{
                        alignSelf: 'center',
                        borderColor: error ? AppConstants.errorColor : AppConstants.grayColor,
                        borderStyle: "solid",
                        borderWidth: 1,
                        padding: 10,
                        height: 40,
                        flexDirection: "row",
                        borderRadius: 10
                    }}>
                        <TextInput
                            style={{
                                flex: 1,
                                color: error ? AppConstants.errorColor : AppConstants.grayColor,
                                fontSize: 14,
                                fontWeight: "bold"
                            }}
                            placeholder={props.placecolder}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            autoCapitalize='none'
                        />
                    </View>
                    {error && <Text style={{
                        color: AppConstants.errorColor,
                        fontSize: 14,
                        marginLeft: 3,
                        marginTop: -10,
                    }}>{error.message}</Text>}
                </>
            )}
        />
    )
}