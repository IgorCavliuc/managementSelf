import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { MainLoyaut } from "../../ui/loyaut/MainLoyaut";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../ui/Button";
import { IUser } from "../../../types/user.interface";
import { AppConstants } from "../../../app.constants";

export const Profile = () => {
  const { user, setUser } = useAuth();
  const [edite, setEdite] = useState(false);
  const [editeUserData, setEditeUserData] = useState(user);

  const arrayprofileData = [
    { label: "First name", name: "firstname" },
    { label: "Sure name", name: "surename" },
    { label: "Email", name: "email" },
    { label: "Phone", name: "phone" },
  ];

  const handleSave = () => {
    setUser(editeUserData);
    setEdite(false);
  };
  const changeData = (
    <Button
      style={styles.button(edite)}
      textStyle={{
        color: !edite ? AppConstants.primaryColor : AppConstants.grayColor,
        alignSelf: "flex-end",
      }}
      onPress={edite ? handleSave : () => setEdite(true)}
    >
      {edite ? "Save" : "Edit"}
    </Button>
  );

  return (
    <MainLoyaut title="Profile" headerChildren={changeData}>
      {arrayprofileData.map((el, index) => (
        <View
          key={index}
          style={{
            flexDirection: "column",
            marginBottom: AppConstants.gapSizeMd,
          }}
        >
          <Text style={styles.label}>{el.label}</Text>
          <TextInput
            style={styles.input(edite)}
            onChangeText={(inputText) => {
              setEditeUserData((prevState) => ({
                ...prevState,
                [el.name]: inputText,
              }));
            }}
            editable={edite}
            value={editeUserData[el.name]}
            placeholder="Enter text"
          />
        </View>
      ))}
      <Button
        style={{
          marginTop: "auto",
          marginBottom: AppConstants.gapSizeMd,
        }}
        onPress={() => setUser({} as IUser)}
      >
        Logout
      </Button>
    </MainLoyaut>
  );
};

const styles = {
  label: {
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeSm,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  input: (edite) => ({
    borderColor: AppConstants.grayColor,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    height: 40,
    borderRadius: 10,
    color: AppConstants.grayColor,
    fontSize: AppConstants.fontSizeSm,
    fontWeight: "bold",
    opacity: edite ? 1 : 0.3,
  }),
  button: (edite) => ({
    borderColor: !edite ? AppConstants.primaryColor : AppConstants.grayColor,
    backgroundColor: "transparent",
    borderWidth: 1,
    // width: 50,
    paddingLeft: 10,
    paddingRight: 10,
  }),
};
