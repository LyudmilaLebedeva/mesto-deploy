# mesto-db
## версия 0.0.1

## Описание
Учебный проект, целью которого является навыка разработки бэкенд-приложения на Node.js с использованием Express.js и MongoDB, а также его размещение на удаленном сервере.

## Используемые технологии
- JavaScript
- Node.js
- Express.js
- MongoDB
- API.REST

### Функционал
- POST /signup - создание пользователя в базе данных;
- POST /signin - возвращает cookie с токеном, если в теле запроса переданы верные пароль и e-mail;
- GET /users - возвращает json со всеми пользователями из базы данных;
- GET /users/:userId возвращает json пользователя с переданным в параметрах id;
- POST /cards - создает в базе данных объект карточки;
- GET /cards - возвращает json всех карточек из базы данных;
- DELETE /cards/:cardId - удалаяет из базы данных карточку с переданным в параметрах id;

## Размещение
Приложение размещено на удаленном сервере, к которому можно обратиться по публичному IP-адресу 178.154.230.154, либо по http и по https, используя доменное имя:
- http://api.lyudmila.students.nomoreparties.co
- https://api.lyudmila.students.nomoreparties.co
- http://www.api.lyudmila.students.nomoreparties.co
- https://www.api.lyudmila.students.nomoreparties.co

## Как запустить локально
Локально к серверу можно обратиться по адресу http://localhost:3000
Для запуска используйте команду 
```
npm run start
```
Для запуска в режиме разработки с hot reload используйте команду 
```
npm run dev
```

## Планы по улучшению
Реализовать еще 4 роута:
- PATCH /users/me — обновляет профиль
- PATCH /users/me/avatar — обновляет аватар
- PUT /cards/:cardId/likes — поставить лайк карточке
- DELETE /cards/:cardId/likes — убрать лайк с карточки
