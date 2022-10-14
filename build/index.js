"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hisafe_1 = __importDefault(require("./hisafe"));
function Component() {
    return (0, hisafe_1.default)("h1", null, "Hello world");
}
exports.default = Component;
