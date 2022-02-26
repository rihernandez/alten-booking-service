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
/* eslint-disable */
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./config/logger");
const xss_advanced_1 = __importDefault(require("xss-advanced"));
const routes_1 = __importStar(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, xss_advanced_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.static("public"));
        this.app.use(`${process.env.API_VERSION}/docs`, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
            swaggerOptions: {
                url: "/swagger.json",
            },
        }));
    }
    settings() {
        return __awaiter(this, void 0, void 0, function* () {
            dotenv.config();
            (0, typeorm_1.createConnection)(database_1.default)
                .then(_connection => {
                // log.info("Database connected:", _connection.isConnected);
                this.app.listen(process.env.API_PORT || this.port, () => {
                    logger_1.log.info("Server is running on port:", process.env.API_PORT || this.port);
                });
            })
                .catch(err => {
                logger_1.log.error("Unable to connect to db", err);
                process.exit(1);
            });
        });
    }
    routes() {
        this.app.use(routes_1.initRoute);
        this.app.use(`${process.env.API_VERSION}`, routes_1.default);
    }
}
exports.default = App;
const app = new App();
//# sourceMappingURL=index.js.map