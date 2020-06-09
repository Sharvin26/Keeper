import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import KeepersScreen, {
    screenOptions as keepersScreenOptions,
} from "../../screens/keeper/KeepersScreen";
import KeeperAddScreen from "../../screens/keeper/KeeperAddScreen";
import { defaultOptions } from "./defaultOptions";
import KeeperSearchScreen from "../../screens/keeper/KeeperSearchScreen";

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
                name="AddKeeper"
                component={KeeperAddScreen}
            />
            <KeeperStackNavigator.Screen
                name="SearchKeeper"
                component={KeeperSearchScreen}
            />
        </KeeperStackNavigator.Navigator>
    );
};

export default KeeperStack;
