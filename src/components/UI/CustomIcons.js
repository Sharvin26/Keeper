import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomIcons = (props) => {
    return (
        <Ionicons
            name={props.name}
            size={props.size}
            color={props.color}
            onPress={props.iconHandler}
            style={{
                paddingTop: Platform.OS === "ios" ? 2 : 0,
                ...props.styles,
            }}
        />
    );
};

export default CustomIcons;
