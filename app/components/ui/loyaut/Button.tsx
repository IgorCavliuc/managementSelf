import {FC, PropsWithChildren} from "react";
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {AppConstants} from "../../../app.constants";

interface ButtonProps extends PropsWithChildren<any> {
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<ViewStyle>;
}

export const Button: FC<ButtonProps> = ({children, textStyle, style, ...rest}) => {
    return (
        <Pressable
            style={[styles.button, style]}
            {...rest}
        >
            <View style={{flex: 1}}>
                <Text style={[styles.text, textStyle]}>{children}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        backgroundColor: AppConstants.primaryColor,
        padding: 10,
        height: 40,
        flexDirection: 'row',
        borderRadius: 10
    },
    text: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        textAlign: 'center'
    }
});
