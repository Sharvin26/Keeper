import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "./defaultOptions";
import SettingScreen, {
    screenOptions as settingScreenOptions,
} from "../../screens/settings/SettingScreen";
import CustomizationScreen, {
    screenOptions as customizationScreenOptions,
} from "../../screens/settings/CustomizationScreen";
import SecurityScreen, {
    screenOptions as securityScreenOptions,
} from "../../screens/settings/SecurityScreen";
import HelpScreen, {
    screenOptions as helpScreenOptions,
} from "../../screens/settings/HelpScreen";

const SettingStackNavigator = createStackNavigator();

const SettingStack = () => {
    return (
        <SettingStackNavigator.Navigator screenOptions={defaultOptions}>
            <SettingStackNavigator.Screen
                name="Settings"
                component={SettingScreen}
                options={settingScreenOptions}
            />
            <SettingStackNavigator.Screen
                name="Customize"
                component={CustomizationScreen}
                options={customizationScreenOptions}
            />
            <SettingStackNavigator.Screen
                name="Security"
                component={SecurityScreen}
                options={securityScreenOptions}
            />
            <SettingStackNavigator.Screen
                name="Help"
                component={HelpScreen}
                options={helpScreenOptions}
            />
        </SettingStackNavigator.Navigator>
    );
};

export default SettingStack;
