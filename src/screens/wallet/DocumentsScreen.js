import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as documentActions from "../../redux/actions/documentActions";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import DocumentItem from "../../components/Wallet/documents/DocumentItem";
import ManageDocuments from "../../components/Wallet/documents/ManageDocuments";

const DocumentsScreen = (props) => {
    const dispatch = useDispatch();
    const documents = useSelector((state) => state.documents.documents);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fetchDocuments = useCallback(async () => {
        try {
            await dispatch(documentActions.getDocument());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchDocuments();
    }, [fetchDocuments]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="Add"
                        iconName={
                            Platform.OS === "android"
                                ? "md-add-circle"
                                : "ios-add-circle"
                        }
                        onPress={() => setIsModalOpen(true)}
                    />
                </HeaderButtons>
            ),
        });
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <View style={styles.mainContainer}>
            <ManageDocuments
                isModalOpen={isModalOpen}
                closeModal={closeModal}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                data={documents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(itemData) => (
                    <DocumentItem
                        id={itemData.item.id}
                        label={itemData.item.label}
                        pdfUri={itemData.item.pdfUri}
                    />
                )}
            />
        </View>
    );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 5,
    },
});

export const screenOptions = () => {
    return {
        headerTitle: "Documents",
    };
};
