import express from 'express';

import apiRoutes from './app/routes';
const app = express()


app.use(apiRoutes)

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'API Working...'
    });
})

export default app;
