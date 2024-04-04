import {IRoute} from "./navigation.types";
import {Auth, Finance, Home, Profile, Settings, Todo} from "../components/screens";

export const routes: IRoute[] = [
    {
        name: 'Settings',
        component: Settings,
        path: 'Settings',
        iconName: 'setting'
    },
    {
        name: 'Home',
        component: Home,
        path: 'Home',
        iconName: 'home'
    },
    {
        name: 'Profile',
        component: Profile,
        path: 'Profile',
        iconName: 'user'
    },
    {
        name: 'Todo',
        component: Todo,
        path: 'Todo',
        iconName: 'bars'
    },
    {
        name: 'Finance',
        component: Finance,
        path: 'Finance',
        iconName: 'wallet'
    },
    {
        name: 'Auth',
        component: Auth,
        path: 'Auth',
        iconName: 'lock1'
    },
]