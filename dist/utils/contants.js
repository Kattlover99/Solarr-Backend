"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILoanState = exports.IOfferState = exports.NOTIFICATION_STATUS = void 0;
exports.NOTIFICATION_STATUS = {
    OFFERED: 0,
    LOAN: 1,
};
var IOfferState;
(function (IOfferState) {
    IOfferState[IOfferState["PENDING"] = 0] = "PENDING";
    IOfferState[IOfferState["ACCEPTED"] = 1] = "ACCEPTED";
})(IOfferState = exports.IOfferState || (exports.IOfferState = {}));
var ILoanState;
(function (ILoanState) {
    ILoanState[ILoanState["ACTIVE"] = 0] = "ACTIVE";
    ILoanState[ILoanState["RETURNED"] = 1] = "RETURNED";
    ILoanState[ILoanState["BREACHED"] = 2] = "BREACHED";
})(ILoanState = exports.ILoanState || (exports.ILoanState = {}));
//# sourceMappingURL=contants.js.map