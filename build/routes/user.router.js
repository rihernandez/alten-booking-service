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
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const password_validator_1 = __importDefault(require("password-validator"));
const logger_1 = require("../config/logger");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const user_repository_1 = require("../repositories/user.repository");
const router = express_1.default.Router();
const schema = new password_validator_1.default();
schema
    .is()
    .symbols()
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values
const malformedPassword = {
    password: [
        "Must have minimum length 8",
        "Must have maximum length 100",
        "Must have uppercase letters",
        "Must have lowercase letters",
        "Must have at least 2 digits",
        "Should not have spaces",
    ],
};
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const headers = _req.headers;
    const token = headers.auth;
    const decoded = (0, jwt_decode_1.default)(JSON.stringify(token));
    const objectValues = Object.values(decoded);
    const profile = yield (0, user_repository_1.getUser)(objectValues[0]);
    _req.query.top,
        _req.query.from,
        _req.query.dateFrom,
        _req.query.dateEnd,
        _req.query.sapForm;
    const controller = new user_controller_1.default();
    const response = yield controller.getUsers(profile === null || profile === void 0 ? void 0 : profile.id, Number((_a = _req.query) === null || _a === void 0 ? void 0 : _a.skip), Number((_b = _req.query) === null || _b === void 0 ? void 0 : _b.take));
    const results = JSON.parse(JSON.stringify(response));
    results.map((result) => {
        result.label = result.name;
    });
    logger_1.log.silly(results);
    return res.send(results);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new user_controller_1.default();
    if (schema.validate(req.body.password) == true) {
        const response = yield controller.createUser(req.body);
        logger_1.log.silly(response);
        return res.send(response);
    }
    else {
        logger_1.log.warn(malformedPassword);
        return res.status(400).send({ msg: malformedPassword });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new user_controller_1.default();
    const response = yield controller.getUser(req.params.id);
    if (!response) {
        logger_1.log.warn(response);
        return res.status(404).send({ message: "No User found" });
    }
    logger_1.log.silly(response);
    return res.send(response);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new user_controller_1.default();
    const response = yield controller.updateUserStatus(req.params.id, req.query.auth);
    if (!response) {
        logger_1.log.warn(response);
        return res.status(404).send({ message: "No User found" });
    }
    logger_1.log.silly(response);
    return res.send(response);
}));
exports.default = router;
//# sourceMappingURL=user.router.js.map