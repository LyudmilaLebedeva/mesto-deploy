# mesto-db
## версия 0.0.1

Учебный проект, целью которого является получения навыка работы с MongoDB для серверной разработки на Node.js.

## Как запустить
Для запуска используйте команду 
```
npm run start
```
Для запуска в режиме разработки с hot reload используйте команду 
```
npm run dev
```

В проекте реализована обработка следующих запросов:
- GET
      localhost:3000/cards
      localhost:3000/users
      localhost:3000/users/:userId
- DELETE
      localhost:3000/cards/:cardId
- POST
      localhost:3000/users
      localhost:3000/cards
