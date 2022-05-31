// export {port};

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var cors = require("cors");

// Removed Auth const User = require('./users');
const Card = require('./cards');
const Deck = require('./decks');

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
// app.use(express.static('./dist/web'));

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

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/web/'}),
// );

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

// Serveur qui gère les sockets pour faire du temps réel

// On appelle les modules utiles
// let app1 = express();
// app1.use(cors());
// console.log('Trying to start sockets...');
// let http = require('https');
// let server = http.Server(app);
// const port1 = 3000;

// // On accepte les requêtes du server angular
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "https://hearttc.herokuapp.com",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// });

// // Variable pour gérer les utilisateurs et les salles
// // On crée un objet room
// class Room {
//   constructor(id) {
//     this.roomID = id;
//     var user1;
//     var pawnUser1;
//     var user2;
//     var pawnUser2;
//     var ready;
//     var resultat;

//     var Player1state;
//     var player1Hand = [];
//     var Player1deck = [];

//     var Player2deck = [];
//     var player2Hand = [];
//     var Player2state;

//     this.annonce = "Début de la partie !";
//   }
// }
// var rooms = [];

// //définis l'état de la partie l'état est mis à jour à chaque fight puis envoit aux joueurs
// class PlayerState {
//   constructor() {
//     this.player = "Joueur";
//     this.hp = 10;
//     this.deckSize = 20;
//     this.energie = 2;
//     this.deckType = 0;
//     var cardChosen;
//   }
// }
// // Les fonctions necessaires au combat

// function parseEffect(search, origin) {
//   var present = false
//   for (var i = 0; i < origin.effect.length; i++) {
//     if (origin.effect[i] == search) {
//       present = true
//     }
//   }
//   return present
// }
// //Méthode appelée avant d'attaquer PREND TJ LA CARTE DU J1 EN PREMIER ET J2 EN 2EME
// function preFight(origin, target, room) {

//   let J1 = rooms[room].Player1state;
//   let J2 = rooms[room].Player2state;

//   if (typeof (origin.readyness != "number")) {
//     origin.readyness = 0
//   }
//   if (typeof (target.readyness != "number")) {
//     target.readyness = 0
//   }

//   //Effet Silence -> A CONSERVER EN PREMIERE POSITION
//   silence1 = false
//   silence2 = false
//   if (parseEffect("Silence", origin) == true) {
//     silence1 = true
//   }
//   if (parseEffect("Silence", target) == true) {
//     silence2 = true
//   }
//   if (silence1) {
//     target.effectText = "Réduit au silence"
//     for (var i = 0; i < target.effect.length; i++) {
//       target.effect[i] = ""
//     }
//   }
//   if (silence2) {
//     origin.effectText = "Réduit au silence"
//     for (var i = 0; i < origin.effect.length; i++) {
//       origin.effect[i] = ""
//     }
//   }
//   //Fin Effet Silence

//   //Effet Sacrifice
//   if (parseEffect("Sacrifice", origin) == true && origin.readyness == 0) {
//     if (J1.hp > J1.hp - origin.effectDmg) {
//       J1.hp = J1.hp - origin.effectDmg;
//     }
//     else {
//       J1.hp = 1
//     }
//   }
//   if (parseEffect("Sacrifice", target) == true && target.readyness == 0) {
//     if (J2.hp > J2.hp - target.effectDmg) {
//       J2.hp = J2.hp - target.effectDmg;
//     }
//     else {
//       J2.hp = 1
//     }
//   }
//   //Fin Sacrifice

//   //Effet SacrificeAll
//   if (parseEffect("SacrificeAll", origin) == true && origin.readyness == 0) {
//     if (J1.hp > J1.hp - origin.effectDmg) {
//       J1.hp = J1.hp - origin.effectDmg;
//     }
//     else {
//       J1.hp = 1
//     }
//     if (J2.hp > J2.hp - target.effectDmg) {
//       J2.hp = J2.hp - target.effectDmg;
//     }
//     else {
//       J2.hp = 1
//     }
//   }
//   if (parseEffect("SacrificeAll", target) == true && target.readyness == 0) {
//     if (J2.hp > J2.hp - target.effectDmg) {
//       J2.hp = J2.hp - target.effectDmg;
//     }
//     else {
//       J2.hp = 1
//     }
//     if (J1.hp > J1.hp - origin.effectDmg) {
//       J1.hp = J1.hp - origin.effectDmg;
//     }
//     else {
//       J1.hp = 1
//     }
//   }
//   //Fin SacrificeAll

