import React from "react";
import { StyleSheet, Modal, SafeAreaView } from "react-native";
import PDFReader from "rn-pdf-reader-js";

import colors from "../../../constants/colors";
import CustomIcons from "../../UI/CustomIcons";

const DocumentItemView = (props) => {
    return (
        <Modal
            visible={props.isViewModal}
            onRequestClose={props.closeViewModal}
            animationType="fade"
        >
            <SafeAreaView style={styles.iconContainer}>
                <CustomIcons
                    iconHandler={props.closeViewModal}
                    name="md-arrow-back"
                    color={colors.primary}
                    size={30}
                />
            </SafeAreaView>

            <PDFReader
                style={styles.pdf}
                source={{
                    uri: props.pdfUri,
                }}
                withScroll={true}
                withPinchZoom={true}
            />
        </Modal>
    );
};

export default DocumentItemView;

const styles = StyleSheet.create({
    iconContainer: {
        padding: 20,
        paddingStart: 20,
    },
    pdf: { width: "100%", height: "100%" },
});
