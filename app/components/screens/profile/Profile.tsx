import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { MainLoyaut } from "../../ui/loyaut/MainLoyaut";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../ui/loyaut/Button";
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

  return (
    <MainLoyaut title="Profile">
      <Button
        style={styles.button}
        textStyle={{
          color: !edite ? AppConstants.primaryColor : "white",
          alignSelf: "flex-end",
        }}
        onPress={edite ? handleSave : () => setEdite(true)}
      >
        {edite ? "Save my new data" : "Edit my data"}
      </Button>
      {arrayprofileData.map((el, index) => (
        <View
          key={index}
          style={{
            flexDirection: "column",
            marginBottom: AppConstants.primaryGap,
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
        style={{ marginTop: "auto", marginBottom: AppConstants.primaryGap }}
        onPress={() => setUser({} as IUser)}
      >
        LogOut
      </Button>
    </MainLoyaut>
  );
};

const styles = {
  label: {
    color: AppConstants.grayColor,
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: "bold",
    opacity: edite ? 1 : 0.3,
  }),
  button: {
    backgroundColor: "transparent",
  },
};
