import React from "react";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../constants/colors";

export const defaultScreenOptions = (route) => ({
    tabBarIcon: () => {
        let iconName;
        if (route.route.name === "Home") {
            iconName = "ios-list-box";
        } else if (route.route.name === "User") {
            iconName = "ios-person";
        }
        return <Ionicons name={iconName} size={30} color={colors.primary} />;
    },
});

export const defaultTabBarOptions = {
    activeBackgroundColor: colors.activeColor,
    showLabel: false,
};
