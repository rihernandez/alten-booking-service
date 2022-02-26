"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
//Login route
router.post("/login", auth_controller_1.default.login);
//Change my password
// router.post("/change-password", [checkJwt], AuthController.changePassword);
exports.default = router;
//# sourceMappingURL=auth.router.js.map