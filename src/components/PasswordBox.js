import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Platform,
    SafeAreaView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import isEqual from "lodash/isEqual";

const PasswordBox = (props) => {
    const firstPasswordInputRef = useRef(null);
    const secondPasswordInputRef = useRef(null);
    const thirdPasswordInputRef = useRef(null);
    const fourthPasswordInputRef = useRef(null);

    const firstPasswordConfirmInputRef = useRef(null);
    const secondPasswordConfirmInputRef = useRef(null);
    const thirdPasswordConfirmInputRef = useRef(null);
    const fourthPasswordConfirmInputRef = useRef(null);

    const [password, setPassword] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState([]);
    const [userPassword, setUserPassword] = useState(false);
    const [error, setError] = useState();

    const refCallback = (textInputRef) => (node) => {
        textInputRef.current = node;
    };

    useEffect(() => {
        _retrievePassword();
    }, []);

    const _retrievePassword = async () => {
        try {
            const value = await SecureStore.getItemAsync("password");
            if (value !== null) {
                setUserPassword(value);
            }
        } catch (error) {
            setError("Something Went Wrong");
        }
    };

    const validatePassword = async () => {
        if (isEqual(JSON.stringify(password), userPassword)) {
            props.passwordHandler(password);
        } else {
            setError("Password you entered is wrong");
        }
    };

    const _storePassword = async (password) => {
        try {
            await SecureStore.setItemAsync(
                "password",
                JSON.stringify(password)
            );
        } catch (error) {
            setError("Something Went Wrong");
        }
    };

    const handleSubmit = () => {
        if (
            password.length === 4 &&
            password.filter((item) => item === "").length === 0 &&
            isEqual(password, confirmPassword)
        ) {
            _storePassword(password);
            props.passwordHandler(password);
        } else {
            setError("Verify the values entered");
        }
    };

    const onPasswordBackKeyPress = (index) => {
        return ({ nativeEvent: { key: value } }) => {
            if (value === "Backspace" && password[index] === "") {
                if (index === 1) {
                    firstPasswordInputRef.current.focus();
                } else if (index === 2) {
                    secondPasswordInputRef.current.focus();
                } else if (index === 3) {
                    thirdPasswordInputRef.current.focus();
                }

                if (Platform.OS === "android" && index > 0) {
                    const passwordArrayCopy = password.concat();
                    passwordArrayCopy[index - 1] = "";
                    setPassword(passwordArrayCopy);
                }
            }
        };
    };

    const onConfirmPasswordBackKeyPress = (index) => {
        return ({ nativeEvent: { key: value } }) => {
            if (value === "Backspace" && confirmPassword[index] === "") {
                if (index === 1) {
                    firstPasswordConfirmInputRef.current.focus();
                } else if (index === 2) {
                    secondPasswordConfirmInputRef.current.focus();
                } else if (index === 3) {
                    thirdPasswordConfirmInputRef.current.focus();
                }

                if (Platform.OS === "android" && index > 0) {
                    const confirmPasswordArrayCopy = confirmPassword.concat();
                    confirmPasswordArrayCopy[index - 1] = "";
                    setConfirmPassword(confirmPasswordArrayCopy);
                }
            }
        };
    };

    const passwordHandleChange = (index) => {
        return (value) => {
            if (isNaN(Number(value))) {
                return;
            }
            const passwordArrayCopy = password.concat();
            passwordArrayCopy[index] = value;
            setPassword(passwordArrayCopy);
            if (value !== "") {
                setError();
                if (index === 0) {
                    secondPasswordInputRef.current.focus();
                } else if (index === 1) {
                    thirdPasswordInputRef.current.focus();
                } else if (index === 2) {
                    fourthPasswordInputRef.current.focus();
                }
            }
        };
    };

    const confirmPasswordHandleChange = (index) => {
        return (value) => {
            if (isNaN(Number(value))) {
                return;
            }
            const confirmPasswordArrayCopy = confirmPassword.concat();
            confirmPasswordArrayCopy[index] = value;
            setConfirmPassword(confirmPasswordArrayCopy);
            if (value !== "") {
                setError();
                if (index === 0) {
                    secondPasswordConfirmInputRef.current.focus();
                } else if (index === 1) {
                    thirdPasswordConfirmInputRef.current.focus();
                } else if (index === 2) {
                    fourthPasswordConfirmInputRef.current.focus();
                }
            }
        };
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.passwordText}>Enter your password</Text>
            <View style={styles.newPasswordContainer}>
                <View style={styles.newPasswordBoxContainer}>
                    {[
                        firstPasswordInputRef,
                        secondPasswordInputRef,
                        thirdPasswordInputRef,
                        fourthPasswordInputRef,
                    ].map((textInputRef, index) => (
                        <TextInput
                            ref={refCallback(textInputRef)}
                            style={styles.passwordInput}
                            autoFocus={index === 0 ? true : false}
                            keyboardType="numeric"
                            secureTextEntry={true}
                            maxLength={1}
                            value={password[index]}
                            onChangeText={passwordHandleChange(index)}
                            onKeyPress={onPasswordBackKeyPress(index)}
                            key={index}
                        />
                    ))}
                </View>
            </View>
            {!userPassword && (
                <View>
                    <Text style={{ ...styles.passwordText, paddingTop: 25 }}>
                        Enter your confirm password
                    </Text>
                    <View style={styles.newPasswordContainer}>
                        <View style={styles.newPasswordBoxContainer}>
                            {[
                                firstPasswordConfirmInputRef,
                                secondPasswordConfirmInputRef,
                                thirdPasswordConfirmInputRef,
                                fourthPasswordConfirmInputRef,
                            ].map((textInputRef, index) => (
                                <TextInput
                                    ref={refCallback(textInputRef)}
                                    style={styles.passwordInput}
                                    keyboardType="numeric"
                                    secureTextEntry={true}
                                    maxLength={1}
                                    value={confirmPassword[index]}
                                    onChangeText={confirmPasswordHandleChange(
                                        index
                                    )}
                                    onKeyPress={onConfirmPasswordBackKeyPress(
                                        index
                                    )}
                                    key={index}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
            <View style={styles.submitIconContainer}>
                <Ionicons
                    name="ios-log-in"
                    size={30}
                    color="black"
                    onPress={userPassword ? validatePassword : handleSubmit}
                />
            </View>
        </SafeAreaView>
    );
};

export default PasswordBox;

const styles = StyleSheet.create({
    container: { marginTop: 60 },
    passwordText: {
        paddingBottom: 10,
        fontFamily: "open-sans-bold",
        fontSize: 20,
        textAlign: "center",
    },
    newPasswordContainer: { margin: 10, alignItems: "center" },
    newPasswordBoxContainer: {
        flexDirection: "row",
    },
    passwordInput: {
        borderBottomWidth: 3,
        borderBottomColor: "black",
        width: "15%",
        height: 40,
        marginRight: 20,
        textAlign: "center",
        fontSize: 20,
        paddingBottom: 10,
    },

    submitIconContainer: { alignItems: "center", paddingTop: 20 },
    errorText: {
        color: "red",
        textAlign: "center",
        paddingTop: 10,
        fontSize: 16,
        fontFamily: "open-sans-bold",
    },
});
