import express from 'express';
import apiRoutes from './app/routes.js';
import { corsMiddleware } from './shared/middlewares/cors.middleware.js';
import { authRestMiddleware } from './shared/middlewares/auth.middleware.js';
import { errorsMiddleware } from './shared/middlewares/errors.middleware.js';
import { fallbackMiddleware } from './shared/middlewares/fallback.middleware.js';

const app = express()

// Top level middlewares
app.use(express.json());
app.use(corsMiddleware);
app.use(authRestMiddleware);

// Routes.
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'API Working...'
    });
});
app.use(apiRoutes);

// Bottom level middlewares.
app.use(errorsMiddleware);
app.use(fallbackMiddleware);

export default app;
