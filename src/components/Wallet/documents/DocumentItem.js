import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { MaterialIcons } from "react-native-vector-icons";

import DocumentItemView from "../../../components/Wallet/documents/DocumentItemView";
import ManageDocuments from "../../../components/Wallet/documents/ManageDocuments";
import * as documentActions from "../../../redux/actions/documentActions";

const DocumentItem = (props) => {
    const dispatch = useDispatch();
    const [isViewVisible, setisViewVisible] = useState(false);
    const [isManageVisible, setIsManageVisible] = useState(false);

    const deleteDoc = () => {
        try {
            dispatch(documentActions.deleteDocument(props.id));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = () => {
        Alert.alert(
            "Are you sure?",
            "Once deleted it cannot be restore again?",
            [
                { text: "Cancel", onPress: () => null, style: "cancel" },
                { text: "Okay", onPress: deleteDoc(), style: "destructive" },
            ]
        );
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => setisViewVisible(true)}
        >
            <Text style={styles.labelText}>{props.label}</Text>
            <View style={styles.iconContainer}>
                <MaterialIcons
                    name="delete"
                    style={styles.iconStyle}
                    onPress={deleteHandler}
                />
            </View>
            <DocumentItemView
                {...props}
                isViewModal={isViewVisible}
                closeViewModal={() => setisViewVisible(false)}
            />
            <ManageDocuments
                id={props.id}
                label={props.label}
                pdfUri={props.pdfUri}
                isModalOpen={isManageVisible}
                closeModal={() => setIsManageVisible(false)}
            />
        </TouchableOpacity>
    );
};

export default DocumentItem;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: "black",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    labelText: {
        padding: 20,
        fontSize: 16,
        fontFamily: "open-sans-bold",
    },
    iconContainer: { flexDirection: "row" },
    iconStyle: {
        fontSize: 28,
        margin: 5,
    },
});
