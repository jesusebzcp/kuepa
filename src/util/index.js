import moment from "moment";

export default {
  capitalize: (text) => {
    const string = text.charAt(0).toUpperCase() + text.slice(1);

    return string;
  },
  create_id: () => {
    let date = new Date().getTime();
    const id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return id;
  },
  lastMinute: (date) => {
    const minutes = moment.duration(moment().diff(date));
    let m = minutes.minutes();
    let s = minutes.seconds();

    if (m === 0) {
      return s + " " + "s";
    } else {
      return s + " " + "mins";
    }
  },

  compareNumber: (number) => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  },
};
