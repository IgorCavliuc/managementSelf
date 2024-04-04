import {AntDesign} from '@expo/vector-icons'
import {TypeRootStackParamList} from "../../../../navigation/navigation.types";

export interface IMenuItem {
    path: keyof  TypeRootStackParamList
    iconName?: keyof typeof AntDesign.glyphMap
    name?: string
}


export type TypeNav = (name: keyof TypeRootStackParamList) => void