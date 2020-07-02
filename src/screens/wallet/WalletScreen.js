import React from "react";
import { StyleSheet, View } from "react-native";
import WalletCard from "../../components/Wallet/WalletCard";

const cardImage = require("../../../assets/wallet/card.png");
const expenditure = require("../../../assets/wallet/expenditure.png");
const documents = require("../../../assets/wallet/documents.png");
const todo = require("../../../assets/wallet/todo.png");

const WalletScreen = (props) => {
    return (
        <View>
            <View style={styles.container}>
                <WalletCard
                    onPress={() => props.navigation.navigate("UserCards")}
                    source={cardImage}
                    label="Cards"
                />
                <WalletCard
                    onPress={() => props.navigation.navigate("Expenditure")}
                    source={expenditure}
                    label="Expenditure"
                />
            </View>
            <View style={{ ...styles.container, marginTop: 5 }}>
                <WalletCard
                    onPress={() => props.navigation.navigate("Documents")}
                    source={documents}
                    label="Documents"
                />
                <WalletCard
                    onPress={() => props.navigation.navigate("Todos")}
                    source={todo}
                    label="Todos"
                />
            </View>
        </View>
    );
};

export default WalletScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
        marginHorizontal: 10,
    },
});
