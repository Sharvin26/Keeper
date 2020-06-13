import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { defaultOptions } from "./defaultOptions";
import WalletScreen from "../../screens/wallet/WalletScreen";
const WallStackNavigator = createStackNavigator();

const WalletStack = () => {
    return (
        <WallStackNavigator.Navigator screenOptions={defaultOptions}>
            <WallStackNavigator.Screen name="Filter" component={WalletScreen} />
        </WallStackNavigator.Navigator>
    );
};

export default WalletStack;
