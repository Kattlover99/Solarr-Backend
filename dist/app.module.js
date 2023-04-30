"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const config_module_1 = require("./config/config.module");
const config_service_1 = require("./config/config.service");
const s3_module_1 = require("./modules/s3/s3.module");
const user_module_1 = require("./modules/user/user.module");
const nft_module_1 = require("./modules/nft/nft.module");
const faq_module_1 = require("./modules/faq/faq.module");
const collection_module_1 = require("./modules/collection/collection.module");
const list_module_1 = require("./modules/list/list.module");
const loan_module_1 = require("./modules/loan/loan.module");
const offer_module_1 = require("./modules/offer/offer.module");
const history_module_1 = require("./modules/history/history.module");
const whitelist_module_1 = require("./modules/whitelist/whitelist.module");
const notification_module_1 = require("./modules/notification/notification.module");
const loanHistory_module_1 = require("./modules/loanHistory/loanHistory.module");
const listHistory_module_1 = require("./modules/listHistory/listHistory.module");
const offerHistory_module_1 = require("./modules/offerHistory/offerHistory.module");
const socket_module_1 = require("./modules/socket/socket.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: (configService) => configService.typeOrmConfig,
                inject: [config_service_1.ConfigService]
            }),
            schedule_1.ScheduleModule.forRoot(),
            s3_module_1.S3Module,
            user_module_1.UserModule,
            nft_module_1.NftModule,
            faq_module_1.FaqModule,
            collection_module_1.CollectionModule,
            list_module_1.ListModule,
            loan_module_1.LoanModule,
            offer_module_1.OfferModule,
            history_module_1.HistoryModule,
            whitelist_module_1.WhitelistModule,
            notification_module_1.NotificationModule,
            loanHistory_module_1.LoanHistoryModule,
            listHistory_module_1.ListHistoryModule,
            offerHistory_module_1.OfferHistoryModule,
            socket_module_1.SocketModule,
        ],
        controllers: [],
        providers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map