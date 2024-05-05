import React from "react";
import { Button, Image, ScrollView, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AppConstants } from "../../app.constants";

export const UploadImage = ({ taskImage = [], setTaskImage }) => {
  // const [image, setImage] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      // mediaType: 'photo',
      // maxWidth: 800,
      // maxHeight: 600,
      allowsEditing: true,
      // aspectRatio: { width: 16, height: 9 },
    });

    if (!result.canceled) {
      setTaskImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        color={AppConstants.primaryColor}
        title="Pick an image from camera roll"
        onPress={pickImage}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          {taskImage?.map((el, index) => {
            return (
              <Image
                key={index}
                source={{ uri: el }}
                style={{
                  width: 100,
                  height: 100,
                  overflow: "hidden",
                  borderRadius: 10,
                }}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
