var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require("cors");

// Removed Auth const bcryptjs = require('bcryptjs');
// Removed Auth const jwt = require('jsonwebtoken');

let port = (process.env.PORT || 8080);
// Removed Auth const secretKey = 'HeartTCjwtKeySecret';
const urlDB = "mongodb+srv://projetWEBadmin:bestprojecteverdeouf@webdb.fop3b.mongodb.net/WebSiteDatabase?retryWrites=true&w=majority";

// Lance le server backend express et ajoute des options
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

/* Removed Auth // Vérifier que le user est connecté à chaque demande à l'end point (hors routes exclues)
app.use("*", (req, res, next) => {
    // Cas ou on veut se co ou autre donc on vérifie pas le token
    const pathExcluded = ["/users/login", "/users/register", "/"]

    if(pathExcluded.includes(req.originalUrl)) {
        next();
    } else {
        token = req.headers.authorization;

        if(!token) {
            res.sendStatus(401);
        } else {

            token = token.split(' ')[1];

            // Vérifie si token pas null
            if(token === null) {
                res.sendStatus(401);
            } else {

                // Vérifie exp time du token
                let tempToken = jwt.decode(token);
                
                if (Date.now() >= tempToken.exp * 1000) {
                    res.sendStatus(403);
                } else {
                    // Vérifie le token en le décryptant
                    let payload = jwt.verify(token, secretKey);
                    if(!payload) {
                        res.sendStatus(401);
                    }  else {

                        // Vérfie que l'user existe
                        if(!(User.findOne({ _id: payload.subject }))) {
                            res.sendStatus(401);
                        } else {
                            next();
                        }
                    }
                }
            }
        }
    }
});*/

// Connecte la DB
var db = mongoose.connect(urlDB, function (err, response) {
    if (err) { console.log(err); }
    else { console.log('Connected to MongoDB'); }
});

// ATTENTION :
// Les majuscules ne fonctionnent parfois pas dans l'URL d'express (que lorsque l'on teste "à la main")
// Sinon, avec les requêtes, jamais de soucis

// Route au lancement initial
app.get("/", (req, res) => {
    res.json({ message: "Serveur Backend de l'application" });
});

// -------------------------    Partie Users   -------------------------

/* Removed Auth // Route pour get tous les Users
app.get('/users', (req, res) => {
    User.find((err, Users) => {
        if (err)
            console.log(err);
        else
            res.json(Users);
    });
});

// Route pour get un user avec une adresse mail
app.get('/users/mail/:mail', (req, res) => {
    var mail = req.params.mail;

    User.findOne({ mailAddress: mail })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
});

// Route pour get un user avec un pseudo
app.get('/users/pseudo/:pseudo', (req, res) => {
    var pseudo = req.params.pseudo;

    User.findOne({ pseudo: pseudo })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
});*/

/* Removed Auth // Route pour se login
app.post("/users/login", async (req, res) => {
    const { mailAddress, password } = req.body;

    // Essaie de trouver un utilisateur avec cet email
    var user = await User.findOne({ mailAddress });

    if (!user) {
        return console.warn("No user was found with this email");
    }

    // Vérifie que les passwords sont les mêmes
    const isMatchingPassword = await bcryptjs.compare(password, user.password)

    if (!isMatchingPassword) {
        return console.warn("Password does not match with stored one");
    }

    // Création du token jwt à partir de l'user id, expiration time de 1h
    let payload = { subject: user._id };
    var token = jwt.sign(payload, secretKey, {

        expiresIn: '4h' // expires in 4 hours

         });

    res.status(200).json({ token });
})*/

/* Removed Auth // Route pour se logout
app.post("/users/logout", (req, res) => {
    res.status(200).json({ 'token' : 'removed' });
})

// Route pour vérifier si un user est login
app.post("/users/isloggedin", (req, res) => {
    res.status(200).json({ 'user' : 'logged' });
})*/


/* Removed Auth // Route pour ajouter un User
app.post("/users/register", async (req, res) => {

    const mailAddress = req.body.mailAddress;

    // Essaie de trouver un utilisateur avec cet email
    var user = await User.findOne({ mailAddress });

    if (!user) {
        const pseudo = req.body.pseudo;
        // Essaie de trouver un utilisateur avec ce pseudo
        var user = await User.findOne({ pseudo });

        if (!user) {
            req.body.password = await bcryptjs.hash(req.body.password, 12);
            let user = new User(req.body);
        
            user.save().then(() => {
                res.status(200).json({ 'issue': 'Registered successfully' });
            }).catch(err => {
                res.status(400).send('Failed to create new record');
            })
        }
    }
});*/

/* Removed Auth // Route pour get le profil
app.get("/users/profile", async (req, res) => {
    // Vérifications déjà faite dans la fonction, donc on peut utiliser le token sans problème
    token = req.headers.authorization;
    token = token.split(' ')[1];
    let payload = jwt.verify(token, secretKey);
    
    let user = await User.findOne({ _id: payload.subject });

    res.json(user);
});*/

/* Removed Auth // Route pour delete un User
app.post("/users/delete", async (req, res) => {
});*/

// -------------------------   Fin Partie Users   -------------------------

// -------------------------   Partie Cards   -------------------------

// Route pour get toutes les cartes
app.get('/cards', (req, res) => {
    Card.find((err, Card) => {
        if (err)
            console.log(err);
        else
            res.json(Card);
    });
});

// Route pour get toutes les cartes d'une race précisée
app.get('/cards/:race', (req, res) => {
    var race = req.params.race

    Card.find({ race: race })
        .then(cards => res.status(200).json(cards))
        .catch(error => res.status(404).json({ error }))
});

// -------------------------   Fin Partie Cards   -------------------------

// -------------------------   Partie Decks   -------------------------

// Route pour get tous les decks
app.get('/decks', (req, res) => {
    Deck.find((err, Deck) => {
        if (err)
            console.log(err);
        else
            res.json(Deck);
    });
});

// -------------------------   Fin Partie Decks   -------------------------

// Route d'erreur 404
app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Page not found on the server</h1>")
})

// Port d'écoute
app.listen(port, function () {
    // Debug
    console.log('App is listening on port ' + port);
});