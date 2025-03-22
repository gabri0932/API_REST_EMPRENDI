export function fallbackMiddleware(req, res, next) {
    if (res.headersSent) return next();

    const requestMethod = req.method.toUpperCase();
    const path = req.path;

    res.status(404).json({
        status: 404,
        message: `The route ${requestMethod}:${path} was not found.`
    });
}
