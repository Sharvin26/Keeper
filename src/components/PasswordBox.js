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

    // Registring Password
    const [password, setPassword] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState([]);
    const [passwordResetHint, setPasswordResetHint] = useState();

    // Validating Password
    const [userPassword, setUserPassword] = useState(false);
    const [userResetHint, setUserResetHint] = useState();
    const [userClickedReset, setUserClickedReset] = useState(false);
    const [userEnteredHint, setUserEnteredHint] = useState();

    const [error, setError] = useState();

    const refCallback = (textInputRef) => (node) => {
        textInputRef.current = node;
    };

    useEffect(() => {
        _retrievePassword();
    }, []);

    const _retrievePassword = async () => {
        try {
            const passwordValue = await SecureStore.getItemAsync("password");
            const resetHint = await SecureStore.getItemAsync(
                "passwordResetHint"
            );
            if (passwordValue !== null && resetHint !== null) {
                setUserPassword(passwordValue);
                setUserResetHint(resetHint);
            }
        } catch (error) {
            setError("Something Went Wrong");
        }
    };

    const validatePassword = async () => {
        if (userClickedReset) {
            setError();
            if (userEnteredHint === JSON.parse(userResetHint)) {
                setPassword([]);
                setUserResetHint(false);
                setUserPassword(false);
            } else {
                setError("Please enter a valid hint");
            }
        } else {
            if (isEqual(JSON.stringify(password), userPassword)) {
                props.passwordHandler(password);
            } else {
                setError("Password you entered is wrong");
            }
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

    const _storeHint = async (hint) => {
        try {
            await SecureStore.setItemAsync(
                "passwordResetHint",
                JSON.stringify(hint)
            );
        } catch (error) {
            setError("Something Went Wrong");
        }
    };

    const handleSubmit = () => {
        if (
            password.length === 4 &&
            password.filter((item) => item === "").length === 0 &&
            isEqual(password, confirmPassword) &&
            passwordResetHint.length > 0
        ) {
            _storeHint(passwordResetHint);
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

    const hintHandleChange = (value) => {
        setError();
        setPasswordResetHint(value);
    };

    const validateHint = (value) => {
        setError();
        setUserEnteredHint(value);
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
                {userResetHint && (
                    <View style={{ paddingTop: 35 }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontFamily: "open-sans-bold",
                            }}
                            onPress={() =>
                                setUserClickedReset(!userClickedReset)
                            }
                        >
                            Reset Password?
                        </Text>
                        {userClickedReset && (
                            <View style={{ paddingTop: 10 }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: "open-sans",
                                    }}
                                >
                                    Enter the hint:
                                </Text>
                                <TextInput
                                    style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#ccc",
                                        width: "90%",
                                        paddingTop: 10,
                                        textAlign: "center",
                                    }}
                                    value={userEnteredHint}
                                    maxLength={10}
                                    onChangeText={(value) =>
                                        validateHint(value)
                                    }
                                />
                            </View>
                        )}
                    </View>
                )}
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
                    <Text style={{ ...styles.passwordText, paddingTop: 25 }}>
                        Enter a hint to reset password
                    </Text>
                    <TextInput
                        style={styles.hintInput}
                        maxLength={10}
                        value={passwordResetHint}
                        onChangeText={(value) => hintHandleChange(value)}
                    />
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
    submitIconContainer: { alignItems: "center", paddingTop: 15 },
    errorText: {
        color: "red",
        textAlign: "center",
        paddingTop: 10,
        fontSize: 16,
        fontFamily: "open-sans-bold",
    },
    hintInput: {
        width: "90%",
        marginHorizontal: 20,
        borderBottomWidth: 3,
        borderBottomColor: "black",
        fontSize: 20,
        paddingBottom: 10,
        textAlign: "center",
    },
});
