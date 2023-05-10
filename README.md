# cs260-startup

# **Liar-GPT**

## **Elevator pitch**
Have you ever encountered misinformation while on the internet? Maybe you have some beliefs or facts in your head that are wrong because you got them from unreliable sources. You can now train your brain to recognize misinformation and save yourself the embarrasment of being corrected by using Liar-GPT. Liar-GPT can generate two truths and a lie on any topic you can think of. Just type in a one word prompt of what topic you would like and it will give you three options to chose from. Liar-GPT will keep track of your streak of correctly spotting the lie on a leaderboard for all to see. 

## **Design**

![](/260login.png)
![](/260choose.png)
![](/260prompt.png)
![](/260competitive.png)

Here is a sequence diagram that shows how people would interact with the backend and chatgpt.
![](/260server.png)

## **Key Features**
- Secure login over HTTPS
- Ability to select the lie
- Display of choices
- Ability to select, and change prompt
- Totals from all users displayed in realtime
- Results are persistently stored

## **Technologies**
- **HTML** - Uses correct HTML structure for application. Four HTML pages. One for login, one for choosing gamemode, and one for each gamemode. Hyperlinks to choice artifact.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, choice display, uses chat-gpt API to process user input and give choices for game, updates leaderboards.
- **Service** - Backend service with endpoints for:
    - login
    - retrieving output from chat-GPT
    - submitting answer and prompts
- **DB** - Store users, correct answers, and prompts in database.
- **Login** - Register and login users. Credentials securely stored in database. Can't play unless authenticated.
- **WebSocket** - As each user plays, their number of correct answers are broadcast to all other users on a leaderboard.
- **React** - Application ported to use the React web framework.

# Project Deliverables

## HTML deliverable

For this deliverable I added the application structure.

- **HTML pages** - Five HTML pages that represent the ability to login, choose gamemode, and visit leaderboard.
- **Links** - The login page links to gamemmode selection page. There are headers to every page on each page.
- **Text** - There is text representations of each element that will be in the final project.
- **Images** - I added a logo to the homepage.
- **Login** - Input box and submit button for login.
- **Database** - There are stored prompts in a database for the competitive gamemode.
- **WebSocket** - The counting of correct responses is tallyed on a leaderboard in realtime.

