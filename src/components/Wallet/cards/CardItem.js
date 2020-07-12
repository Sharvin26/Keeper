import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "react-native-vector-icons";

import * as cardActions from "../../../redux/actions/cardActions";
import ManageCard from "./ManageCard";
import colors from "../../../constants/colors";
import errorText from "../../../constants/errorText";
import CardItemView from "./CardItemView";

const CardItem = (props) => {
    const dispatch = useDispatch();
    const [isManageCardEnable, setIsManageCardEnable] = useState(false);
    const [isViewCardEnable, setIsViewCardEnable] = useState(false);

    const deleteCard = () => {
        try {
            dispatch(cardActions.deleteCard(props.id));
        } catch (error) {
            Alert.alert(errorText.submit.title, errorText.submit.message, [
                { text: "Okay" },
            ]);
        }
    };

    const deleteHandler = () => {
        Alert.alert(
            "Are you sure?",
            "Once it is deleted, you cannot restore it again!",
            [
                { text: "cancel", style: "cancel", onPress: () => null },
                {
                    text: "Okay",
                    style: "destructive",
                    onPress: () => deleteCard(),
                },
            ]
        );
    };

    return (
        <View>
            {isManageCardEnable && (
                <ManageCard
                    id={props.id}
                    isManageCardEnable={isManageCardEnable}
                    closeManageModal={() => setIsManageCardEnable(false)}
                />
            )}
            {isViewCardEnable && (
                <CardItemView
                    id={props.id}
                    cardName={props.cardName}
                    cardNumber={props.cardNumber}
                    cardExpiry={props.cardExpiry}
                    cardCvv={props.cardCvv}
                    isViewCardEnable={isViewCardEnable}
                    closeViewCardEnable={() => setIsViewCardEnable(false)}
                />
            )}
            <TouchableOpacity
                style={styles.container}
                onPress={() => setIsViewCardEnable(true)}
            >
                <View style={styles.cardDetailcontainer}>
                    <Text style={styles.cardNameText}>{props.cardName}</Text>
                    <Text style={styles.cardNumberText}>
                        {props.cardNumber}
                    </Text>
                </View>
                <View style={styles.cardActionsContainer}>
                    <MaterialIcons
                        name="edit"
                        style={styles.iconStyle}
                        onPress={() => setIsManageCardEnable(true)}
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

export default CardItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
    cardDetailcontainer: {
        padding: 10,
    },
    cardNameText: {
        paddingTop: 10,
        fontFamily: "open-sans-bold",
        fontSize: 20,
    },
    cardNumberText: {
        paddingTop: 10,
        fontFamily: "open-sans",
        fontSize: 18,
        color: colors.activeColor,
    },
    cardActionsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 20,
    },
    iconStyle: {
        fontSize: 28,
        paddingRight: 10,
    },
});
