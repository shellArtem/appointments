'use strict';

// const Faker = require('faker');
const { addDays, format } = require('date-fns');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Список мастеров
    const masters = ['Зина', 'Уля', 'Даша', 'Юля'];

    // список времени
    const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
    '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30'];

    // Резервные записи
    const appointments = [];

    // Максимальное количество дней для создание записей в будущем
    const daysInFuture = 90;

    for (let i = 0; i < daysInFuture; i++) {
      const date = format(addDays(new Date(), i), 'yyyy-MM-dd');
      for (const master of masters) {
        for (const time of timeSlots) {
          appointments.push({
            date,
            time,
            master,
            service: '',
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
    }

    // await queryInterface.bulkInsert('Appointments', appointments);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Appointments', null, {});
  }
};