//   //Effet AtkFace
//   if (parseEffect("AtkFace", origin) == true) {
//     J2.hp = J2.hp - origin.effectDmg
//   }
//   if (parseEffect("AtkFace", target) == true) {
//     J1.hp = J1.hp - target.effectDmg
//   }
//   //Fin AtkFace

//   //Effet FaceOnce
//   if (parseEffect("FaceOnce", origin) == true && origin.readyness == 0) {
//     J2.hp = J2.hp - origin.effectDmg
//   }
//   if (parseEffect("FaceOnce", target) == true && target.readyness == 0) {
//     J1.hp = J1.hp - target.effectDmg
//   }
//   //Fin FaceOnce

//   //Effect Heal
//   if (parseEffect("Heal", origin) == true && origin.readyness == 0) {
//     J1.hp = J1.hp + origin.effectSize
//   }
//   if (parseEffect("Heal", target) == true && target.readyness == 0) {
//     J2.hp = J2.hp + target.effectSize
//   }
//   //Fin EffectHeal

//   //Effet Platoon
//   if (parseEffect("Platoon", origin) == true && origin.readyness == 0) {
//     for (i = 0; i < rooms[room].player1Hand.length; i++) {
//       if (parseEffect("Block", rooms[room].player1Hand[i]) == true) {
//         rooms[room].player1Hand[i].blockSize = rooms[room].player1Hand[i].blockSize + origin.effectSize
//         rooms[room].player1Hand[i].effectText = rooms[room].player1Hand[i].effectText + " // Protection + II"
//       }
//       else {
//         rooms[room].player1Hand[i].effect.push("Block")
//         rooms[room].player1Hand[i].blockSize = origin.effectSize
//         rooms[room].player1Hand[i].effectText = rooms[room].player1Hand[i].effectText + " // Protection II : Réduit les dégâts reçus"
//       }
//     }
//   }
//   if (parseEffect("Platoon", target) == true && target.readyness == 0) {
//     for (i = 0; i < rooms[room].player2Hand.length; i++) {
//       if (parseEffect("Block", rooms[room].player2Hand[i]) == true) {
//         rooms[room].player2Hand[i].blockSize = rooms[room].player2Hand[i].blockSize + target.effectSize
//         rooms[room].player2Hand[i].effectText = rooms[room].player2Hand[i].effectText + " // Protection + II"
//       }
//       else {
//         rooms[room].player2Hand[i].effect.push("Block")
//         rooms[room].player2Hand[i].blockSize = target.effectSize
//         rooms[room].player2Hand[i].effectText = rooms[room].player2Hand[i].effectText + " // Protection II : Réduit les dégâts reçus"
//       }
//     }
//   }
//   //Fin Platoon

//   //Effet Mastermind
//   if (parseEffect("Mastermind", origin) == true && origin.readyness == 0) {
//     for (i = 0; i < rooms[room].player1Hand.length; i++) {
//       rooms[room].player1Hand[i].current_atk = rooms[room].player1Hand[i].current_atk + origin.effectSize
//       rooms[room].player1Hand[i].current_def = rooms[room].player1Hand[i].current_def + origin.effectSize
//     }
//   }
//   if (parseEffect("Mastermind", target) == true && target.readyness == 0) {
//     console.log("ici")
//     for (i = 0; i < rooms[room].player2Hand.length; i++) {
//       rooms[room].player2Hand[i].current_atk = rooms[room].player2Hand[i].current_atk + target.effectSize
//       rooms[room].player2Hand[i].current_def = rooms[room].player2Hand[i].current_def + origin.effectSize
//     }
//   }
//   //Fin Mastermind

//   return 1
// }

// //La méthode pour attaquer qui appelle la méthode de défense et applique les effets à l'attaque
// function attacking(origin, target) {
//   console.log(origin.name)
//   console.log(origin.current_atk)
//   var dmg = origin.current_atk
//   origin.atknumber = origin.atknumber + 1
//   //Effet AtkBuff
//   if (parseEffect("AtkBuff", origin) == true) {
//     origin.current_atk = origin.current_atk + this.atkbuff
//     origin.current_def = origin.current_def + this.defbuff
//   }
//   //Fin AtkBuff

