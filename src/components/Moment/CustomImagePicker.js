import React from "react";
import colors from "../../constants/colors";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import CustomButton from "../../components/UI/CustomButton";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CustomImagePicker = (props) => {
    const verifyPermissions = async (use) => {
        let result;
        if (use === "camera") {
            result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        } else if (use === "gallery") {
            result = await Permissions.askAsync(Permissions.CAMERA);
        }
        if (result.status !== "granted") {
            Alert.alert(
                "Insufficient Permission",
                "You need to grant camera permission",
                [{ text: "Okay" }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async (handleChange, use) => {
        const hasPermission = await verifyPermissions(use);
        if (!hasPermission) {
            return;
        }
        let image;
        if (use === "camera") {
            image = await ImagePicker.launchCameraAsync({
                quality: 0.5,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [16, 9],
            });
        } else if (use === "gallery") {
            image = await ImagePicker.launchImageLibraryAsync({
                quality: 0.5,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [16, 9],
            });
        }
        if (!image.cancelled) {
            handleChange(image.uri);
        }
    };
    return (
        <View>
            <View style={styles.imageContainer}>
                {!props.image ? (
                    <Text>No Image added yet</Text>
                ) : (
                    <Image
                        style={styles.image}
                        source={{
                            uri: props.image,
                        }}
                    />
                )}
            </View>
            <Text style={styles.errorText}>{props.touched && props.error}</Text>
            <View style={styles.buttonContainer}>
                <CustomButton
                    style={styles.button}
                    title="Gallery"
                    onPress={takeImageHandler.bind(
                        this,
                        props.handleChange("image"),
                        "gallery"
                    )}
                />
                <CustomButton
                    style={styles.button}
                    title="Camera"
                    onPress={takeImageHandler.bind(
                        this,
                        props.handleChange("image"),
                        "camera"
                    )}
                />
            </View>
        </View>
    );
};

export default CustomImagePicker;

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: { marginEnd: 10 },
    errorText: {
        color: colors.errorColor,
        textAlign: "center",
        marginVertical: 10,
        fontFamily: "open-sans-bold",
        fontSize: 14,
    },
});
