import React from "react";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
    momentScreenTab,
    walletScreenTab,
    barcodeScreenTab,
} from "../tab/AppTab";
import SettingStack from "../stacks/SettingStack";
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
                options={defaultOptions.bind(
                    this,
                    "Moments",
                    Platform.OS === "android" ? "md-images" : "ios-images"
                )}
            />
            <Drawer.Screen
                name="Wallet"
                component={walletScreenTab}
                options={defaultOptions.bind(
                    this,
                    "Wallet",
                    Platform.OS === "android" ? "md-wallet" : "ios-wallet"
                )}
            />
            <Drawer.Screen
                name="Barcode"
                component={barcodeScreenTab}
                options={defaultOptions.bind(
                    this,
                    "Barcode Scanner",
                    Platform.OS === "android" ? "md-barcode" : "ios-barcode"
                )}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingStack}
                options={defaultOptions.bind(
                    this,
                    "Settings",
                    Platform.OS === "android" ? "md-settings" : "ios-settings"
                )}
            />
        </Drawer.Navigator>
    );
};

export default AppDrawer;
