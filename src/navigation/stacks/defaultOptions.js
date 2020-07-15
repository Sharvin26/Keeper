import React from "react";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

export const defaultOptions = (props) => {
    const color =
        props.route.name === "Settings" ||
        props.route.name === "Customize" ||
        props.route.name === "Security" ||
        props.route.name === "Help"
            ? "white"
            : "black";
    return {
        headerTitle: "Keeper",
        headerTitleAlign: "center",
        headerTitleStyle: {
            fontSize: 26,
            fontFamily: "open-sans-bold",
        },

        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Menu"
                    iconName={
                        Platform.OS === "android" ? "md-menu" : "ios-menu"
                    }
                    color={color}
                    onPress={() => {
                        props.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
    };
};
