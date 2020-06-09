import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import AppTab from "../tab/AppTab";
import FilterStack from "../stacks/FilterStack";
import { defaultDrawerContentOptions } from "./defaultOptions";
import { defaultOptions } from "../drawer/defaultOptions";

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContentOptions={defaultDrawerContentOptions}
        >
            <Drawer.Screen
                name="Home"
                component={AppTab}
                options={defaultOptions.bind(this, "Documents", "ios-albums")}
            />
            <Drawer.Screen
                name="Filter"
                component={FilterStack}
                options={defaultOptions.bind(
                    this,
                    "Filter documents",
                    "ios-build"
                )}
            />
        </Drawer.Navigator>
    );
};

export default AppDrawer;
