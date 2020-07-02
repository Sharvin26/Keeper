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

import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import * as keeperActions from "../../redux/actions/KeeperActions";

import CustomImagePicker from "./CustomImagePicker";
import CustomTextInput from "../UI/CustomTextInput";
import colors from "../../constants/colors";
import CustomIcons from "../UI/CustomIcons";

const keeperScheme = yup.object({
    title: yup.string().required().min(4),
    description: yup.string().required().min(20),
    image: yup.string().required(),
});

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
                        values.image,
                        new Date().toISOString(),
                        values.description
                    )
                );
            }
            props.closeManageModal();
        } catch (error) {
            Alert.alert("Error", "Something went wrong please try again", [
                { text: "Okay" },
            ]);
        }
    };

    const closeModal = () => {
        props.closeManageModal();
    };

    return (
        <Modal
            visible={props.isManageEnabled}
            animationType="slide"
            onRequestClose={closeModal}
        >
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
                            validationSchema={keeperScheme}
                            onSubmit={onSubmit}
                        >
                            {(props) => (
                                <View>
                                    <View style={styles.iconContainer}>
                                        <CustomIcons
                                            iconHandler={closeModal}
                                            name="md-arrow-back"
                                            color={colors.primary}
                                            size={30}
                                        />
                                        <Text style={styles.headerText}>
                                            {keeperId
                                                ? "Edit a Moment"
                                                : "Add a Moment"}
                                        </Text>
                                        <CustomIcons
                                            iconHandler={props.handleSubmit}
                                            name="md-save"
                                            color={colors.primary}
                                            size={30}
                                            styles={{ marginRight: 10 }}
                                        />
                                    </View>
                                    <View style={styles.formContainer}>
                                        <CustomImagePicker
                                            image={props.values.image}
                                            touched={props.touched.image}
                                            error={props.errors.image}
                                            handleChange={props.handleChange.bind(
                                                this,
                                                "image"
                                            )}
                                            handleBlur={props.handleBlur.bind(
                                                this,
                                                "image"
                                            )}
                                        />
                                        <CustomTextInput
                                            label="Title"
                                            onChangeText={props.handleChange(
                                                "title"
                                            )}
                                            value={props.values.title}
                                            onBlur={props.handleBlur("title")}
                                            touched={props.touched.title}
                                            error={props.errors.title}
                                        />
                                        <CustomTextInput
                                            multiline
                                            numberOfLines={4}
                                            label="Description"
                                            onChangeText={props.handleChange(
                                                "description"
                                            )}
                                            onBlur={props.handleBlur(
                                                "description"
                                            )}
                                            value={props.values.description}
                                            touched={props.touched.description}
                                            error={props.errors.description}
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
    iconContainer: {
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
