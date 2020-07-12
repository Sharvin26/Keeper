import Card from "../../models/Card";
import {
    GET_CARDS,
    ADD_CARD,
    UPDATE_CARD,
    DELETE_CARD,
} from "../actions/cardActions";
import sortCards from "../../helpers/customSort";

const initialState = {
    cards: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CARDS:
            return {
                ...state,
                cards: sortCards(action.cards, "Date"),
            };
        case ADD_CARD:
            const newCard = new Card(
                action.card.id,
                action.card.cardName,
                action.card.cardNumber,
                action.card.cardExpiry,
                action.card.cardCvv,
                action.card.date
            );
            return {
                ...state,
                cards: sortCards(state.cards.concat(newCard), "Date"),
            };
        case UPDATE_CARD:
            const updatedCard = new Card(
                action.card.id,
                action.card.cardName,
                action.card.cardNumber,
                action.card.cardExpiry,
                action.card.cardCvv,
                action.card.date
            );
            const allCards = [...state.cards];
            const cardIndex = state.cards.findIndex(
                (card) => card.id === action.card.id
            );
            allCards[cardIndex] = updatedCard;
            return {
                ...state,
                cards: sortCards(allCards, "Date"),
            };
        case DELETE_CARD:
            return {
                ...state,
                cards: state.cards.filter((card) => card.id !== action.id),
            };
        default:
            return state;
    }
};
