import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "./defaultOptions";
import UserScreen, {
    screenOptions as UserScreenOptions,
} from "../../screens/user/UserScreen";

const UserStackNavigator = createStackNavigator();

const UserStack = () => {
    return (
        <UserStackNavigator.Navigator screenOptions={defaultOptions}>
            <UserStackNavigator.Screen
                name="Users"
                component={UserScreen}
                options={UserScreenOptions}
            />
        </UserStackNavigator.Navigator>
    );
};

export default UserStack;
