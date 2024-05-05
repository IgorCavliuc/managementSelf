import { ComponentType } from "react";
import { AntDesign } from "@expo/vector-icons";

export type TypeRootStackParamList = {
  Auth: undefined;
  Profile: undefined;
  Settings: undefined;
  Home: undefined;
  Todo: undefined;
  Finance: undefined;
};

export interface IRoute {
  name: keyof TypeRootStackParamList | string;
  component: any;
  path: keyof TypeRootStackParamList | string;
  iconName?: keyof typeof AntDesign.glyphMap;
}
