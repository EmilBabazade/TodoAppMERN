export const unknownEndpoint = (request, response) => {
    response.status(404).send({ message: 'unknown endpoint' });
};
//# sourceMappingURL=notfoundMiddleware.js.map