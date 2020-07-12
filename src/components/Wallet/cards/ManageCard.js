import React, { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Modal,
    SafeAreaView,
    TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as cardActions from "../../../redux/actions/cardActions";
import CustomIcons from "../../UI/CustomIcons";
import colors from "../../../constants/colors";

const ManageCard = (props) => {
    const dispatch = useDispatch();

    const cardData = useSelector((state) =>
        state.cards.cards.find((c) => c.id === props.id)
    );

    const [cardName, setCardName] = useState(cardData ? cardData.cardName : "");
    const [cardNumber, setCardNumber] = useState(
        cardData ? cardData.cardNumber : ""
    );
    const [cardExpiry, setCardExpiry] = useState(
        cardData ? cardData.cardExpiry : ""
    );
    const [cardCvv, setCardCvv] = useState(cardData ? cardData.cardCvv : "");
    const [error, setError] = useState();

    const cardNumberRef = useRef();
    const cardExpiryRef = useRef();
    const cardCvvRef = useRef();

    const closeModal = () => {
        setCardName("");
        setCardNumber("");
        setCardExpiry("");
        setCardCvv("");
        setError();
        props.closeManageModal();
    };

    const handleSubmit = () => {
        if (
            cardName.length !== 0 &&
            cardNumber.length === 19 &&
            cardExpiry.length === 7 &&
            cardCvv.length === 3
        ) {
            try {
                if (cardData) {
                    dispatch(
                        cardActions.updateCard(
                            props.id,
                            cardName,
                            cardNumber,
                            cardExpiry,
                            cardCvv,
                            new Date().toISOString()
                        )
                    );
                } else {
                    dispatch(
                        cardActions.addCard(
                            cardName,
                            cardNumber,
                            cardExpiry,
                            cardCvv,
                            new Date().toISOString()
                        )
                    );
                }
                closeModal();
            } catch (error) {
                setError("Something went wrong");
            }
        } else {
            setError("Please fill in all the details ");
        }
    };

    const cardNameChangeHandler = (value) => {
        setError();
        setCardName(value);
    };

    const cardNumberChangeHandler = (value) => {
        setError();
        setCardNumber(
            value
                .replace(/\s?/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim()
        );
        if (value.length === 19) {
            cardExpiryRef.current.focus();
        }
    };

    const cardExpiryChangeHandler = (value) => {
        setError();
        if (value.indexOf(".") >= 0 || value.length > 7) {
            return;
        }
        if (value.length === 2 && cardExpiry.length === 1) {
            if (value <= 12 && value >= 1) {
                value += "/";
            } else {
                setError("Add a valid Month");
                return;
            }
        }
        if (value.length === 7) {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const userEnteredMonth = value.slice(0, 2);
            const userEnteredYear = value.slice(3, 7);

            if (userEnteredYear === JSON.stringify(currentYear)) {
                if (userEnteredMonth > currentMonth) {
                    cardCvvRef.current.focus();
                } else {
                    setError("The card has already expired");
                    return;
                }
            } else if (userEnteredYear < currentYear) {
                setError("The card has already expired");
                return;
            } else if (userEnteredYear > currentYear) {
                cardCvvRef.current.focus();
            }
        }
        setCardExpiry(value);
    };

    const cardCvvChangeHandler = (value) => {
        setError();
        setCardCvv(value);
    };

    return (
        <Modal
            visible={props.isManageCardEnable}
            onRequestClose={closeModal}
            animationType="slide"
        >
            <SafeAreaView>
                <View style={styles.container}>
                    <CustomIcons
                        iconHandler={closeModal}
                        name="md-arrow-back"
                        color={colors.primary}
                        size={30}
                    />
                    <Text style={styles.headerText}>
                        {cardData ? "Update a Card" : "Add a card"}
                    </Text>
                    <CustomIcons
                        iconHandler={handleSubmit}
                        name="md-save"
                        color={colors.primary}
                        size={30}
                    />
                </View>
                <Text style={styles.cardLabel}>Card Name: </Text>
                <TextInput
                    autoFocus={true}
                    style={styles.cardText}
                    value={cardName}
                    onChangeText={(value) => cardNameChangeHandler(value)}
                    onSubmitEditing={() => cardNumberRef.current.focus()}
                    returnKeyType="next"
                />
                <Text style={styles.cardLabel}>Card number: </Text>
                <TextInput
                    ref={cardNumberRef}
                    style={styles.cardText}
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={(value) => cardNumberChangeHandler(value)}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    returnKeyType="next"
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <View style={styles.cardExpiryCvvContainer}>
                        <Text style={styles.cardExpiryCvvLabel}>
                            Card Expiry:
                        </Text>
                        <TextInput
                            ref={cardExpiryRef}
                            style={styles.cardExpiryCvvText}
                            keyboardType="numeric"
                            placeholder="MM/YYYY"
                            maxLength={7}
                            value={cardExpiry}
                            onChangeText={(value) =>
                                cardExpiryChangeHandler(value)
                            }
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.cardExpiryCvvContainer}>
                        <Text style={styles.cardExpiryCvvLabel}>Card Cvv:</Text>
                        <TextInput
                            ref={cardCvvRef}
                            style={styles.cardExpiryCvvText}
                            keyboardType="numeric"
                            placeholder="000"
                            maxLength={3}
                            value={cardCvv}
                            onChangeText={(value) =>
                                cardCvvChangeHandler(value)
                            }
                        />
                    </View>
                </View>
                <Text style={styles.hintText}>
                    Supported Card types are Visa, MasterCard and JCB.
                </Text>
                {error && <Text style={styles.errorText}>{error}</Text>}
            </SafeAreaView>
        </Modal>
    );
};

export default ManageCard;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
        paddingTop: 4,
    },
    cardLabel: {
        fontSize: 18,
        fontFamily: "open-sans-bold",
        paddingLeft: 20,
    },
    cardText: {
        borderBottomWidth: 2,
        borderBottomColor: "black",
        width: "90%",
        height: 40,
        textAlign: "center",
        margin: 20,
        fontFamily: "open-sans",
        fontSize: 18,
    },
    cardExpiryCvvContainer: { width: "45%", padding: 10 },
    cardExpiryCvvLabel: {
        fontSize: 18,
        fontFamily: "open-sans-bold",
        textAlign: "center",
    },
    cardExpiryCvvText: {
        borderBottomWidth: 2,
        borderBottomColor: "black",
        width: "100%",
        height: 40,
        textAlign: "center",
        fontFamily: "open-sans",
        fontSize: 18,
        paddingTop: 10,
    },
    hintText: {
        textAlign: "center",
        color: colors.activeColor,
        fontFamily: "open-sans-bold",
        paddingTop: 15,
    },
    errorText: {
        fontSize: 16,
        fontFamily: "open-sans-bold",
        color: "red",
        textAlign: "center",
        paddingTop: 15,
    },
});
