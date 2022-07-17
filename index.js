const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

app.use(express.static('public'));
require("dotenv").config();


const db = require('./models');
const { Users, Messengers, Buttons } = require("./models");


app.get('/api/data/', async (req, res) => {
    const username = req.headers.username;
    // include: [Likes, Ratings]
    const data = await Users.findOne({ where: { username: username }, include: [{ model : Messengers ,
        include: {
            model : Buttons
        } 
    }] });
    console.log(data);
    res.json(data);
});


app.post('/api/data/', async (req, res) => {
    const {userName, data} = req.body;
    console.log(data);
    const answer = await Users.findOne({ where: { username: userName }});
    if (!answer) {
        await Users.create({
            username: userName,
        });
        data.map(async (messenger)  => {
            const {name, text, viewType, buttons} = messenger;
            const findUser = await Users.findOne({ where: { username: userName }});
            
            await Messengers.create({
                messengerName: name,
                text: text,
                inline: viewType,
                buttonsCount: buttons == null ? 0 : buttons.length,
                UserId: findUser.dataValues.id,
            });

            const findMessenger = await Messengers.findOne({ where: { userId: findUser.dataValues.id, messengerName: name }});
        
            (buttons != null) &&
            buttons.map(async (button, index) => {
                console.log(button);
                const {text, id, link} = button;
                

                await Buttons.create({
                    number: id,
                    text: text, 
                    link: link,
                    MessengerId: findMessenger.dataValues.id,
                });
            });
            
        })
    
    } else {
        data.map(async (messenger)  => {
            const {name, text, viewType, buttons} = messenger;
            const findUser = await Users.findOne({ where: { username: userName }});
            

            const currentMessenger = await Messengers.findOne({ where: { UserId: findUser.dataValues.id, messengerName: name } });

            await currentMessenger.update({
                text: text,
                inline: viewType,
                buttonsCount: buttons == null ? 0 : buttons.length,
            });
            await currentMessenger.save()


            await Buttons.destroy({ where: { MessengerId: currentMessenger.id} });
        
            (buttons != null) &&
            buttons.map(async (button, index) => {
                console.log(button);
                const {text, id, link} = button;
                

                await Buttons.create({
                    number: id,
                    text: text, 
                    link: link,
                    MessengerId: currentMessenger.id,
                });
            });
            
        })
    }

    

    res.send('hello world');
});



db.sequelize
    .sync().
    then(() => {
    app.listen(process.env.PORT || 3001, () => {
        console.log("server running on 'port 3001");
    });
})
    .catch((err) => {
        console.log(err);
    }); 