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
exports.initRoute = void 0;
/* eslint-disable */
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./user.router"));
const role_router_1 = __importDefault(require("./role.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
// import RoleRouter from "./role.router";
const router = express_1.default.Router();
const initRoute = router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.redirect(`${process.env.API_VERSION}/docs`);
}));
exports.initRoute = initRoute;
router.use("/auth", auth_router_1.default);
router.use("/users", user_router_1.default);
router.use("/roles", role_router_1.default);
// router.use("/users", [checkJwt], UserRouter);
exports.default = router;
//# sourceMappingURL=index.js.map