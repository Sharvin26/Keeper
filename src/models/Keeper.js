import moment from "moment";

class Keeper {
    constructor(id, title, image, date, description) {
        (this.id = id),
            (this.title = title),
            (this.image = image),
            (this.date = date),
            (this.description = description);
    }

    getReadableDate = () => {
        return moment(this.date).format("MMMM Do YYYY, hh:mm");
    };
}

export default Keeper;
