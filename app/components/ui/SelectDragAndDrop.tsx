import SelectDropdown from "react-native-select-dropdown";
import { Dimensions, StyleSheet, Text, View } from "react-native"; // Import Dimensions
import { AppConstants } from "../../app.constants";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const SelectDragAndDrop = ({ options, selected, onSelect }) => {
  return (
    <SelectDropdown
      data={options}
      defaultValue={{ title: selected }}
      onSelect={(selectedItem, index) => {
        onSelect(selectedItem.title);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || "Select option"}
            </Text>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: AppConstants.primaryColor }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    flex: 1,
    height: 40,
    backgroundColor: "transparent",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppConstants.grayColor,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: AppConstants.fontSizeSm,
    fontWeight: "500",
    color: AppConstants.grayColor,
  },
  dropdownMenuStyle: {
    backgroundColor: AppConstants.darkColor,
    borderRadius: 8,
    maxHeight: windowHeight / 2,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
    top: windowHeight / 4,
    zIndex: 1,
  },

  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: AppConstants.fontSizeSm,
    fontWeight: "500",
    color: AppConstants.grayColor,
  },
  dropdownItemIconStyle: {
    fontSize: AppConstants.fontSizeMd,
    marginRight: 8,
  },
});
