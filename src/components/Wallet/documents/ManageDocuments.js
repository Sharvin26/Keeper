import React, { useState } from "react";
import {
    StyleSheet,
    Modal,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";
import { useDispatch } from "react-redux";
import PDFReader from "rn-pdf-reader-js";
import * as DocumentPicker from "expo-document-picker";
import * as yup from "yup";
import { Formik } from "formik";

import * as documentActions from "../../../redux/actions/documentActions";
import colors from "../../../constants/colors";
import CustomIcons from "../../UI/CustomIcons";

const documentSchema = yup.object({
    label: yup.string().required("This is a required field"),
    pdfUri: yup.string().required("This is a required field"),
});

const ManageDocuments = (props) => {
    const dispatch = useDispatch();
    const [pdf, setPdf] = useState("");
    const initialValues = {
        label: "",
        pdfUri: "",
    };

    const closeModal = () => {
        setPdf(null);
        props.closeModal();
    };

    const onSubmit = (values) => {
        try {
            dispatch(
                documentActions.addDocument(
                    values.label,
                    values.pdfUri,
                    new Date().toISOString()
                )
            );
            props.closeModal();
        } catch (error) {
            console.log(error);
        }
    };

    const selectDocument = async (values) => {
        try {
            const doc = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            });
            if (doc.type !== "cancel") {
                setPdf(doc.uri);
                values.pdfUri = doc.uri;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal
            visible={props.isModalOpen}
            onRequestClose={closeModal}
            animationType="fade"
        >
            <SafeAreaView style={styles.safeAreaContainer}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={documentSchema}
                    onSubmit={onSubmit}
                >
                    {(props) => (
                        <View>
                            <View style={styles.iconContainer}>
                                <CustomIcons
                                    iconHandler={() => closeModal()}
                                    name="md-arrow-back"
                                    color={colors.primary}
                                    size={30}
                                />
                                <CustomIcons
                                    iconHandler={() => props.handleSubmit()}
                                    name="md-save"
                                    color={colors.primary}
                                    size={30}
                                    styles={styles.saveIcon}
                                />
                            </View>
                            <Text style={styles.labelText}>Document Label</Text>
                            <TextInput
                                placeholder="Start typing here"
                                autoFocus={true}
                                style={styles.input}
                                onChangeText={props.handleChange("label")}
                                value={props.values.label}
                                onBlur={props.handleBlur("label")}
                                touched={props.touched.label}
                                error={props.errors.label}
                            />
                            {props.touched.label && props.errors.label && (
                                <Text style={styles.errorText}>
                                    {props.touched.label && props.errors.label}
                                </Text>
                            )}

                            <TouchableOpacity
                                activeOpacity={pdf ? 0.9 : 0.2}
                                style={styles.uploadContainer}
                                onPress={() =>
                                    pdf ? null : selectDocument(props.values)
                                }
                            >
                                {pdf ? (
                                    <View style={styles.pdfContainer}>
                                        <PDFReader
                                            source={{
                                                uri: pdf,
                                            }}
                                        />
                                        <View
                                            style={{
                                                marginTop: 5,
                                            }}
                                        >
                                            <Button
                                                title="Change pdf"
                                                color="black"
                                                onPress={() =>
                                                    selectDocument(props.values)
                                                }
                                            />
                                        </View>
                                    </View>
                                ) : (
                                    <Text>Upload a PDF</Text>
                                )}
                            </TouchableOpacity>
                            {props.touched.pdfUri && props.errors.pdfUri && (
                                <Text style={styles.errorText}>
                                    {props.touched.pdfUri &&
                                        props.errors.pdfUri}
                                </Text>
                            )}
                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </Modal>
    );
};

export default ManageDocuments;

const styles = StyleSheet.create({
    safeAreaContainer: { flex: 1, margin: 20 },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    saveIcon: { marginRight: 10 },
    labelText: {
        marginLeft: 2,
        marginTop: 10,
        fontFamily: "open-sans-bold",
        fontSize: 18,
    },
    input: {
        padding: 10,
        paddingLeft: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginTop: 5,
        fontFamily: "open-sans-bold",
        fontSize: 14,
    },
    uploadContainer: {
        marginTop: 20,
        width: "100%",
        height: "70%",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "black",
        borderStyle: "dotted",
        justifyContent: "center",
        alignItems: "center",
    },
    pdfContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    uploadText: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
    },
});