//   //Effet Frenzy
//   if (parseEffect("Frenzy", origin) == true && origin.atknumber < 2) {
//     dmg=dmg*2
//   }
//   //Fin Frenzy

//   if (parseEffect("NoBlock", origin) == true) {
//     defending(dmg, target, true, false)
//   }
//   else {
//     defending(dmg, target, true, true)
//   }
//   if (parseEffect("Poison", origin) == true) {
//     defending(origin.effectDmg, target, false, true)
//   }
//   return 1;
// }
// //La méthode pour défendre et appliquer les effets
// function defending(dmg, origin, lethal, block) {

//   //Effet DivineShield
//   if (parseEffect("DivineShield", origin) == true && origin.readyness == 0 && block == true) {
//     dmg = 0
//   }
//   //Effet Block
//   if (parseEffect("Block", origin) == true && block == true) {
//     dmg = dmg - origin.blockSize
//     if (dmg < 0) {
//       dmg = 0
//     }
//   }
//   //Fin Effet Block

//   //On gère le cas de figure des dégâts non léthaux
//   if (lethal == false && origin.current_def > 0) {
//     origin.current_def = origin.current_def - dmg;
//     if (origin.current_def < 0) {
//       origin.current_def = 1
//     }
//   }
//   if (lethal == true) {

//     origin.current_def = origin.current_def - dmg;
//   }



//   return 1;
// }
// //Méthode appelée à chaque fin de tour 
// function endTurn(origin, J1, J2) { //J1 est le joueur possédant la carte, J2 son adversaire

//   origin.atknumber = 0

//   //Effect Metamorphose
//   if (parseEffect("Metamorphose", origin) == true && origin.readyness == 0 && origin.def > 0) {
//     origin.name = origin.newName
//     origin.img = origin.newImg
//     origin.atk = origin.newAtk
//     origin.current_atk = origin.newAtk
//     origin.def = origin.newDef
//     origin.current_def = origin.newDef
//     origin.effect = origin.newEffect
//     origin.effectText = origin.newEffectText
//   }
//   //Fin Metamorphose

//   //effect DeathFace
//   if (parseEffect("DeathFace", origin) == true && origin.def <= 0) {
//     J2.hp = J2.hp - origin.effectDmg
//   }

//   origin.readyness = origin.readyness + 1

//   return 1
// }

// // la fonction qui va effectuer le combat de cartes PAS ENCORE PRÊTE NE PAS Y TOUCHER
// //NE PAS Y TOUCHER
// function fight(room) {
//   let J1 = rooms[room].Player1state;
//   let J2 = rooms[room].Player2state;
//   let resultat;
//   console.log("Fight starting between " + J1 + " and " + J2);
//   console.log("Utilisateur 1 a choisi " + J1.cardChosen.name);

//   // Les cartes s'affrontent et le joueur perds des pvs
//   preFight(J1.cardChosen, J2.cardChosen, room)
//   attacking(J2.cardChosen, J1.cardChosen)
//   attacking(J1.cardChosen, J2.cardChosen)
//   endTurn(J1.cardChosen, J1, J2)
//   endTurn(J2.cardChosen, J2, J1)

//   //J1.cardChosen.current_def = J1.cardChosen.current_def - J2.cardChosen.current_atk
//   //J2.cardChosen.current_def = J2.cardChosen.current_def - J1.cardChosen.current_atk

//   // En fonction des pvs restants, on gagne la carte ou non
//   if (J2.cardChosen.current_def > 0 && J1.cardChosen.current_def <= 0) {
//     // Le joueur 1 perd des points de vie équivalents au dépassement de dégats sur sa carte
//     J1.hp = J1.hp + J1.cardChosen.current_def;

//     // player 2 récupère sa carte et la carte de player1 meurt
//     //remise à l'etat de base de la carte du J2
//     J2.cardChosen.current_def = J2.cardChosen.def;
//     J2.cardChosen.current_atk = J2.cardChosen.atk;
//     // Annonce le résultat
//     rooms[room].annonce = "Le Joueur 2 a gagné la bataille !";
//     resultat=2;
//   }
//   else if (J1.cardChosen.current_def > 0 && J2.cardChosen.current_def <= 0) {
//     // Le joueur 2 perd des points de vie équivalents au dépassement de dégats sur sa carte
//     J2.hp = J2.hp + J2.cardChosen.current_def;

