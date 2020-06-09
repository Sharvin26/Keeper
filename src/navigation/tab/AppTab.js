import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import KeeperStack from "../stacks/KeeperStack";
import UserStack from "../stacks/UserStack";
import { defaultScreenOptions, defaultTabBarOptions } from "./defaultOptions";

const TabNavigator = createBottomTabNavigator();

const AppTab = () => {
    return (
        <TabNavigator.Navigator
            screenOptions={defaultScreenOptions}
            tabBarOptions={defaultTabBarOptions}
        >
            <TabNavigator.Screen name="Home" component={KeeperStack} />
            <TabNavigator.Screen name="User" component={UserStack} />
        </TabNavigator.Navigator>
    );
};

export default AppTab;
