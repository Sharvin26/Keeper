import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
    momentScreenTab,
    walletScreenTab,
    barcodeScreenTab,
} from "../tab/AppTab";
import { defaultDrawerContentOptions } from "./defaultOptions";
import { defaultOptions } from "../drawer/defaultOptions";

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Moments"
            drawerContentOptions={defaultDrawerContentOptions}
        >
            <Drawer.Screen
                name="Moments"
                component={momentScreenTab}
                options={defaultOptions.bind(this, "Moments", "md-photos")}
            />
            <Drawer.Screen
                name="Wallet"
                component={walletScreenTab}
                options={defaultOptions.bind(this, "Wallet", "ios-wallet")}
            />
            <Drawer.Screen
                name="Barcode"
                component={barcodeScreenTab}
                options={defaultOptions.bind(
                    this,
                    "Barcode Scanner",
                    "ios-barcode"
                )}
            />
        </Drawer.Navigator>
    );
};

export default AppDrawer;
