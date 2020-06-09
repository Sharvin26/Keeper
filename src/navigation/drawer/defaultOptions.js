import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colors";

export const defaultDrawerContentOptions = {
    activeBackgroundColor: colors.activeColor,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.primary,
};

export const defaultOptions = (label, iconName) => {
    return {
        drawerLabel: () => (
            <Text style={{ fontFamily: "open-sans-bold" }}>{label}</Text>
        ),
        drawerIcon: () => <Ionicons name={iconName} size={23} />,
    };
};
