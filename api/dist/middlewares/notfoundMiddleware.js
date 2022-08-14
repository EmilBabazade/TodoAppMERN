"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unknownEndpoint = (request, response) => {
    response.status(404).send({ message: 'unknown endpoint' });
};
module.exports = unknownEndpoint;
//# sourceMappingURL=notfoundMiddleware.js.map