import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    Modal,
    View,
    TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { MaterialIcons } from "react-native-vector-icons";
import * as yup from "yup";
import { Formik } from "formik";

import * as todoActions from "../../../redux/actions/todoActions";
import CustomIcons from "../../UI/CustomIcons";
import colors from "../../../constants/colors";

const todoSchema = yup.object({
    task: yup
        .string()
        .required("This is a required field")
        .min(2, "Minimum 2 characters are required."),
    isCompleted: yup.bool().required("This is a required field"),
});

const ManageTodo = (props) => {
    const dispatch = useDispatch();
    const todo = useSelector((state) =>
        state.todos.todos.find((todo) => todo.id === props.todoId)
    );
    const [isTodoCompleted, setTodoCompleted] = useState(false);

    useEffect(() => {
        if (todo) {
            setTodoCompleted(todo.isCompleted);
        }
    }, [todo]);

    const initialValue = {
        task: todo ? todo.task : "",
        isCompleted: todo ? todo.isCompleted : false,
    };

    const closeModal = () => {
        setTodoCompleted(false);
        props.closeModal();
    };

    const changeTodoState = (values) => {
        setTodoCompleted(!isTodoCompleted);
        values.isCompleted = !values.isCompleted;
    };

    const onSubmit = async (values) => {
        try {
            if (!todo) {
                await dispatch(
                    todoActions.addTodo(
                        values.task,
                        values.isCompleted,
                        new Date().toISOString()
                    )
                );
            } else {
                await dispatch(
                    todoActions.updateTodo(
                        props.todoId,
                        values.task,
                        values.isCompleted,
                        new Date().toISOString()
                    )
                );
            }
            closeModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            visible={props.isModalOpen}
            onRequestClose={() => closeModal()}
            animationType="fade"
        >
            <SafeAreaView style={styles.safeAreaContainer}>
                <Formik
                    initialValues={initialValue}
                    validationSchema={todoSchema}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <View>
                            <View style={styles.iconContainer}>
                                <CustomIcons
                                    iconHandler={() => closeModal()}
                                    name="md-arrow-back"
                                    color={colors.primary}
                                    size={30}
                                />
                                <CustomIcons
                                    iconHandler={() => props.handleSubmit()}
                                    name="md-save"
                                    color={colors.primary}
                                    size={30}
                                    styles={styles.saveIcon}
                                />
                            </View>
                            <Text style={styles.labelText}>Task</Text>
                            <TextInput
                                placeholder="Start typing here"
                                autoFocus={true}
                                style={styles.input}
                                onChangeText={props.handleChange("task")}
                                value={props.values.task}
                                onBlur={props.handleBlur("task")}
                                touched={props.touched.task}
                                error={props.errors.task}
                            />
                            {props.touched.task && props.errors.task && (
                                <Text style={styles.errorText}>
                                    {props.touched.task && props.errors.task}
                                </Text>
                            )}
                            <View style={styles.formContainer}>
                                <View style={styles.isCompletedContainer}>
                                    <MaterialIcons
                                        name={
                                            isTodoCompleted
                                                ? "check-box"
                                                : "check-box-outline-blank"
                                        }
                                        style={styles.iconStyle}
                                        onPress={() =>
                                            changeTodoState(props.values)
                                        }
                                    />
                                    <Text style={styles.isCompletedText}>
                                        Task Completed?
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </Modal>
    );
};

export default ManageTodo;

const styles = StyleSheet.create({
    safeAreaContainer: { flex: 1, margin: 20 },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    labelText: {
        marginLeft: 2,
        marginTop: 10,
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    input: {
        fontSize: 18,
        fontFamily: "open-sans",
        padding: 10,
        paddingLeft: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 5,
        fontFamily: "open-sans-bold",
        fontSize: 14,
    },
    formContainer: { marginTop: 20 },
    isCompletedContainer: {
        flexDirection: "row",
    },
    isCompletedText: {
        margin: 5,
        fontSize: 18,
        fontFamily: "open-sans-bold",
    },
    iconStyle: {
        fontSize: 24,
        margin: 5,
    },
});
