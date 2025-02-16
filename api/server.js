import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'API Working...'
    });
})

export default app;
