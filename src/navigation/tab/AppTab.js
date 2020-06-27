import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import KeeperStack from "../stacks/KeeperStack";
import UserStack from "../stacks/UserStack";
import { defaultScreenOptions, defaultTabBarOptions } from "./defaultOptions";
import WalletStack from "../stacks/WalletStack";

const TabNavigator = createBottomTabNavigator();

export const momentScreenTab = () => {
    return (
        <TabNavigator.Navigator
            screenOptions={defaultScreenOptions}
            tabBarOptions={defaultTabBarOptions}
        >
            <TabNavigator.Screen name="Moments" component={KeeperStack} />
            <TabNavigator.Screen name="User" component={UserStack} />
        </TabNavigator.Navigator>
    );
};

export const walletScreenTab = () => {
    return (
        <TabNavigator.Navigator
            screenOptions={defaultScreenOptions}
            tabBarOptions={defaultTabBarOptions}
        >
            <TabNavigator.Screen name="Wallet" component={WalletStack} />
            <TabNavigator.Screen name="User" component={UserStack} />
        </TabNavigator.Navigator>
    );
};
