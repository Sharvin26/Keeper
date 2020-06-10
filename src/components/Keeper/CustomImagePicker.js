import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
import CustomButton from "../../components/UI/CustomButton";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CustomImagePicker = (props) => {
    const [pickedImage, setPickedImage] = useState();

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

    const takeImageHandler = async (use) => {
        const hasPermission = await verifyPermissions(use);
        if (!hasPermission) {
            return;
        }
        let image;
        if (use === "camera") {
            image = await ImagePicker.launchCameraAsync({
                quality: 0.5,
            });
        } else if (use === "gallery") {
            image = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
            });
        }
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View>
            <View style={styles.imageContainer}>
                {!pickedImage && !props.value ? (
                    <Text>No Image added yet</Text>
                ) : (
                    <Image
                        style={styles.image}
                        source={{
                            uri:
                                props.value && !pickedImage
                                    ? props.value
                                    : pickedImage,
                        }}
                    />
                )}
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    style={styles.button}
                    title="Use Gallery"
                    onPress={takeImageHandler.bind(this, "gallery")}
                />
                <CustomButton
                    style={styles.button}
                    title="Use Camera"
                    onPress={takeImageHandler.bind(this, "camera")}
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
        borderColor: "#ccc",
        borderWidth: 1,
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
});
