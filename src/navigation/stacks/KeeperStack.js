import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "./defaultOptions";
import KeepersScreen, {
    screenOptions as keepersScreenOptions,
} from "../../screens/keeper/KeepersScreen";
import KeeperDetailsScreen, {
    screenOptions as KeeperScreenOption,
} from "../../screens/keeper/KeeperDetailsScreen";
import KeeperManageScreen from "../../screens/keeper/KeeperManageScreen";
import KeeperSearchScreen from "../../screens/keeper/KeeperSearchScreen";
import KeeperImageScreen from "../../screens/keeper/KeeperImageScreen";

const KeeperStackNavigator = createStackNavigator();

const KeeperStack = () => {
    return (
        <KeeperStackNavigator.Navigator screenOptions={defaultOptions}>
            <KeeperStackNavigator.Screen
                name="Keepers"
                component={KeepersScreen}
                options={keepersScreenOptions}
            />
            <KeeperStackNavigator.Screen
                name="KeeperDetail"
                component={KeeperDetailsScreen}
                options={KeeperScreenOption}
            />
            <KeeperStackNavigator.Screen
                name="ManageKeeper"
                component={KeeperManageScreen}
            />
            <KeeperStackNavigator.Screen
                name="SearchKeeper"
                component={KeeperSearchScreen}
            />
            <KeeperStackNavigator.Screen
                name="KeeperImage"
                component={KeeperImageScreen}
            />
        </KeeperStackNavigator.Navigator>
    );
};

export default KeeperStack;
