"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const list_entity_1 = require("../list/entities/list.entity");
const loanHistory_module_1 = require("../loanHistory/loanHistory.module");
const nft_entity_1 = require("../nft/entities/nft.entity");
const offer_entity_1 = require("../offer/entities/offer.entity");
const loan_entity_1 = require("./entities/loan.entity");
const loan_controller_1 = require("./loan.controller");
const loan_service_1 = require("./loan.service");
const notification_module_1 = require("../notification/notification.module");
let LoanModule = class LoanModule {
};
LoanModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([list_entity_1.List, loan_entity_1.Loan, nft_entity_1.Nft, offer_entity_1.Offer]), loanHistory_module_1.LoanHistoryModule, notification_module_1.NotificationModule],
        controllers: [loan_controller_1.LoanController],
        providers: [loan_service_1.LoanService]
    })
], LoanModule);
exports.LoanModule = LoanModule;
//# sourceMappingURL=loan.module.js.map