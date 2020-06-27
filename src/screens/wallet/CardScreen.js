import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

import PasswordBox from "../../components/UI/PasswordBox";
import ManageCard from "../../components/Wallet/ManageCard";

const CardScreen = (props) => {
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isManageCardEnable, setIsManageCardEnable] = useState(false);
    const passwordHandler = (password) => {
        if (password) {
            setIsPasswordValid(true);
        }
    };

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () =>
                isPasswordValid ? (
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
                ) : null,
        });
    }, [isPasswordValid]);

    return (
        <View style={styles.cardContainer}>
            {!isPasswordValid ? (
                <PasswordBox passwordHandler={passwordHandler} />
            ) : (
                <View>
                    <ManageCard
                        isManageCardEnable={isManageCardEnable}
                        closeManageModal={() => setIsManageCardEnable(false)}
                    />
                </View>
            )}
        </View>
    );
};

export default CardScreen;

const styles = StyleSheet.create({
    cardContainer: { margin: 20 },
});
