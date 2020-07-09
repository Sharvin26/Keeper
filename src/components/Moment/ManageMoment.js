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
import * as momentActions from "../../redux/actions/momentActions";
import PropTypes from "prop-types";

import CustomImagePicker from "./CustomImagePicker";
import CustomTextInput from "../UI/CustomTextInput";
import colors from "../../constants/colors";
import CustomIcons from "../UI/CustomIcons";

const MomentScheme = yup.object({
    title: yup.string().required().min(4),
    description: yup.string().required().min(20),
    image: yup.string().required(),
});

const ManageMoment = (props) => {
    const dispatch = useDispatch();
    const momentId = props.id ? props.id : null;
    const editMoment = useSelector((state) =>
        state.moments.moments.find((doc) => doc.id === momentId)
    );
    const initialValues = {
        title: editMoment ? editMoment.title : "",
        description: editMoment ? editMoment.description : "",
        image: editMoment ? editMoment.image : "",
    };

    const onSubmit = async (values) => {
        try {
            if (momentId) {
                let isImageChanged = false;
                if (values.image !== editMoment.image) {
                    isImageChanged = true;
                }
                await dispatch(
                    momentActions.editMoment(
                        momentId,
                        values.title,
                        values.image,
                        new Date().toISOString(),
                        values.description,
                        isImageChanged
                    )
                );
            } else {
                await dispatch(
                    momentActions.addMoment(
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
                            validationSchema={MomentScheme}
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
                                            {momentId
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

export default ManageMoment;

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

ManageMoment.prototype = {
    id: PropTypes.number,
    closeManageModal: PropTypes.func.isRequired,
    isManageEnabled: PropTypes.bool.isRequired,
};
