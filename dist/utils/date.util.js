"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDateTimeString = exports.toDateString = void 0;
const toDateString = (value) => {
    const year = value.getFullYear();
    const month = `0${value.getMonth() + 1}`.slice(-2);
    const date = `0${value.getDate()}`.slice(-2);
    return `${year}-${month}-${date}`;
};
exports.toDateString = toDateString;
const toDateTimeString = (value) => {
    const year = value.getFullYear();
    const month = `0${value.getMonth() + 1}`.slice(-2);
    const date = `0${value.getDate()}`.slice(-2);
    const hour = `0${value.getHours()}`.slice(-2);
    const minute = `0${value.getMinutes()}`.slice(-2);
    const second = `0${value.getSeconds()}`.slice(-2);
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};
exports.toDateTimeString = toDateTimeString;
//# sourceMappingURL=date.util.js.map