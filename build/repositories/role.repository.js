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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoleStatus = exports.getRole = exports.createRole = exports.getRoles = void 0;
/* eslint-disable */
const models_1 = require("../models");
const typeorm_1 = require("typeorm");
const getRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getRepository)(models_1.Role);
    return repository.find();
});
exports.getRoles = getRoles;
const createRole = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getRepository)(models_1.Role);
    const role = new models_1.Role();
    return repository.save(Object.assign(Object.assign({}, role), payload));
});
exports.createRole = createRole;
const getRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getRepository)(models_1.Role);
    const role = yield repository.findOne({ id: id });
    if (!role)
        return null;
    return role;
});
exports.getRole = getRole;
const updateRoleStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = (0, typeorm_1.getRepository)(models_1.Role);
    const role = yield repository.findOne({ id: id });
    if (!role)
        return null;
    yield repository.save(role);
    return role;
});
exports.updateRoleStatus = updateRoleStatus;
//# sourceMappingURL=role.repository.js.map