import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AppTab from "../tab/AppTab";
import { defaultDrawerContentOptions } from "./defaultOptions";
import { defaultOptions } from "../drawer/defaultOptions";
import WalletStack from "../stacks/FilterStack";

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
                options={defaultOptions.bind(this, "Moments", "md-photos")}
            />
            <Drawer.Screen
                name="Wallet"
                component={WalletStack}
                options={defaultOptions.bind(this, "Wallet", "ios-wallet")}
            />
        </Drawer.Navigator>
    );
};

export default AppDrawer;
