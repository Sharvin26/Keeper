import React from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

import * as todoActions from "../../../redux/actions/todoActions";

const TodoItem = (props) => {
    const dispatch = useDispatch();
    const toggleState = () => {
        dispatch(
            todoActions.updateTodo(
                props.id,
                props.task,
                !props.isCompleted,
                new Date().toISOString()
            )
        );
    };

    const deleteTodo = () => {
        try {
            dispatch(todoActions.deleteTodo(props.id));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = () => {
        Alert.alert(
            "Are you sure?",
            "Do you want to delete the task? Remember Once deleted it cannont be restored.",
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
        <TouchableOpacity
            style={styles.container}
            onPress={() => props.onPress()}
        >
            <Text style={styles.taskText}>{props.task}</Text>
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
    );
};

export default TodoItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    },
    taskText: {
        margin: 5,
        fontSize: 18,
        fontFamily: "open-sans-bold",
    },
    iconContainer: { flexDirection: "row" },
    iconStyle: {
        fontSize: 28,
        margin: 5,
    },
});
