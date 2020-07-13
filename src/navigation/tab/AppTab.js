import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { defaultScreenOptions, defaultTabBarOptions } from "./defaultOptions";
import MomentStack from "../stacks/MomentStack";
import WalletStack from "../stacks/WalletStack";
import BarcodeStack from "../stacks/BarcodeStack";
import SearchScreen from "../../screens/searchbar/SearchScreen";

const TabNavigator = createBottomTabNavigator();

export const momentScreenTab = () => {
    return (
        <TabNavigator.Navigator
            screenOptions={defaultScreenOptions}
            tabBarOptions={defaultTabBarOptions}
        >
            <TabNavigator.Screen name="Moments" component={MomentStack} />
            <TabNavigator.Screen name="Search" component={SearchScreen} />
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
            <TabNavigator.Screen name="Search" component={SearchScreen} />
        </TabNavigator.Navigator>
    );
};

export const barcodeScreenTab = () => {
    return (
        <TabNavigator.Navigator
            screenOptions={defaultScreenOptions}
            tabBarOptions={defaultTabBarOptions}
        >
            <TabNavigator.Screen name="Barcode" component={BarcodeStack} />
            <TabNavigator.Screen name="Search" component={SearchScreen} />
        </TabNavigator.Navigator>
    );
};
