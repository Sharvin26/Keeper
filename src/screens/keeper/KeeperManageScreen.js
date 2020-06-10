import React from "react";
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import * as keeperActions from "../../redux/actions/KeeperActions";
import CustomTextInput from "../../components/UI/CustomTextInput";
import CustomButton from "../../components/UI/CustomButton";
import CustomImagePicker from "../../components/Keeper/CustomImagePicker";

const KeeperManageScreen = (props) => {
    const dispatch = useDispatch();
    const initialValues = { title: "", description: "", image: "" };

    const onSubmit = async (values) => {
        try {
            await dispatch(
                keeperActions.addDocument(
                    values.title,
                    initialValues.image,
                    new Date().toISOString(),
                    values.description
                )
            );
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
                            <CustomImagePicker onImageTaken={onImageTaken} />
                            <CustomTextInput
                                label="Title"
                                onChangeText={handleChange("title")}
                                value={values.title}
                            />
                            <CustomTextInput
                                label="Description"
                                onChangeText={handleChange("description")}
                                value={values.description}
                            />
                            <CustomButton
                                style={styles.submitButton}
                                title="Submit"
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
