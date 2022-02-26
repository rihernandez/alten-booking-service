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
const express_1 = __importDefault(require("express"));
const role_controller_1 = __importDefault(require("../controllers/role.controller"));
const logger_1 = require("../config/logger");
const router = express_1.default.Router();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new role_controller_1.default();
    const response = yield controller.getRoles();
    logger_1.log.silly(response);
    return res.send(response);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new role_controller_1.default();
    const response = yield controller.createRole(req.body);
    logger_1.log.silly(response);
    return res.send(response);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new role_controller_1.default();
    const response = yield controller.getRole(req.params.id);
    if (!response) {
        logger_1.log.warn(response);
        return res.status(404).send({ message: "No Role found" });
    }
    logger_1.log.silly(response);
    return res.send(response);
}));
exports.default = router;
//# sourceMappingURL=role.router.js.map