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
exports.CreateWaterLogDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validator_1 = require("validator");
function IsISO8601Timestamp() {
    return function (target, propertyName) {
        (0, class_transformer_1.Transform)(({ value }) => {
            if (typeof value === 'string' && (0, validator_1.isISO8601)(value)) {
                return Math.floor(new Date(value).getTime() / 1000);
            }
            return value;
        })(target, propertyName);
        (0, class_validator_1.Validate)((value) => {
            return (typeof value === 'number' ||
                (typeof value === 'string' && (0, validator_1.isISO8601)(value)));
        }, {
            message: 'Must be ISO 8601 string or timestamp',
        })(target, propertyName);
    };
}
class CreateWaterLogDto {
    userId;
    date;
    intakeMl;
}
exports.CreateWaterLogDto = CreateWaterLogDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWaterLogDto.prototype, "userId", void 0);
__decorate([
    IsISO8601Timestamp(),
    __metadata("design:type", Number)
], CreateWaterLogDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWaterLogDto.prototype, "intakeMl", void 0);
//# sourceMappingURL=create-water-log.dto.js.map