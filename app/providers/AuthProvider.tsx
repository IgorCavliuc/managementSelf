import * as Splash from 'expo-splash-screen'
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useState} from "react";
import {IUser} from "../types/user.interface";

export type TypeUserState = IUser | null

interface IContext {
    user: TypeUserState
    setUser: Dispatch<SetStateAction<TypeUserState>>
}

export const AuthContext = createContext({} as IContext)

let ignore = Splash.preventAutoHideAsync()

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {

    const [user, setUser] = useState<TypeUserState>({
        "_id": "",
        "confirmpassword": "Persik12022000",
        "email": "cavliuc.serv@gmail.com",
        "firstname": "Igor",
        "password": "Persik12022000",
        "surename": "Cavliuc",
        "phone": "+37367732092"
    })

    useEffect(() => {
        let isMount = false
        const getUserFromStorage = async () => {
            if (isMount) {
                //get user from async storage and write to
            }
            await Splash.hideAsync()
        }

        let ignore = getUserFromStorage()

        return () => {
            isMount = false
        }

    }, [])

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}