import {ComponentType} from "react";
import {AntDesign} from "@expo/vector-icons";

export type TypeRootStackParamList = {
    Auth: undefined;
    Profile: undefined;
    Settings: undefined;
    Home: undefined;
    Todo: undefined;
    Finance: undefined;
}

export interface IRoute {
    name: keyof TypeRootStackParamList;
    component: ComponentType;
    path: keyof TypeRootStackParamList
    iconName?: keyof typeof AntDesign.glyphMap
}
