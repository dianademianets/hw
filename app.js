const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const userspath = path.join(__dirname, 'userslist', 'users.json');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));


app.get('/users', (req, res) => {

    fs.readFile(userspath, ((err, data) => {
        if (err) {
            res.render('error');
            return
        }

        const users = JSON.parse(data.toString());
        res.render('users',{users});
        console.log(users);
    }))
})


app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', (req, res) => {
    const {password, mail} = req.body;

    console.log(req.body);
    fs.readFile(userspath, ((err1, data) => {
        if (err1) {
            res.render('error');
            return
        }
        const users = JSON.parse(data.toString());
        const findUser = users.find(user => user.mail === mail && user.password === password);
        if (!findUser) {
            res.redirect('/error');
            return
        }
        res.redirect('/users');
        console.log(users)
    }))
});


app.get('/registration', (req, res) => {
    res.render('registration');
});
app.get('/error', (req, res) => {
    res.render('error');
})

app.post('/registration', (req, res) => {
    const {mail} = req.body;

    console.log(req.body);
    fs.readFile(userspath, ((err2, data) => {
        if (err2) {
            res.render('error');
            return
        }

        const users = JSON.parse(data.toString());
        const findUser = users.find(user => user.mail === mail);

        if (!findUser) {
            users.push(req.body);
            fs.writeFile(userspath, JSON.stringify(users), (err3) => {
                if (err3) {
                    res.render('error');
                }
            });
            res.redirect('/users');
            return

        }
        res.redirect('/error');
    }))
});

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;

    console.log(req.params);
    fs.readFile(userspath, (err4, data) => {
        if (err4) {
            console.log(err4);
            return;
        }
    const users = JSON.parse(data.toString());
    res.render('user', {user: users[userId]});
})});


app.listen(5000, () => {
    console.log('App listen 5000');
})

