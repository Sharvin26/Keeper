import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";

import CustomPasswordInput from "./CustomPasswordInput";

const initialLoginValues = {
    password: "",
};

const loginSchema = yup.object({
    password: yup.string().required("Please Enter your password"),
});

const initialSignUpValues = {
    password: "",
    confirmPassword: "",
};

const signUpSchema = yup.object({
    password: yup
        .string()
        .required("Please Enter your password")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and O  ne special case Character"
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const PasswordBox = (props) => {
    const [userPassword, setUserPassword] = useState("");
    const [passwordError, setPasswordError] = useState();

    const _retrieveData = async () => {
        try {
            const value = await SecureStore.getItemAsync("password");
            if (value !== null) {
                setUserPassword(value);
            }
        } catch (error) {}
    };

    useEffect(() => {
        _retrieveData();
    }, []);

    const _storeData = async (password) => {
        try {
            await SecureStore.setItemAsync("password", password);
        } catch (error) {
            setPasswordError("Something Went Wrong");
        }
    };

    const passwordHandle = (values) => {
        if (userPassword) {
            if (values.password === userPassword) {
                props.passwordHandler(values.password);
            } else {
                setPasswordError("Invalid Password Please try again");
            }
        } else {
            _storeData(values.password);
            props.passwordHandler(values.password);
        }
    };

    return (
        <View>
            {!userPassword ? (
                <Formik
                    initialValues={initialSignUpValues}
                    validationSchema={signUpSchema}
                    onSubmit={(values) => passwordHandle(values)}
                >
                    {(props) => (
                        <View style={{ margin: 10, alignItems: "center" }}>
                            <CustomPasswordInput
                                placeholder="Enter your Password here"
                                autoFocus={true}
                                value={props.values.password}
                                onChangeText={props.handleChange("password")}
                                onBlur={props.handleBlur("password")}
                                touched={props.touched.password}
                                error={props.errors.password}
                            />
                            <CustomPasswordInput
                                placeholder="Confirm your password"
                                value={props.values.confirmPassword}
                                onChangeText={props.handleChange(
                                    "confirmPassword"
                                )}
                                onBlur={props.handleBlur("confirmPassword")}
                                touched={props.touched.confirmPassword}
                                error={props.errors.confirmPassword}
                            />
                            <Ionicons
                                name="ios-log-in"
                                size={30}
                                color="black"
                                style={styles.submitIcon}
                                onPress={props.handleSubmit}
                            />
                            <Text style={styles.hintText}>
                                Seems like you haven't added a password. Please
                                setup a password.
                            </Text>
                        </View>
                    )}
                </Formik>
            ) : (
                <Formik
                    initialValues={initialLoginValues}
                    validationSchema={loginSchema}
                    onSubmit={(values) => passwordHandle(values)}
                >
                    {(props) => (
                        <View>
                            <View style={styles.passwordContainer}>
                                <CustomPasswordInput
                                    placeholder="Enter your Password here"
                                    autoFocus={true}
                                    value={props.values.password}
                                    onChangeText={props.handleChange(
                                        "password"
                                    )}
                                    onBlur={props.handleBlur("password")}
                                    touched={props.touched.password}
                                    error={props.errors.password}
                                />
                                <Ionicons
                                    name="ios-log-in"
                                    size={30}
                                    color="black"
                                    style={styles.submitIcon}
                                    onPress={props.handleSubmit}
                                />
                            </View>
                            {passwordError && (
                                <Text style={styles.errorText}>
                                    {passwordError}
                                </Text>
                            )}
                            <Text style={styles.hintText}>
                                Please enter your password to access the data
                            </Text>
                        </View>
                    )}
                </Formik>
            )}
        </View>
    );
};

export default PasswordBox;

const styles = StyleSheet.create({
    passwordContainer: { flexDirection: "row", alignItems: "center" },
    passwordInput: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        width: "90%",
    },
    submitIcon: { paddingLeft: 15, paddingBottom: 20 },
    hintText: {
        marginTop: 10,
        textAlign: "center",
        fontFamily: "open-sans-bold",
    },
    errorText: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        color: "red",
    },
});
