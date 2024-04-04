import {FC} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {TypeRootStackParamList} from "./navigation.types";
import {useAuth} from "../hooks/useAuth";
import {routes} from "./routes";
import {Auth} from "../components/screens";
import {AppConstants} from "../app.constants";

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

export const PrivateNavigation: FC = () => {
    const {user} = useAuth();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: AppConstants.darkColor
                }
            }}
        >
            {!!Object.keys(user).length ? (
                routes.map(route => (
                    <Stack.Screen
                        key={route.name}
                        name={route.name}
                        component={route.component}
                    />
                ))
            ) : (
                <Stack.Screen name="Auth" component={Auth}/>
            )}
        </Stack.Navigator>
    );
};