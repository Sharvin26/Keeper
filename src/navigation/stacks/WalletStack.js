import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "./defaultOptions";
import WalletScreen from "../../screens/wallet/WalletScreen";
import CardScreen from "../../screens/wallet/CardScreen";
import ExpenditureScreen from "../../screens/wallet/ExpenditureScreen";
import DocumentsScreen from "../../screens/wallet/DocumentsScreen";
import TodosScreen from "../../screens/wallet/TodosScreen";

const WallStackNavigator = createStackNavigator();

const WalletStack = () => {
    return (
        <WallStackNavigator.Navigator screenOptions={defaultOptions}>
            <WallStackNavigator.Screen name="Wallet" component={WalletScreen} />
            <WallStackNavigator.Screen
                name="UserCards"
                component={CardScreen}
            />
            <WallStackNavigator.Screen
                name="Expenditure"
                component={ExpenditureScreen}
            />
            <WallStackNavigator.Screen
                name="Documents"
                component={DocumentsScreen}
            />
            <WallStackNavigator.Screen name="Todos" component={TodosScreen} />
        </WallStackNavigator.Navigator>
    );
};

export default WalletStack;