//     // player 1 récupère sa carte et la carte de player2 meurt
//     //remise à l'état de base de la carte

//     // Annonce le résultat
//     rooms[room].annonce = "Le Joueur 1 a gagné la bataille !";
//     resultat=1;
//   }
//   else if (J1.cardChosen.current_def <= 0 && J2.cardChosen.current_def <= 0) {// dans le cas ou aucune des deux cartes ne l'emporte soit par deux KO:
//     // Les deux joueurs perdent des points de vie équivalents au dépassement de dégats sur sa carte


//     //les deux cartes meurent

//     // Annonce le résultat
//     rooms[room].annonce = "Egalité";
//     resultat=3;
//   }
//   else if (J1.cardChosen.current_def > 0 && J2.cardChosen.current_def > 0) {// dans le cas ou les deux cartes survivent
//     //les deux cartes survivent et restent sur le plateau(!!!!!!!!!!!! a faire !!!!!!!!!!)


//     // Annonce le résultat
//     rooms[room].annonce = "Egalité";
//     resultat=0
//   }



//   //vérifie que la partie n'est pas terminée
//   if (J2.hp <= 0 && J1.hp <= 0) {
//     rooms[room].resultat = "Egalité";
//     return 1;
//   }
//   else if (J2.hp <= 0) {
//     rooms[room].resultat = "Le Joueur 1 a gagné la partie !";
//     return 1;
//   }
//   else if (J1.hp <= 0) {
//     rooms[room].resultat = "Le Joueur 2 a gagné la partie !";
//     return 1;
//   } else {
//     // Comble les main de 3 cartes
//     // Vérifie que le deck a encore des cartes
//     if (rooms[room].pawnUser2.name!=J2.cardChosen.name){
//       if (rooms[room].Player1deck.length > 0 && (resultat==2||resultat==3)) {
//         for (let i = 0; i < 3; i++) {
//           if (rooms[room].player1Hand[i].id == J1.cardChosen.id) {
//             console.log(" carte 1 trouvee");
//             rooms[room].player1Hand[i] = rooms[room].Player1deck[0];
//             rooms[room].Player1deck.shift();
//           }
          
//         }
//         J1.cardChosen=rooms[room].pawnUser1;
//       }
//     }
//     // Vérifie que le deck a encore des cartes
//     if (rooms[room].pawnUser2.name!=J2.cardChosen.name){
//       if (rooms[room].Player2deck.length > 0 && (resultat==1||resultat==3)) {
//         for (let i = 0; i < 3; i++) {
//           if (rooms[room].player2Hand[i].id == J2.cardChosen.id) {
//             console.log(" carte 2 trouvee");
//             rooms[room].player2Hand[i] = rooms[room].Player2deck[0];
//             rooms[room].Player2deck.shift()
//           }
//         }
//         J2.cardChosen=rooms[room].pawnUser2;
//       }
//     }
//     J1.deckSize = rooms[room].Player1deck.length;
//     J2.deckSize = rooms[room].Player2deck.length;
//     rooms[room].Player1state = J1;
//     rooms[room].Player2state = J2;
//     return 0
//   }
// }

// // Quand un user se connecte au serveur
// io.on('connection', (socket) => {
//   console.log("User " + socket.id + " connected"); // On log sur la console

//   // Quand un user se connecte à une salle
//   socket.on('connectToRoom', (roomID) => {

//     console.log('User ' + socket.id + ' connecting to ' + roomID + "..."); // On log sur la console

//     // On test si la salle existe déjà
//     let test = false;
//     for (let i = 0; i < rooms.length; i++) { // On met le joueur dans sa salle
//       if (rooms[i].roomID == roomID) {
//         console.log('la salle :' + roomID + ' existe déjà');
//         test = true;
//       }
//     }
//     if (test == false) { // Si cette salle n'est pas contenu dans la liste
//       let room = new Room(roomID);
//       rooms.unshift(room)// Ajoute une salle au début de la liste
//       room.user1 = socket.id;
//       socket.join(roomID);
//       console.log('User connecté sur la salle :' + roomID);
//     }

