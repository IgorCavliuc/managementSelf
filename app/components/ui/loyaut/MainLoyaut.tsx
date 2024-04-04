import { Platform, SafeAreaView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppConstants } from "../../../app.constants";

export const MainLoyaut = ({ children, style, title }: any) => {
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? top / 5 : top * 1.6,
        backgroundColor: AppConstants.darkColor,
        ...style,
      }}
    >
      <View
        style={{
          flex: 1,

          margin: 10,
        }}
      >
        {title && (
          <Text
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: AppConstants.grayColor,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {title}
          </Text>
        )}
        {children}
      </View>
    </SafeAreaView>
  );
};
