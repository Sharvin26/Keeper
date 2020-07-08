import {
    GET_MOMENTS,
    ADD_MOMENT,
    EDIT_MOMENT,
    DELETE_MOMENT,
    SEARCH_MOMENTS,
    SORT_MOMENTS,
} from "../actions/momentActions";
import Moment from "../../models/Moment";
import sortDocs from "../../helpers/customSort";
var _ = require("lodash");

const initialState = {
    moments: [],
    searchMoments: [],
    sortType: "Date",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MOMENTS:
            const docs = sortDocs(action.moments, state.sortType);
            return {
                ...state,
                moments: docs,
            };
        case ADD_MOMENT:
            const newMoment = new Moment(
                action.moment.id,
                action.moment.title,
                action.moment.image,
                action.moment.date,
                action.moment.description
            );
            return {
                ...state,
                moments: sortDocs(
                    state.moments.concat(newMoment),
                    state.sortType
                ),
            };
        case EDIT_MOMENT:
            const updatedMoment = new Moment(
                action.moment.id,
                action.moment.title,
                action.moment.image,
                action.moment.date,
                action.moment.description
            );
            const allMoments = [...state.moments];
            const momentIndex = state.moments.findIndex(
                (moment) => moment.id === action.moment.id
            );
            allMoments[momentIndex] = updatedMoment;
            return {
                ...state,
                moments: sortDocs(allMoments, state.sortType),
            };
        case DELETE_MOMENT:
            return {
                ...state,
                moments: state.moments.filter(
                    (moment) => moment.id !== action.id
                ),
            };
        case SEARCH_MOMENTS:
            const filteredMoments = _.filter(state.moments, (moment) =>
                _.toLower(moment.title).includes(_.toLower(action.value))
            );
            let searchResult = "available";
            if (filteredMoments.length === 0) {
                searchResult = "empty";
            }
            return {
                ...state,
                searchMoments: filteredMoments,
                searchResult,
            };
        case SORT_MOMENTS:
            const allDocs = [...state.moments];
            let sortedMoments = sortDocs(allDocs, action.sortType);
            state.sortType = action.sortType;
            return {
                ...state,
                moments: sortedMoments,
            };
        default:
            return state;
    }
};