//     // On met le joueur dans sa salle
//     for (let i = 0; i < rooms.length; i++) {
//       if (rooms[i].roomID == roomID) {
//         if (rooms[i].user1 != null && rooms[i].user2 != null) {
//           console.log("La salle est déjà pleine!")
//           break;
//         }
//         if (rooms[i].user1 == null && rooms[i].user2 != socket.id) {
//           rooms[i].user1 = socket.id;
//           console.log('User connecté sur la salle ' + roomID);
//           socket.join(roomID); // Le user rejoint la salle correspondante
//         }
//         if (rooms[i].user2 == null && rooms[i].user1 != socket.id) {
//           rooms[i].user2 = socket.id;
//           console.log('User connecté sur la salle ' + roomID);
//           socket.join(roomID); // Le user rejoint la salle correspondante
//         }
//         if (rooms[i].user1 != null && rooms[i].user2 != null) {
//           io.to(roomID).emit('StartGame', "true"); // On commence la partie
//           console.log("Starting game in room " + roomID + " with " + rooms[i].user1 + " and " + rooms[i].user2);
//         }
//       }
//     }
//   });

//   //Quand on reçoit le deck du joueur en début de partie
//   socket.on('sendDeck', (deck, roomID, deckType, hp, pion) => {
//     //on cherche la salle
//     console.log('carte pion : ' + pion);
//     for (let i = 0; i < rooms.length; i++) {
//       if (rooms[i].roomID == roomID) {
//         //on pioche pour le joueur on donne le deck au joueur puis on lui donne les cartes piochées
//         //pioche
//         deck.sort(() => Math.random() - 0.5);// on mélange le deck
//         let mainJoueur = [];
//         mainJoueur.push(pion);
//         for (let i = 0; i < 3; i++) {
//           mainJoueur.push(deck[1]);
//           deck.shift()
//         }
//         console.log('deck reçu');
//         //donne le deck et la main initiale au joueur
//         if (rooms[i].user1 == socket.id) {
//           rooms[i].Player1deck = deck;
//           rooms[i].pawnUser1=pion;
//           rooms[i].Player1state = new PlayerState();
//           rooms[i].Player1state.hp=hp;
//           rooms[i].Player1state.deckType = deckType;
//           rooms[i].Player1state.player = "Joueur 1";
//           rooms[i].player1Hand = mainJoueur;
//           //il faut emit la main du joueur pour qu'il la connaisse
//         } else if (rooms[i].user2 == socket.id) {
//           rooms[i].Player2deck = deck;
//           rooms[i].pawnUser2=pion;

//           rooms[i].Player2state = new PlayerState();
//           rooms[i].Player2state.hp=hp;
//           rooms[i].Player2state.deckType = deckType;
//           rooms[i].Player2state.player = "Joueur 2";
//           rooms[i].player2Hand = mainJoueur;
//         }
//         if (rooms[i].user1 != null && rooms[i].user2 != null) {//quand les deux joueurs sont présents on leur envoit leurs cartes
//           io.to(rooms[i].user1).emit('GameState', rooms[i].Player1state, rooms[i].Player2state, rooms[i].player1Hand, rooms[i].annonce);
//           io.to(rooms[i].user2).emit('GameState', rooms[i].Player2state, rooms[i].Player1state, rooms[i].player2Hand, rooms[i].annonce);
//         }
//       }
//     }
//   });


//   // Quand un user envoie un message dans le tchat
//   socket.on('message', ({ data, roomID }) => {
//     console.log(data.message + ': message sent in room ' + roomID.roomID);
//     io.to(roomID.roomID).emit('new message', { message: (socket.id + " said: " + data.message) });
//   });

