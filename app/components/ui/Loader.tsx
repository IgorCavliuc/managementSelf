import { FC } from "react";
import { ActivityIndicator } from "react-native";
import { AppConstants } from "../../app.constants";

export const Loader: FC = () => {
  return <ActivityIndicator color={AppConstants.grayColor} size="large" />;
};
