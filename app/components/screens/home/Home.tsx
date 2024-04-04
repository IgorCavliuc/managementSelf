import {FC} from "react";
import {Text} from "react-native";
import {MainLoyaut} from "../../ui/loyaut/MainLoyaut";
import {useAuth} from "../../../hooks/useAuth";
import {AppConstants} from "../../../app.constants";

export const Home: FC = () => {

    const {user} = useAuth()
    return (
        <MainLoyaut>
            <Text style={{
                fontSize: 30,
                fontWeight: 600,
                color: AppConstants.grayColor,
                marginTop: AppConstants.primaryGap
            }}>Hello, {user?.firstname}</Text>
        </MainLoyaut>
    )
}