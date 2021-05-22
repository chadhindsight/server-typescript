import express, { Request, Response } from 'express';

const app = express();

// Route handlers
app.get('/', (req: Request, res: Response) => {
    res.send(`
        <div> 
            <h1>Hello!</h1>
        </div>
    `)
})

app.listen(3000, () => {
    console.log('Listening on Port 3000! ')
})