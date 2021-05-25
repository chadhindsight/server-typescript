import { Router, Request, Response } from 'express';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

const router = Router();

// Route handlers
router.get('/', (req: Request, res: Response) => {
    res.send('Wow ')
})

router.get('/login', (req, res) => {
    res.send(`
         <form method="POST">
            <div>
                <label>Email </label>
                <input name="email" />
            </div>
            <div>
                <label>Password</label>
                <input naem="password" type="password"/>
            </div>
            <button>Submit</button>
         </form>
    `)
})

// NB: There will be no sign up routes
router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body

    if (email) {
        res.send(email.toUpperCase())
    }
    else {
        res.send('You must submit an email! ')
    }
})

export { router };