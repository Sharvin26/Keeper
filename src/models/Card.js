class Card {
    constructor(id, cardName, cardNumber, cardExpiry, cardCvv, date) {
        (this.id = id),
            (this.cardName = cardName),
            (this.cardNumber = cardNumber),
            (this.cardExpiry = cardExpiry),
            (this.cardCvv = cardCvv),
            (this.date = date);
    }
}

export default Card;
