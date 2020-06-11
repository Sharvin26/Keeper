import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Modal,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as keeperActions from "../../redux/actions/KeeperActions";

import CustomImagePicker from "./CustomImagePicker";
import CustomTextInput from "../UI/CustomTextInput";

const ManageKeeper = (props) => {
    const dispatch = useDispatch();
    const keeperId = props.id ? props.id : null;
    const editKeeper = useSelector((state) =>
        state.Keeps.documents.find((doc) => doc.id === keeperId)
    );
    const initialValues = {
        title: editKeeper ? editKeeper.title : "",
        description: editKeeper ? editKeeper.description : "",
        image: editKeeper ? editKeeper.image : "",
    };

    const onSubmit = async (values) => {
        try {
            if (keeperId) {
                let isImageChanged = false;
                if (values.image !== editKeeper.image) {
                    isImageChanged = true;
                }
                await dispatch(
                    keeperActions.editDocument(
                        keeperId,
                        values.title,
                        values.image,
                        new Date().toISOString(),
                        values.description,
                        isImageChanged
                    )
                );
            } else {
                await dispatch(
                    keeperActions.addDocument(
                        values.title,
                        initialValues.image,
                        new Date().toISOString(),
                        values.description
                    )
                );
            }
            props.closeManageModal();
        } catch (error) {
            Alert.alert("Error", error.message, [{ text: "Okay" }]);
        }
    };

    const onImageTaken = (image) => {
        initialValues["image"] = image;
    };

    return (
        <Modal visible={props.isManageEnabled} animationType="slide">
            <SafeAreaView style={{ flex: 1, margin: 20 }}>
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <KeyboardAvoidingView
                        behavior="padding"
                        keyboardVerticalOffset={50}
                    >
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                        >
                            {({ handleChange, handleSubmit, values }) => (
                                <View>
                                    <View style={styles.searchContainer}>
                                        <Ionicons
                                            name="md-arrow-back"
                                            size={30}
                                            color="black"
                                            onPress={props.closeManageModal}
                                            style={{
                                                paddingTop:
                                                    Platform.OS === "ios"
                                                        ? 2
                                                        : 0,
                                            }}
                                        />
                                        <Text style={styles.headerText}>
                                            {keeperId
                                                ? "Edit Document"
                                                : "Add Document"}
                                        </Text>
                                        <Ionicons
                                            name="md-save"
                                            size={30}
                                            color="black"
                                            onPress={handleSubmit}
                                            style={{
                                                paddingTop:
                                                    Platform.OS === "ios"
                                                        ? 2
                                                        : 0,
                                            }}
                                        />
                                    </View>
                                    <View style={styles.formContainer}>
                                        <CustomImagePicker
                                            onImageTaken={onImageTaken}
                                            value={
                                                editKeeper
                                                    ? editKeeper.image
                                                    : null
                                            }
                                            navigate={props.navigate}
                                        />
                                        <CustomTextInput
                                            label="Title"
                                            onChangeText={handleChange("title")}
                                            value={values.title}
                                        />
                                        <CustomTextInput
                                            multiline
                                            label="Description"
                                            onChangeText={handleChange(
                                                "description"
                                            )}
                                            value={values.description}
                                        />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

export default ManageKeeper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerText: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
        paddingTop: 4,
    },
    formContainer: {
        marginTop: 20,
    },
});
