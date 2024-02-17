![1](https://github.com/HassanDev13/factory/assets/48941486/8304ba0b-af52-4d36-8fee-8dd95901aee4)

# Effortlessly Manage Tasks with Your Own Telegram Bot

The Goal is to Add a new task on the ToDoApp and the bot reply it to all telegram users, We try to benefite from the telegram API to use it in biggest Projects

So how it works here,
1) a telegram bot is created.
2) the bot api is lunched (it means this bot.js script).
3) some users start using the bot (when typing '/start').
4) whenever a new task be added in the principale APP, the app send a POST request to the endpoint api of the bot and from it our bot send this task to all the users.



# Ready to try it?

**1) create you're own bot and get the token from the botFather**

Go to your telegram and type on the serch : BotFather

1) Click on start

2) Type the command '/newbot'

3) Type the name of your bot e.g :    HappyBot

4) Then type a unique username of you're bot like :    my_happy_bot          (it must ended with the word 'bot')

5) After the bot father will provide you a token for you're bot like this : 68********:AAH#####################Gw                       keep the key private

NOW your bot is ready to test it let's go to the implementation side :

**Implementation : 2) set up you're envirenment and pull the bot.js code and the todo app and install : express, body-parser, cors, node-telegram-bot-api**

Create a new folder e.g "myApp" for the app

Open the folder on VScode and run on the terminal

```bash
git init
```

Clone the bot repository
```bash
git clone https://github.com/Abdessamed2002/ToDoAppBot
```

Then clone the todo app repo
```bash
git clone https://github.com/Abdessamed2002/ToDoApp
```

Install node modules
```bash
npm install express body-parser cors node-telegram-bot-api
```

Now In the bot.js code replace the botToken with your key provided from botFather "68********:AAH#####################Gw"

**3) run the bot on you're terminal : node bot.js**
```bash
node bot.js
```

This should be the result : 
```bash
Tracked Users: []
Server listening on port 3000
```

**4) you should have XAMPP or another local web server envirenment to lunch**
![cap2](https://github.com/Abdessamed2002/ToDoAppBot/assets/157251900/b10a6f84-3ad0-4c97-995c-95e77ab2711a)

**5) lunch you're app on you're local bowser**
```bash
localhost/php/testBot/ToDoAppBot/ToDoApp/index.php
```

The App should be lunched now, then go to you're telegram account and send to the bot start command '/start'
search for you're bot by the username :
![cap3](https://github.com/Abdessamed2002/ToDoAppBot/assets/157251900/76c0e843-9e79-4ea2-9d2c-a05eb25dae2e)


type /start and it will send you welcome!

now go to the app and make some tasks like this : 
![cap](https://github.com/Abdessamed2002/ToDoAppBot/assets/157251900/b3d2fe18-45a5-4a90-8975-2bebe8eedd37)

# AND FINALY THAT WOULD BE THE RESULT
![cap4](https://github.com/Abdessamed2002/ToDoAppBot/assets/157251900/1971ceb4-0357-4995-8a80-c90b128c711e)



Thank's for you're time :) whish you all the best



While this app's current purpose is limited to sending tasks from the app to users, its true potential lies in larger projects. **Imagine** a bot seamlessly interacting with hundreds or thousands of Telegram users, saving you countless hours and resources. Forget about manually crafting chat functionalities – this bot automates it all. Focus on your core development, and let the bot handle user notifications across individual users, moderators, and even group channels. It's truly automation at its finest!