//   // Quand un user choisi la carte qu'il veut jouer
//   socket.on('chooseCard', (data) => {
//     console.log(data.name + ': card received');
//     // On cherche qui est l'autre user dans la salle
//     for (let i = 0; i < rooms.length; i++) {
//       if (rooms[i].user1 == socket.id) {
//         /*if (data.cost > rooms[i].Player1state.energie){
//           io.to(rooms[i].user1).emit('choixCarteInvalide',rooms[i].Player1state.cardChosen);
//         }else{
//         rooms[i].Player2state.energie=rooms[i].Player2state.energie-data.cost;
//           */
//         rooms[i].Player1state.cardChosen = data;
//         io.to(rooms[i].user2).emit('card chosen', data);
//         //}
//         //on met cette carte en carte choisie par le joueur
//       }
//       if (rooms[i].user2 == socket.id) {
//         /*
//         if (data.cost > rooms[i].Player2state.energie){
//           io.to(rooms[i].user2).emit('choixCarteInvalide',rooms[i].Player2state.cardChosen);
//         }else{
//         rooms[i].Player2state.energie=rooms[i].Player2state.energie-data.cost;
//           */
//         rooms[i].Player2state.cardChosen = data;
//         io.to(rooms[i].user1).emit('card chosen', data);
//         //}
//       }
//     }
//   });
//   //quand on est pret pour combattre
//   socket.on('readyToFight', (roomID) => {
//     console.log('player ready');
//     for (let i = 0; i < rooms.length; i++) {
//       if (rooms[i].roomID == roomID) { // On selectionne la salle en cours
//         if (rooms[i].ready != 1) {//On regarde si l'autre joueur est prêt. Si il ne l'est pas, on marque le compteur pour prévenir qu'on l'est
//           rooms[i].ready = 1//si il ne l'est pas on dit qu'on l'est
//         } else {//si il l'est on effectue le combat on réinitialise le compteur de joueur prêts et on envoit le nouvel état de la partie aux deux joueurs
//           console.log('fight');
//           rooms[i].ready = 0;
//           result = fight(i);// on effectue le fight
//           //si les deux joueurs ont encore de la vie on envoie aux joueurs le nouvel etat de la partie
//           if (result == 0) {
//             io.to(rooms[i].user1).emit('GameState', rooms[i].Player1state, rooms[i].Player2state, rooms[i].player1Hand, rooms[i].annonce);
//             io.to(rooms[i].user2).emit('GameState', rooms[i].Player2state, rooms[i].Player1state, rooms[i].player2Hand, rooms[i].annonce);
//           } else if (result == 1) {//sinon on envoie le résultat de la partie
//             console.log('Fin de la partie');
//             io.to(roomID).emit('fin Partie', rooms[i].resultat);
//           }
//         }
//       }
//     }
//   });

//   //quand on n'est plus pret pour combattre
//   socket.on('notreadyToFight', (roomID) => {
//     console.log('player not ready');
//     for (let i = 0; i < rooms.length; i++) {
//       if (rooms[i].roomID == roomID) { // On selectionne la salle en cours
//         if (rooms[i].ready != 0) {
//           rooms[i].ready = 0
//         }
//       }
//     }
//   });

//   // Quand un user se déconnecte de la salle
//   socket.on('disconnectFromRoom', (roomID) => {
//     console.log('Utilisateurs déconnecté de la salle ' + roomID);
//     for (let i = 0; i < rooms.length; i++) { // On enlève le joueur de la salle
//       if (rooms[i].roomID == roomID) { // On selectionne la salle en cours
//         if (rooms[i].user1 == socket.id) {
//           rooms[i].user1 = null;
//         }
//         if (rooms[i].user2 == socket.id) {
//           rooms[i].user2 = null;
//         }
//         console.log("Utilisateurs restants : " + rooms[i].user1 + rooms[i].user2);
//         if (rooms[i].user1 == null && rooms[i].user2 == null) {
//           rooms[i].roomID = null;
//         }
//       }
//     }
//     console.log('Utilisateur déconnecté ' + roomID);
//   });

//   // Quand un user se déconnecte
//   socket.on('disconnect', () => {
//     for (let i = 0; i < rooms.length; i++) { // On enlève le joueur de la salle
//       if (rooms[i].user1 == socket.id || rooms[i].user2 == socket.id) {
//         if (rooms[i].user1 == socket.id) {
//           rooms[i].user1 = null;
//         }
//         if (rooms[i].user2 == socket.id) {
//           rooms[i].user2 = null;
//         }
//         console.log("Utilisateurs restants : " + rooms[i].user1 + " " + rooms[i].user2);
//         if (rooms[i].user1 == null && rooms[i].user2 == null) {
//           rooms[i].roomID = null;
//         }
//       }
//     }
//     console.log('Utilisateur déconnecté');
//   });

// });

// // On lance le serveur sur un port
// server.listen(port1, () => {
//   console.log(`Démarré sur le port : ${port}`);
// });
