const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

app.use(express.static('public'));
require("dotenv").config();


const db = require('./models');
const { Users, Messengers, Buttons } = require("./models");



// получение информации о пользователе
app.get('/api/data/', async (req, res) => {
    const username = req.headers.username;
    
    const data = await Users.findOne({
        where: { username: username }, 
        include: [{
            model : Messengers ,
            include: {
                model : Buttons
            } 
        }] 
    });

    res.json(data);
});


// изменение информации о пользователе или добавление нового пользователя
app.post('/api/data/', async (req, res) => {
    const {userName, data} = req.body;

    // пробуем найти пользователя в базе
    const answer = await Users.findOne({ where: { username: userName }});

    if (!answer) {
        // если пользователя нет в базе, то добавляем его
        await Users.create({
            username: userName,
        });

        // добавление информации о мессенджерах
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

            const findMessenger = await Messengers.findOne({ 
                where: { 
                    userId: findUser.dataValues.id, 
                    messengerName: name 
                }
            });
            
            // добавление информации о кнопках
            (buttons != null) &&
            buttons.map(async (button, index) => {
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
        // если пользователь есть в базе, то обновляем данные

        data.map(async (messenger)  => {
            const {name, text, viewType, buttons} = messenger;
            const findUser = await Users.findOne({ where: { username: userName }});
            

            const currentMessenger = await Messengers.findOne({
                where: {
                    UserId: findUser.dataValues.id, 
                    messengerName: name 
                } 
            });

            // обновление информации о мессенджерах
            await currentMessenger.update({
                text: text,
                inline: viewType,
                buttonsCount: buttons == null ? 0 : buttons.length,
            });
            await currentMessenger.save()

            // удаляем все кнопки из базы связанные с этим мессенджером,
            // затем добавляем новые кнопки
            // мне показалось, что так верно
            await Buttons.destroy({ where: { MessengerId: currentMessenger.id} });
        
            (buttons != null) &&
            buttons.map(async (button, index) => {
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
});



db.sequelize
    .sync().
    then(() => {
    app.listen(process.env.PORT || 3001);
})
    .catch((err) => {
        console.log(err);
    }); 