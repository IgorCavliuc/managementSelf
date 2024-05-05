import {
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppConstants } from "../../../app.constants";
import { Button } from "../Button";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export const MainLoyaut = ({
  children,
  style,
  goBack = true,
  title,
  headerChildren,
}: any) => {
  const { top } = useSafeAreaInsets();

  const navigation = useNavigation();

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
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
              marginBottom: AppConstants.gapSizeMd,
              width: "100%",
            }}
          >
            {goBack && (
              <Button
                onPress={() => navigation.goBack()}
                style={{
                  backgroundColor: "transparent",
                  borderRadius: 50,
                  width: 50,
                  zIndex: 100,
                }}
              >
                <AntDesign
                  name="leftcircleo"
                  size={26}
                  color={AppConstants.grayColor}
                />
              </Button>
            )}
            <Text
              style={{
                fontSize: AppConstants.fontSizeMd,
                fontWeight: "600",
                color: AppConstants.grayColor,
                textTransform: "uppercase",
              }}
            >
              {title}
            </Text>
            {headerChildren && (
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  height: "100%",
                }}
              >
                {headerChildren}
              </View>
            )}
          </View>
        )}
        {children}
      </View>
    </SafeAreaView>
  );
};
