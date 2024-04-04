import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Picker,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Slider = ({ photos }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const { width, height } = Dimensions.get("window");

  const openModal = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal={true}>
        {photos.map((photo, index) => (
          <TouchableOpacity key={index} onPress={() => openModal(index)}>
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200, margin: 10, borderRadius: 10 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0, .8)" }}>
          <TouchableOpacity
            onPress={closeModal}
            style={{ position: "absolute", top: 50, right: 20, zIndex: 1 }}
          >
            <AntDesign name="close" size={26} color="white" />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Picker
              selectedValue={selectedIndex}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedIndex(itemValue)
              }
            >
              {photos.map((photo, index) => (
                <Picker.Item
                  key={index}
                  label={`Image ${index + 1}`}
                  value={index}
                />
              ))}
            </Picker>
            <Image
              source={{ uri: photos?.[selectedIndex] }}
              style={{ width: width, height: height / 2, borderRadius: 10 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Slider;
