import React from "react";
import { StyleSheet, Text, SafeAreaView, Modal, View } from "react-native";
import CustomIcons from "../../UI/CustomIcons";
import colors from "../../../constants/colors";

const CardItemView = (props) => {
    return (
        <Modal
            visible={props.isViewCardEnable}
            onRequestClose={props.closeViewCardEnable}
            animationType="fade"
            transparent={true}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.viewContainer}>
                    <View style={styles.iconContainer}>
                        <CustomIcons
                            iconHandler={props.closeViewCardEnable}
                            name="md-close-circle"
                            color={colors.primary}
                            size={30}
                        />
                    </View>
                    <View style={styles.cardDetailsContainer}>
                        <View style={styles.cardRowContainer}>
                            <Text style={styles.label}>Card Name: </Text>
                            <Text style={styles.value}>{props.cardName}</Text>
                        </View>
                        <View style={styles.cardRowContainer}>
                            <Text style={styles.label}>Card Number: </Text>
                            <Text style={styles.value}>{props.cardNumber}</Text>
                        </View>
                        <View style={styles.cardRowContainer}>
                            <Text style={styles.label}>Card Expiry: </Text>
                            <Text style={styles.value}>{props.cardExpiry}</Text>
                        </View>
                        <View style={styles.cardRowContainer}>
                            <Text style={styles.label}>Card Cvv: </Text>
                            <Text style={styles.value}>{props.cardCvv}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default CardItemView;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(100,100,100, 0.5)",
    },
    viewContainer: {
        width: "100%",
        height: "32%",
        backgroundColor: "white",
        paddingHorizontal: 10,
    },
    iconContainer: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    cardDetailsContainer: { paddingLeft: 30, paddingTop: 10 },
    cardRowContainer: { flexDirection: "row", paddingBottom: 20 },
    label: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
    },
    value: { fontFamily: "open-sans", fontSize: 20 },
});
