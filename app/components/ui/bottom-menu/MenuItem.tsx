import React, { FC } from "react";
import { IMenuItem, TypeNav } from "./menu.interface";
import { Pressable, Text, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AppConstants } from "../../../app.constants";

interface IMenuItemProps {
  item: IMenuItem;
  nav: TypeNav;
  currentRoute: string | number | undefined; // Замените string на string | number | undefined
}

export const MenuItem: FC<IMenuItemProps> = ({ currentRoute, nav, item }) => {
  const isActive = currentRoute === item.path;

  return (
    <TouchableWithoutFeedback>
      <Pressable
        key={item.path}
        onPress={() => nav(item.path)}
        style={{
          alignItems: "center",
        }}
      >
        <AntDesign
          name={item.iconName as string}
          size={26}
          color={isActive ? AppConstants.primaryColor : AppConstants.grayColor}
        />
        <Text
          style={{
            color: isActive
              ? AppConstants.primaryColor
              : AppConstants.grayColor,
            paddingTop: 3,
          }}
        >
          {item.path}
        </Text>
      </Pressable>
    </TouchableWithoutFeedback>
  );
};
