import React, {FC, useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth";
import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import {BottomMenu} from "../components/ui/loyaut/bottom-menu/bottomMenu";
import {PrivateNavigation} from "./PrivateNavigation";

export const Navigation: FC = () => {
    const {user} = useAuth();
    const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined);
    const navRef = useNavigationContainerRef();

    useEffect(() => {
        if (navRef) {
            setCurrentRoute(navRef.getCurrentRoute()?.name);
            const listener = navRef.addListener('state', () => setCurrentRoute(navRef.getCurrentRoute()?.name));
            return () => {
                navRef.removeListener('state', listener);
            };
        }
    }, [navRef]);

    return (
        <>
            <NavigationContainer ref={navRef}>
                <PrivateNavigation/>
            </NavigationContainer>
            {!!Object.keys(user).length && currentRoute && navRef ? (
                <BottomMenu
                    nav={navRef.navigate}
                    currentRoute={currentRoute}
                />
            ) : null}
        </>
    );
};
