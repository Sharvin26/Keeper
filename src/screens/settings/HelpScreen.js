import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "react-native-vector-icons";

import colors from "../../constants/colors";

const questionAnswer = [
    {
        question: "Is my data stored securely?",
        answer: "All of your data is stored locally in a secured environment.",
    },
    {
        question: "What is a moment?",
        answer: "All of your data is stored locally in a secured environment.",
    },
    {
        question: "Which cards are supported?",
        answer: "All of your data is stored locally in a secured environment.",
    },
    {
        question: "What document format is supported?",
        answer: "All of your data is stored locally in a secured environment.",
    },
    {
        question: "What barcode formats are supported?",
        answer: "All of your data is stored locally in a secured environment.",
    },
];

const HelpScreen = () => {
    const [showAnswer, setShowAnswer] = useState();

    const handleShowAnswer = (index) => {
        if (showAnswer === index) {
            setShowAnswer();
        } else {
            setShowAnswer(index);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {questionAnswer.map((element, index) => (
                <TouchableOpacity
                    style={styles.questionAnswerContainer}
                    key={index}
                    onPress={() => handleShowAnswer(index)}
                    activeOpacity={0.6}
                >
                    <View style={styles.questionContainer}>
                        <Text style={styles.questionText}>
                            {element.question}
                        </Text>
                        <MaterialIcons
                            name={
                                showAnswer === index
                                    ? "keyboard-arrow-up"
                                    : "keyboard-arrow-down"
                            }
                            style={styles.iconStyle}
                        />
                    </View>
                    {index === showAnswer && (
                        <Text style={styles.answerText}>{element.answer}</Text>
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default HelpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#393E46",
    },
    questionAnswerContainer: {
        padding: 20,
        borderBottomColor: colors.settingsTextColor,
        borderBottomWidth: 0.4,
    },
    questionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    questionText: {
        color: colors.settingsTextColor,
        fontFamily: "open-sans-bold",
        fontSize: 17,
        width: "95%",
    },
    iconStyle: {
        fontSize: 28,
        color: colors.settingsTextColor,
    },
    answerText: {
        color: colors.settingsTextColor,
        fontFamily: "open-sans",
        fontSize: 16,
    },
});

export const screenOptions = () => {
    return {
        headerTintColor: colors.settingsTextColor,
        headerTitle: "Help",
        headerTitleStyle: {
            fontSize: 28,
            fontFamily: "open-sans-bold",
        },
        headerStyle: {
            backgroundColor: "#393E46",
            elevation: 0,
            shadowColor: "transparent",
        },
    };
};
