const { Appointment } = require("./db/models");
const { Op } = require("sequelize");
const cors = require('cors');

const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();
const PORT = 3003;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({extended: true}))
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://77.222.60.196:5173", 
  credentials: true }
));

function formatDate(dateStr) {
    // Получаем дату из строки в формате "YYYY-MM-DD"
    var date = new Date(dateStr);
  
    // Получаем компоненты даты и времени
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);
    var milliseconds = ('00' + date.getMilliseconds()).slice(-3);
    var offset = -date.getTimezoneOffset() / 60; // Разница в часах между местным временем и UTC
  
    // Собираем строку в формате "YYYY-MM-DD HH:mm:ss.SSS Z"
    var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds + ' ' + (offset >= 0 ? '+' : '-') + ('0' + Math.abs(offset)).slice(-2) + '00';
  
    return formattedDate;
  }

app.post('/appointments', async(req,res) => {
    const {date, time, master, service} = req.body
    const findDate = formatDate(date)
    try {
        const existingAppointment = await Appointment.findOne({where: {date: findDate, time, master}})
        if (existingAppointment) {
            res.sendStatus(400)
        } else {
        await Appointment.create({date, time, master, service})
        res.sendStatus(200)
        }
    } catch (error) {
        console.log('oops', error)
    }
})

app.get('/appointments', async(req, res) => {
    try {

        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

        const fisrtMasterValue = 'Даша';
        const secondMasterValue = 'Зина';
        const thirdMasterValue = 'Уля';
        const fourthMasterValue = 'Юля';

        const currentDate = new Date();

        
        currentDate.setHours(0,0,0,0);
        
        const appointmentsFirstMaster = await Appointment.findAll({
            where: {
                master: fisrtMasterValue,
                date: {
                    [Op.gte]: currentDate
                }
            },
            order: [
                ['date', 'ASC'],
                ['time', 'ASC'],
            ]
        })
        const appointmentsSecondMaster = await Appointment.findAll({
            where: {
                master: secondMasterValue,
                date: {
                    [Op.gte]: currentDate
                }
            },
            order: [
                ['date', 'ASC'],
                ['time', 'ASC'],
            ]
        })
        const appointmentsThirdMaster = await Appointment.findAll({
            where: {
                master: thirdMasterValue,
                date: {
                    [Op.gte]: currentDate
                }
            },
            order: [
                ['date', 'ASC'],
                ['time', 'ASC'],
            ]
        })
        const appointmentsFourthMaster = await Appointment.findAll({
            where: {
                master: fourthMasterValue,
                date: {
                    [Op.gte]: currentDate
                }
            },
            order: [
                ['date', 'ASC'],
                ['time', 'ASC'],
            ]
        })

        const appointments = [...appointmentsFirstMaster, ...appointmentsSecondMaster, ...appointmentsThirdMaster, ...appointmentsFourthMaster];
        res.json(appointments);
    } catch (error) {
        console.log('oops', error);
    }
})

// app.get('/appointments', async(req, res) => {
//     try {
//         const fisrtMasterValue = 'Зина';
//         const secondMasterValue = 'Уля';
//         const thirdMasterValue = 'Даша';

//         const appointmentsFirstMaster = await Appointment.findAll({
//             where: {
//                 master: fisrtMasterValue
//             },
//             order: [
//                 ['date', 'ASC'],
//                 ['time', 'ASC'],
//             ]
//         })
//         const appointmentsSecondMaster = await Appointment.findAll({
//             where: {
//                 master: secondMasterValue
//             },
//             order: [
//                 ['date', 'ASC'],
//                 ['time', 'ASC'],
//             ]
//         })
//         const appointmentsThirdMaster = await Appointment.findAll({
//             where: {
//                 master: thirdMasterValue
//             },
//             order: [
//                 ['date', 'ASC'],
//                 ['time', 'ASC'],
//             ]
//         })
//         const appointments = [...appointmentsFirstMaster, ...appointmentsSecondMaster, ...appointmentsThirdMaster];

//         console.log(appointments);
//         res.json(appointments);
//     } catch (error) {
//         console.log('oops', error);
//     }
// })



app.delete('/appointments', async(req,res) => {
    const {id} = req.body
    try {
        await Appointment.destroy({where: { id }})
        res.sendStatus(200)
    } catch (error) {
        console.log('oops', error)
    }
})

app.put('/appointments', async(req,res) => {
    const {id, editService} = req.body
    try {
        await Appointment.update({service: editService}, {where: {id}})
        res.sendStatus(200)
    } catch (error) {
        console.log('oops', error)
    }
})

app.listen(PORT, () => {
  console.log(`Сервак запущен, порт =====> ${PORT}`);
});