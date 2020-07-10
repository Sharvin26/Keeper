import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

import ManageCard from "../../components/Wallet/cards/ManageCard";

const CardScreen = (props) => {
    const [isManageCardEnable, setIsManageCardEnable] = useState(false);

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
            </View>
        </View>
    );
};

export default CardScreen;

const styles = StyleSheet.create({
    cardContainer: { margin: 20 },
});
