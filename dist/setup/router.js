"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicants_router_1 = __importDefault(require("../module/applicants/applicants.router"));
const express_1 = require("express");
const company_route_1 = __importDefault(require("../module/company/company.route"));
const vacancy_route_1 = __importDefault(require("../module/vacancy/vacancy.route"));
const auth_router_1 = __importDefault(require("../module/auth/auth.router"));
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.send("Hello from router");
});
router.use("/applicants", applicants_router_1.default);
router.use("/company", company_route_1.default);
router.use("/vacancy", vacancy_route_1.default);
router.use("/auth", auth_router_1.default);
exports.default = router;
