import React from "react";
import {
    Platform,
    StyleSheet,
    TextInput,
    View,
    Modal,
    SafeAreaView,
    FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import KeeperItem from "./KeeperItem";
import colors from "../../constants/colors";

const SearchKeeper = (props) => {
    return (
        <Modal visible={props.isSearchEnabled} animationType="slide">
            <SafeAreaView style={styles.container}>
                <View style={styles.searchContainer}>
                    <Ionicons
                        name="md-arrow-back"
                        size={30}
                        color="black"
                        onPress={props.closeSearchModal}
                        style={{
                            ...styles.icon,
                            paddingTop: Platform.OS === "ios" ? 8 : 0,
                        }}
                    />
                    <TextInput
                        style={styles.text}
                        autoFocus={true}
                        placeholder="Search...."
                        keyboardType="web-search"
                    />
                </View>
                <View style={styles.searchResultContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={props.data}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={(itemData) => (
                            <KeeperItem
                                image={itemData.item.image}
                                title={itemData.item.title}
                                date={itemData.item.date}
                                onSelect={props.selectHandler.bind(
                                    this,
                                    itemData.item.id
                                )}
                            />
                        )}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default SearchKeeper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: "10%",
        paddingRight: 10,
    },
    text: {
        width: "90%",
        fontSize: 18,
        paddingLeft: 10,
        fontFamily: "open-sans-bold",
        color: colors.activeColor,
    },
    searchResultContainer: {
        paddingTop: 20,
    },
});
