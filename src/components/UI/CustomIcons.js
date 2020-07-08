import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

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

CustomIcons.prototype = {
    color: PropTypes.string.isRequired,
    iconHandler: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
};
