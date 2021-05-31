import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined }
}

// Auth middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next();
        return
    }
    res.status(403)
    res.send('Not permitted!')
}

const router = Router();

// Route handlers and related CB functions.
router.get('/', (req: Request, res: Response) => {
    res.send('Wow')
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
                <input name="password" type="password"/>
            </div>
            <button>Submit</button>
         </form>
    `)
})

// NB: There will be no sign up routes
router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body

    if (email && password && email === 'cheeks@gmail.com' && password === 'password') {
        // mark user as logged in.
        req.session = { loggedIn: true }
        res.redirect('/')

    }

    else {
        console.log(req.body)
        res.send('Invalid login credentials')
    }
})

router.get('/', (req: Request, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>You Are Logged In!</div>
            <a href="/logout">Logout</a>
        `)
    }
    else {
        res.send(`
            <div>You Are Not Logged In!</div>
             <a href="/login">Login</a>
        `)
    }
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined
    res.redirect('/')
})

router.get('/protected', (req: Request, res: Response) => {
    res.send('Welcome to proctected route, user!')
})

export { router };