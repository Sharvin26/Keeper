import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import {
    MaterialIcons,
    MaterialCommunityIcons,
} from "react-native-vector-icons";
import PropTypes from "prop-types";

import * as todoActions from "../../../redux/actions/todoActions";
import errorText from "../../../constants/errorText";

const TodoItem = (props) => {
    const dispatch = useDispatch();

    const toggleState = () => {
        try {
            dispatch(
                todoActions.updateTodo(
                    props.id,
                    props.task,
                    !props.isCompleted,
                    new Date().toISOString()
                )
            );
        } catch (error) {
            Alert.alert(errorText.submit.title, errorText.submit.message, [
                { text: "Okay", style: "default" },
            ]);
        }
    };

    const deleteTodo = () => {
        try {
            dispatch(todoActions.deleteTodo(props.id));
        } catch (error) {
            Alert.alert(errorText.submit.title, errorText.submit.message, [
                { text: "Okay", style: "default" },
            ]);
        }
    };

    const deleteHandler = () => {
        Alert.alert(
            "Are you sure?",
            "Do you want to delete the task? Remember Once deleted it cannot be restored.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => deleteTodo(),
                },
            ]
        );
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={styles.container}
                onPress={() => props.onPress()}
            >
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                        name="bell"
                        style={styles.iconStyle}
                    />
                    <Text style={styles.taskText}>{props.task}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <MaterialIcons
                        name={
                            props.isCompleted
                                ? "check-box"
                                : "check-box-outline-blank"
                        }
                        style={styles.iconStyle}
                        onPress={() => toggleState()}
                    />
                    <MaterialIcons
                        name="delete-forever"
                        style={styles.iconStyle}
                        onPress={() => deleteHandler()}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default TodoItem;

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    taskIcon: {
        fontSize: 26,
        margin: 5,
    },
    taskText: {
        margin: 3,
        fontSize: 20,
        fontFamily: "open-sans-bold",
        width: "73%",
    },
    iconContainer: { flexDirection: "row" },
    iconStyle: {
        fontSize: 28,
        margin: 5,
    },
});

TodoItem.prototype = {
    id: PropTypes.number,
    isCompleted: PropTypes.bool,
    onPress: PropTypes.func,
    task: PropTypes.task,
};
