import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import KeeperFilterScreen from "../../screens/keeper/KeeperFilterScreen";
import { defaultOptions } from "./defaultOptions";

const FilterStackNavigator = createStackNavigator();

const FilterStack = () => {
    return (
        <FilterStackNavigator.Navigator screenOptions={defaultOptions}>
            <FilterStackNavigator.Screen
                name="Filter"
                component={KeeperFilterScreen}
            />
        </FilterStackNavigator.Navigator>
    );
};

export default FilterStack;
