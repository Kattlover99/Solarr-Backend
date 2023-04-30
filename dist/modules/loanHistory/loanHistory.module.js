"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const loanHistory_entity_1 = require("./entities/loanHistory.entity");
const loanHistory_controller_1 = require("./loanHistory.controller");
const loanHistory_service_1 = require("./loanHistory.service");
let LoanHistoryModule = class LoanHistoryModule {
};
LoanHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([loanHistory_entity_1.LoanHistory])],
        controllers: [loanHistory_controller_1.LoanHistoryController],
        providers: [loanHistory_service_1.LoanHistoryService],
        exports: [loanHistory_service_1.LoanHistoryService]
    })
], LoanHistoryModule);
exports.LoanHistoryModule = LoanHistoryModule;
//# sourceMappingURL=loanHistory.module.js.map