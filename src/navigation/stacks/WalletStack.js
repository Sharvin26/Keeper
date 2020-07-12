import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { defaultOptions } from "./defaultOptions";
import WalletScreen, {
    screenOptions as WalletScreenOptions,
} from "../../screens/wallet/WalletScreen";
import CardScreen, {
    screenOptions as CardScreenOptions,
} from "../../screens/wallet/CardScreen";
import DocumentsScreen, {
    screenOptions as DocumentsScreenOptions,
} from "../../screens/wallet/DocumentsScreen";
import ExpenditureScreen, {
    screenOptions as ExpenditureScreenOptions,
} from "../../screens/wallet/ExpenditureScreen";
import TodosScreen, {
    screenOptions as TodosScreenOptions,
} from "../../screens/wallet/TodosScreen";

const WallStackNavigator = createStackNavigator();

const WalletStack = () => {
    return (
        <WallStackNavigator.Navigator screenOptions={defaultOptions}>
            <WallStackNavigator.Screen
                name="Wallet"
                component={WalletScreen}
                options={WalletScreenOptions}
            />
            <WallStackNavigator.Screen
                name="UserCards"
                component={CardScreen}
                options={CardScreenOptions}
            />
            <WallStackNavigator.Screen
                name="Expenditure"
                component={ExpenditureScreen}
                options={ExpenditureScreenOptions}
            />
            <WallStackNavigator.Screen
                name="Documents"
                component={DocumentsScreen}
                options={DocumentsScreenOptions}
            />
            <WallStackNavigator.Screen
                name="Todos"
                component={TodosScreen}
                options={TodosScreenOptions}
            />
        </WallStackNavigator.Navigator>
    );
};

export default WalletStack;
