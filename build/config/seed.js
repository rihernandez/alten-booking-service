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
const typeorm_1 = require("typeorm");
const logger_1 = require("./logger");
const dotenv = __importStar(require("dotenv"));
const typeorm_2 = require("typeorm");
const database_1 = __importDefault(require("./database"));
const models_1 = require("../models");
const role_repository_1 = require("../repositories/role.repository");
const models_2 = require("../models");
const user_repository_1 = require("../repositories/user.repository");
class Seed {
    constructor() {
        this.roles = [
            {
                "description": "application-admin",
                "isActive": true
            },
            {
                "description": "application-user",
                "isActive": true
            }
        ];
        this.users = [
            {
                "name": "admin",
                "username": "admin",
                "password": "Qwerty04@",
                "email": "admin@gmail.com",
                "role": 1,
                "isActive": true
            },
            {
                "name": "user",
                "username": "user",
                "password": "Qwerty04@",
                "email": "user@gmail.com",
                "role": 2,
                "isActive": true
            }
        ];
        this.execute = () => __awaiter(this, void 0, void 0, function* () {
            dotenv.config();
            (0, typeorm_2.createConnection)(database_1.default)
                .then(_connection => {
                logger_1.log.info("Database connected:", _connection.isConnected);
                this.seeding();
            })
                .catch(err => {
                logger_1.log.error("Unable to connect to db", err);
                process.exit(1);
            });
        });
        this.seeding = () => __awaiter(this, void 0, void 0, function* () {
            const role = (0, typeorm_1.getRepository)(models_1.Role);
            const user = (0, typeorm_1.getRepository)(models_2.User);
            if (((yield role.count()) == 0) && ((yield user.count()) == 0)) {
                this.roles.map((role) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, role_repository_1.createRole)(role);
                }));
                this.users.map((user) => __awaiter(this, void 0, void 0, function* () {
                    yield new Promise(resolve => setTimeout(resolve, 5000));
                    yield (0, user_repository_1.createUser)(user);
                }));
                logger_1.log.info("User and Role Entities have been seeded!");
            }
            else {
                logger_1.log.warn("User and Role have been seeded previously!");
            }
        });
    }
}
exports.default = Seed;
const seed = new Seed();
seed.execute();
//# sourceMappingURL=seed.js.map