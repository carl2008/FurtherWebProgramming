# Further Web Programming - API

### Project Structure 
```
|__ server
       |__ server.js
       |__ router
            |__ userRouter.js
            |__ articleRouter.js
            |__ ...      
       |__ models
            |__ user.js
            |__ article.js
            |__ ...

```

### Before running:
- Update `.env` with your database
> example: 
DATABASE_URL=mongodb+srv://username:pass@cluster0.7py8k.mongodb.net/db?retryWrites=true&w=majority
```
DATABASE_URL=[YOUR_DATABASE_URL]

```
- Install dependencies
```
cd server
npm install
```
### Running
```
npm start
```
