import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as cardActions from "../../redux/actions/cardActions";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import ManageCard from "../../components/Wallet/cards/ManageCard";
import CardItem from "../../components/Wallet/cards/CardItem";

const CardScreen = (props) => {
    const dispatch = useDispatch();
    const [isManageCardEnable, setIsManageCardEnable] = useState(false);

    const cards = useSelector((state) => state.cards.cards);

    const loadCards = useCallback(async () => {
        try {
            await dispatch(cardActions.getCards());
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        if (cards.length === 0) {
            loadCards();
        }
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Sort"
                        iconName={
                            Platform.OS === "android"
                                ? "md-add-circle"
                                : "ios-add-circle"
                        }
                        onPress={() => setIsManageCardEnable(true)}
                    />
                </HeaderButtons>
            ),
        });
    }, []);

    return (
        <View style={styles.cardContainer}>
            <View>
                <ManageCard
                    isManageCardEnable={isManageCardEnable}
                    closeManageModal={() => setIsManageCardEnable(false)}
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={cards}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(itemData) => (
                        <CardItem
                            id={itemData.item.id}
                            cardName={itemData.item.cardName}
                            cardNumber={itemData.item.cardNumber}
                            cardExpiry={itemData.item.cardExpiry}
                            cardCvv={itemData.item.cardCvv}
                        />
                    )}
                />
            </View>
        </View>
    );
};

export default CardScreen;

const styles = StyleSheet.create({
    cardContainer: { margin: 20, marginTop: 0 },
});

export const screenOptions = () => {
    return {
        headerTitle: "Cards",
    };
};
