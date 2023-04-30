"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListHistory = void 0;
const typeorm_1 = require("typeorm");
const core_entity_1 = require("../../../core/typeorm/core.entity");
const list_entity_1 = require("../../list/entities/list.entity");
let ListHistory = class ListHistory extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], ListHistory.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'list_id' }),
    __metadata("design:type", Number)
], ListHistory.prototype, "listId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => list_entity_1.List, (list) => list.id, {
        cascade: ['update', 'remove']
    }),
    (0, typeorm_1.JoinColumn)({ name: 'list_id' }),
    __metadata("design:type", list_entity_1.List)
], ListHistory.prototype, "list", void 0);
ListHistory = __decorate([
    (0, typeorm_1.Entity)('listhistory')
], ListHistory);
exports.ListHistory = ListHistory;
//# sourceMappingURL=listHistory.entity.js.map