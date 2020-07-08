import moment from "moment";
import * as FileSystem from "expo-file-system";

import {
    fetchMoments,
    insertMoment,
    modifyMoment,
    removeMoment,
} from "../../database/momentsDb";

export const GET_MOMENTS = "GET_MOMENTS";
export const ADD_MOMENT = "ADD_MOMENT";
export const EDIT_MOMENT = "EDIT_MOMENT";
export const DELETE_MOMENT = "DELETE_MOMENT";
export const SEARCH_MOMENTS = "SEARCH_MOMENTS";
export const SORT_MOMENTS = "SORT_MOMENTS";

export const getMoments = () => {
    return async (dispatch) => {
        const dbResult = await fetchMoments();
        dispatch({
            type: GET_MOMENTS,
            moments: dbResult.rows._array,
        });
    };
};

export const addMoment = (title, image, date, description) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            const fileName = image.split("/").pop();
            const newPath = FileSystem.documentDirectory + fileName;
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            });
            const dbResult = await insertMoment(
                title,
                newPath,
                newDate,
                description
            );
            dispatch({
                type: ADD_MOMENT,
                moment: {
                    id: dbResult.insertId,
                    title,
                    image: newPath,
                    date: newDate,
                    description,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const editMoment = (
    id,
    title,
    image,
    date,
    description,
    isImageChanged
) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            let newPath = image;
            if (isImageChanged) {
                const fileName = image.split("/").pop();
                newPath = FileSystem.documentDirectory + fileName;
                await FileSystem.moveAsync({
                    from: image,
                    to: newPath,
                });
            }
            await modifyMoment(id, title, newPath, newDate, description);
            dispatch({
                type: EDIT_MOMENT,
                moment: {
                    id,
                    title,
                    image: newPath,
                    date: newDate,
                    description,
                },
            });
        } catch (error) {
            throw keeper;
        }
    };
};

export const deleteMoment = (id, image) => {
    return async (dispatch) => {
        try {
            await FileSystem.deleteAsync(image);
            await removeMoment(id);
            dispatch({
                type: DELETE_MOMENT,
                id,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const searchMoments = (value) => {
    return {
        type: SEARCH_MOMENTS,
        value,
    };
};

export const sortMoments = (sortType) => {
    return {
        type: SORT_MOMENTS,
        sortType,
    };
};
