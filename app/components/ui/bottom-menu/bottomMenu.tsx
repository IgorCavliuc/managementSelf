import { FC } from "react";
import { View } from "react-native"; // Добавлен импорт компонента Text из react-native
import { TypeNav } from "./menu.interface";
import { menuData } from "./menu.data";
import { MenuItem } from "./MenuItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppConstants } from "../../../app.constants";

interface IBottomMenu {
  nav: TypeNav;
  currentRoute: string | undefined;
}

export const BottomMenu: FC<IBottomMenu> = (props) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingBottom: bottom,
        paddingTop: 10,
        justifyContent: "space-around",
        flexDirection: "row",
        backgroundColor: AppConstants.darkColor,
      }}
    >
      {menuData
        .filter((el) => el.path !== "Auth")
        .map((item, index) => (
          <MenuItem key={item.path} item={item} {...props} />
        ))}
    </View>
  );
};
