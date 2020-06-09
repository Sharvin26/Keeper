import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Formik } from "formik";
import CustomTextInput from "../../components/UI/CustomTextInput";
import CustomButton from "../../components/UI/CustomButton";
import { ScrollView } from "react-native-gesture-handler";
import CustomImagePicker from "../../components/Keeper/CustomImagePicker";

const KeeperAddScreen = () => {
    const initialValues = { title: "", description: "", image: "" };

    const onSubmit = (values) => {
        console.log(values);
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

export default KeeperAddScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 30,
    },
});
