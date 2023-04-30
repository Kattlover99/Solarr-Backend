"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const faq_controller_1 = require("./faq.controller");
const faq_service_1 = require("./faq.service");
const faq_entity_1 = require("./entities/faq.entity");
let FaqModule = class FaqModule {
};
FaqModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([faq_entity_1.Faq])],
        providers: [faq_service_1.FaqService],
        controllers: [faq_controller_1.FaqController],
        exports: [faq_service_1.FaqService]
    })
], FaqModule);
exports.FaqModule = FaqModule;
//# sourceMappingURL=faq.module.js.map