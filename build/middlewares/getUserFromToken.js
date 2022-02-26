"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const user_repository_1 = require("../repositories/user.repository");
class userFromToken {
    getUserFromToken(_req) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = _req.headers;
            const token = headers.auth;
            const decoded = (0, jwt_decode_1.default)(JSON.stringify(token));
            const objectValues = Object.values(decoded);
            return yield (0, user_repository_1.getUser)(objectValues[0]);
        });
    }
}
exports.default = userFromToken;
//# sourceMappingURL=getUserFromToken.js.map