"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const tsoa_1 = require("tsoa");
const jwt = __importStar(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
const jwt_secret_1 = __importDefault(require("../config/jwt.secret"));
let AuthController = class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check if username and password are set
            const { username, password } = req.body;
            if (!(username && password)) {
                res.status(400).send({ message: "Formato de solicitud incorrecta" });
            }
            //Get user from database
            const userRepository = (0, typeorm_1.getRepository)(models_1.User);
            let user = new models_1.User();
            // user = await userRepository.findOneOrFail({ where: { username } });
            try {
                user = yield userRepository.findOneOrFail({ where: { username } });
            }
            catch (error) {
                res.status(401).send({ message: "Usuario o Contraseña incorrectos" });
            }
            //Check if encrypted password match
            if (!user.checkIfUnencryptedPasswordIsValid(password)) {
                res.status(401).send();
                return "Password is incorrect";
            }
            //Sing JWT, valid for 1 hour
            const token = jwt.sign({ userId: user.id, username: user.username }, jwt_secret_1.default.jwtSecret, { expiresIn: "24h" });
            const payload = {
                token: token,
                session: req.body.username,
                ip: req.headers["ip"],
                mac: req.headers["mac"],
                os: req.headers["os"],
                device: req.headers["device"],
                navigator: req.headers["navigator"],
                appVersion: req.headers["appVersion"],
                isActive: true,
            };
            //Send the jwt in the response
            res.send(token);
        });
    }
};
AuthController = __decorate([
    (0, tsoa_1.Route)("auth"),
    (0, tsoa_1.Tags)("Auth")
], AuthController);
exports.default = AuthController;
function payload(payload) {
    throw new Error("Function not implemented.");
}
/* eslint-disable */
//# sourceMappingURL=auth.controller.js.map