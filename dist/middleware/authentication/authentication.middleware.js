"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../error/errors");
class AuthenticationMiddleware {
    constructor(jwtHelper) {
        this.auth = async (req, _res, next) => {
            var _a, _b;
            const accessToken = (_b = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) !== null && _b !== void 0 ? _b : req.header("Authorization");
            if (!accessToken) {
                throw new errors_1.UnauthorizedError("login to continue");
            }
            const splitToken = accessToken.split(" ");
            if (splitToken[0] !== "Bearer") {
                throw new errors_1.NotFoundError("access token must be of Bearer type");
            }
            const token = splitToken[1];
            if (!token) {
                throw new errors_1.UnauthorizedError("Token error!");
            }
            const verifyToken = await this.jwtHelper.verifyToken(token);
            if (!verifyToken) {
                throw new errors_1.UnauthorizedError("token not verified!");
            }
            const decodedData = await this.jwtHelper.decodeToken(token);
            req.payload = decodedData;
            next();
        };
        this.jwtHelper = jwtHelper;
    }
}
exports.default = AuthenticationMiddleware;
