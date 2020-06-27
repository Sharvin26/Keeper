// import React, { useState } from "react";
// import {
//     StyleSheet,
//     Text,
//     View,
//     Modal,
//     SafeAreaView,
//     TextInput,
// } from "react-native";

// import { useDispatch } from "react-redux";

// import * as walletActions from "../../redux/actions/WalletActions";
// import CustomIcons from "../UI/CustomIcons";
// import colors from "../../constants/colors";
// import { LiteCreditCardInput } from "react-native-credit-card-input";

// const ManageCard = (props) => {
//     const dispatch = useDispatch();
//     const [errors, setErrors] = useState();
//     const [formErrors, setFormErrors] = useState();
//     const [cardName, setCardName] = useState("");
//     const [cardDetails, setCardDetails] = useState({
//         cardNumber: "",
//         cardExpiry: "",
//         cardCvv: "",
//         cardType: "",
//     });
//     const [cardDescritpion, setCardDescritpion] = useState("");
//     const closeModal = () => {
//         setCardName("");
//         setCardDescritpion("");
//         setErrors(null);
//         props.closeManageModal();
//     };

//     const onChange = (form) => {
//         if (
//             form.status.number === "invalid" ||
//             form.status.expiry === "invalid" ||
//             form.status.cvc === "invalid" ||
//             form.values.number.charAt(0) == 6
//         ) {
//             setErrors("Invalid card details");
//         } else if (
//             form.status.number === "incomplete" &&
//             form.values.number < 18
//         ) {
//             setErrors(null);
//             setCardDetails({
//                 cardNumber: form.values.number,
//                 cardCvv: form.values.cvc,
//                 cardExpiry: form.values.expiry,
//                 cardType: form.values.type,
//             });
//         } else {
//             setErrors(null);
//             setCardDetails({
//                 cardNumber: form.values.number,
//                 cardCvv: form.values.cvc,
//                 cardExpiry: form.values.expiry,
//                 cardType: form.values.type,
//             });
//         }
//     };

//     const handleError = () => {
//         if (
//             cardName === "" ||
//             cardDescritpion === "" ||
//             cardDetails.cardType === "" ||
//             cardDetails.cardCvv.length < 3 ||
//             cardDetails.cardNumber.length < 19 ||
//             cardDetails.cardExpiry.length < 4 ||
//             errors
//         ) {
//             setFormErrors("All the fields are required. Please complete them.");
//             return false;
//         }
//         setFormErrors(null);
//         return true;
//     };

//     const handleSubmit = async () => {
//         if (!handleError()) return;
//         const userCard = {
//             cardName: cardName,
//             cardDescritpion: cardDescritpion,
//             cardDetails: cardDetails,
//         };
//         try {
//             await dispatch(walletActions.addCard(userCard));
//         } catch (error) {
//             setFormErrors(error.message);
//         }
//     };

//     return (
//         <Modal visible={props.isManageCardEnable} onRequestClose={closeModal}>
//             <SafeAreaView showsVerticalScrollIndicator={false}>
//                 <View style={styles.container}>
//                     <CustomIcons
//                         iconHandler={closeModal}
//                         name="md-arrow-back"
//                         color={colors.primary}
//                         size={30}
//                     />
//                     <Text style={styles.headerText}>Add a card</Text>
//                     <CustomIcons
//                         iconHandler={handleSubmit}
//                         name="md-save"
//                         color={colors.primary}
//                         size={30}
//                     />
//                 </View>
//                 <View style={styles.form}>
//                     <View>
//                         <Text style={{ ...styles.cardLabel, marginTop: 0 }}>
//                             Card Name:
//                         </Text>
//                         <TextInput
//                             placeholder="Start typing here"
//                             autoFocus={true}
//                             value={cardName}
//                             onChangeText={(text) => setCardName(text)}
//                             style={styles.cardName}
//                         />
//                     </View>
//                     <Text style={styles.cardLabel}>Card Details:</Text>
//                     <View style={styles.cardContainer}>
//                         <LiteCreditCardInput
//                             onChange={onChange}
//                             additionalInputsProps={{
//                                 number: {
//                                     maxLength: 19,
//                                 },
//                             }}
//                         />
//                     </View>
//                     <Text style={styles.cardHint}>
//                         Hint: Please click on card icon if doesn't show cvv and
//                         expiration date.
//                     </Text>
//                     {errors && <Text style={styles.errorText}>{errors}</Text>}
//                     <View>
//                         <Text style={styles.cardLabel}>Card Description:</Text>
//                         <TextInput
//                             value={cardDescritpion}
//                             placeholder="Start typing here"
//                             style={styles.description}
//                             onChangeText={(text) => setCardDescritpion(text)}
//                         />
//                     </View>
//                     {formErrors && (
//                         <Text style={styles.errorText}>{formErrors}</Text>
//                     )}
//                 </View>
//             </SafeAreaView>
//         </Modal>
//     );
// };

// export default ManageCard;

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     headerText: {
//         fontFamily: "open-sans-bold",
//         fontSize: 18,
//         paddingTop: 4,
//     },
//     form: { margin: 20 },
//     cardLabel: {
//         marginBottom: 10,
//         fontFamily: "open-sans-bold",
//         marginTop: 10,
//     },
//     cardName: {
//         borderColor: "#ccc",
//         borderWidth: 1,
//         padding: 16,
//         marginBottom: 10,
//     },
//     cardContainer: {
//         borderWidth: 1,
//         borderColor: "#ccc",
//         padding: 10,
//     },
//     cardHint: {
//         textAlign: "center",
//         paddingTop: 5,
//         color: "#ccc",
//         fontFamily: "open-sans",
//     },
//     errorText: {
//         paddingTop: 10,
//         color: "red",
//         textAlign: "center",
//         fontFamily: "open-sans-bold",
//     },
//     description: {
//         borderColor: "#ccc",
//         borderWidth: 1,
//         padding: 16,
//     },
// });

import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ManageCard = () => {
    return (
        <View>
            <Text></Text>
        </View>
    );
};

export default ManageCard;

const styles = StyleSheet.create({});
