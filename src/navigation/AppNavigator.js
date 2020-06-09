import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppTab from "./tab/AppTab";
import AppDrawer from "./drawer/AppDrawer";

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppDrawer />
        </NavigationContainer>
    );
};

export default AppNavigator;
