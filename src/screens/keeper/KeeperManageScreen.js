import React from "react";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";

import * as keeperActions from "../../redux/actions/KeeperActions";
import CustomTextInput from "../../components/UI/CustomTextInput";
import CustomButton from "../../components/UI/CustomButton";
import CustomImagePicker from "../../components/Keeper/CustomImagePicker";

const KeeperManageScreen = (props) => {
    const dispatch = useDispatch();
    const keeperId = props.route.params ? props.route.params.id : null;
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
            props.navigation.goBack();
        } catch (error) {
            Alert.alert("Error", "Something went wrong please try again", [
                { text: "Okay" },
            ]);
        }
    };

    const onImageTaken = (image) => {
        initialValues["image"] = image;
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={50}
            >
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ handleChange, handleSubmit, values }) => (
                        <View>
                            <CustomImagePicker
                                onImageTaken={onImageTaken}
                                value={editKeeper ? editKeeper.image : null}
                                navigate={props.navigation.navigate}
                            />
                            <CustomTextInput
                                label="Title"
                                onChangeText={handleChange("title")}
                                value={values.title}
                            />
                            <CustomTextInput
                                multiline
                                label="Description"
                                onChangeText={handleChange("description")}
                                value={values.description}
                            />
                            <CustomButton
                                style={styles.submitButton}
                                title={editKeeper ? "Update" : "Submit"}
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default KeeperManageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 30,
    },
});
