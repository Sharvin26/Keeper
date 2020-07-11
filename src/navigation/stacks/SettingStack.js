import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "./defaultOptions";
import SettingScreen, {
    screenOptions as settingScreenOptions,
} from "../../screens/settings/SettingScreen";

const SettingStackNavigator = createStackNavigator();

const SettingStack = () => {
    return (
        <SettingStackNavigator.Navigator screenOptions={defaultOptions}>
            <SettingStackNavigator.Screen
                name="Settings"
                component={SettingScreen}
                options={settingScreenOptions}
            />
        </SettingStackNavigator.Navigator>
    );
};

export default SettingStack;
