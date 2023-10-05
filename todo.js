// ! Инициализация проекта
// * npm init -y
// * npx eslint --init
// * npx create-gitignore node
// * npm i express
// * npm i -D nodemon morgan
// * npm i @babel/core @babel/preset-env @babel/preset-react @babel/register react react-dom
// todo создай файл .babelrc и добавь в него:
/*
  { presets: [   @babel/preset-env,   @babel/preset-react ]
  }
*/
// todo Добавь скрипты dev и start в package.json
/*
dev: nodemon app.js --ext js,jsx,
start: node app.js
*/
// ! Инициализация базы данных
// * npm i sequelize sequelize-cli pg pg-hstore
// todo создай файл .sequelizerc и добавь в него:
/*
const path = require('path');
module.exports = { 'config': path.resolve('db', 'config', 'database.json'), 'models-path': path.resolve('db', 'models'), 'seeders-path': path.resolve('db', 'seeders'), 'migrations-path': path.resolve('db', 'migrations'),
};
*/
// * npx sequelize init
// * npx sequelize db:create
// * npx sequelize model:generate --name User --attributes name:string,password:string
// * npx sequelize db:migrate
// * npx sequelize db:migrate:undo:all
// todo Для заполения базы (пример через faker):
// ? npm i @faker-js/faker
// * npx sequelize-cli seed:generate --name User
// * npx sequelize db:seed:all

// ! Установка зависимостей

// * в миграциях:

user_id: { type: Sequelize.INTEGER, references: {   model: 'Users',   key: 'id', },   },

// * в моделях:

static associate({ User }) {   // define association here   this.belongsTo(User, { foreignKey: 'user_id' }); }


// ! env - переменные окружения (среды), в них будем класть подключение к базе, порт и т.п.
// * npm i dotenv
// todo создай файл .env и .env_example (чтобы он был для примера и запушился на GitHub) и
// todo добавь в файл .env переменные PORT и DB (подключение к БД)

PORT=3000
DB_URL=postgres://postgres:123@localhost:5432/I_like_it
SESSION_SECRET=rdvgfhjfcu8sfjifd

// ! Не забудь добавить всё из файла .env в файл .env_example
// todo подключи donenv к app.js и .sequelizerc
// ! Если не добавить в файлы, то переменные PORT и DB не увидит
// * require('dotenv').config();
// todo замени в db/config/database.json содержимое development на :
/*
use_env_variable: DB_URL,
dialect: postgres
*/
// * Проверка подключения к базе через sequelize
// const { Sequelize } = require('sequelize')

// const sequelize = new Sequelize('studentswhales', 'whale2', '1', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// async function checkConnect() {
//   try {
/  await sequelize.authenticate()
/  console.log('БАЗА ПОДКЛЮЧЕНА!')
//   } catch (error) {
/  console.log('БАЗА НЕ ПОДКЛЮЧЕНАЯ ==>', error)
//   }
// }
// checkConnect()

// ! Статика - файлы, доступные в браузере (клиентские файлы, папка public)
// * app.use(express.static(path.join(process.cwd(), 'public')));

// todo напиши роуты и jsx компоненты для рендера
// ! Подключи роуты к app.js

// ! bootstrap
// * https://getbootstrap.com/docs/5.3/getting-started/introduction/#cdn-links
// ? navbar
// * https://getbootstrap.com/docs/5.3/components/navbar/#nav
// ? card
// * https://getbootstrap.com/docs/5.3/components/card/
// todo подключение в Layout
/*
<link href=https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css rel=stylesheet integrity=sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi crossOrigin=anonymous />
<script src=https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js integrity=sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3 crossOrigin=anonymous />
*/

// * npm i express-session session-file-store bcrypt

// ! Важно для экзамена !
// * Добавь в скрипт
// * dev: nodemon app.js --ignore sessions --ext js,jsx,

// ! Важно для экзамена !
// * Добавь  папку sessions в gitignore

// * require всего необходимого в app
/*
const session = require('express-session')
const FileStore = require('session-file-store')(session)
*/

// * Конфиг для куки в виде файла сессий
const sessionConfig = {
  name: 'RaccoonsCookie',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Секретное слово',
  resave: false, // * если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // * если false, куки появятся только при установке req.session
  cookie: { maxAge: 9999999, // * время жизни в мс (ms) httpOnly: true,
  },
};
// * Подключи сессии как мидлу
app.use(session(sessionConfig));


Создание фронта на Reacte: 

// npm create vite@latest client -- --template react-ts

Подключение Redux: 

// npm install -D @redux-devtools/extension
// npm i @reduxjs/toolkit
// npm i react-redux

Подключение react-router-dom:

// npm i react-router-dom
