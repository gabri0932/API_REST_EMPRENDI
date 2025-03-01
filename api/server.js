import express from 'express';

import apiRoutes from './app/routes';
const app = express()

// Top level middlewares
app.use(express.json());

// Routes.
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'API Working...'
    });
});
app.use(apiRoutes);

// Bottom level middlewares.

export default app;
