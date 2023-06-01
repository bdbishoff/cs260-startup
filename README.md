# cs260-startup

# **Liar-GPT**

## **Elevator pitch**
Have you ever encountered misinformation while on the internet? Maybe you have some beliefs or facts in your head that are wrong because you got them from unreliable sources. You can now train your brain to recognize misinformation and save yourself the embarrasment of being corrected by using Liar-GPT. Liar-GPT can generate two truths and a lie on any topic you can think of. Just type in a one word prompt of what topic you would like and it will give you three options to chose from. Liar-GPT will keep track of your streak of correctly spotting the lie on a leaderboard for all to see. 

## **Design**

![](/assets/260login.png)
![](/assets/260choose.png)
![](/assets/260prompt.png)
![](/assets/260competitive.png)

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

## CSS deliverable

For this deliverable I properly styled the application into its final appearance.

- **Header, footer, and main content body**
- **Navigation elements** - I made them all the same color and made the user ID off to the right. 
- **Responsive to window resizing** - My app looks great on all window sizes and devices.
- **Application elements** - Used good contrast and whitespace.
- **Application text content** - Consistent fonts and colors.
- **Application images** - placed logo on homepage and put emoji's on competitive page.

## JavaScript deliverable

For this deliverable I made application generate 2 truths and a lie based off an array in the background. The user can select which one is the lie and earn points if they are correct. The points they earn are kept track of in local storage and displayed on the page and on the leaderboard.

- **login** - When you press enter or the login button it takes you to the page that asks you choose a gamemode. Your username stays across all the pages.
- **database** - Keeps track of players score and updates leaderboard accordingly. Currently this is stored and retrieved from local storage, but it will be replaced with the database data later.
- **WebSocket** - i used my generateLies function to act as the chatgpt api and generate truths and lies about random or specified topics. This will be replaced with WebSocket in the future.
- **application logic** - Leaderboard changes based on who has the highest score. You get points by answer multiple questions correctly in a row. The highest score is kept track of and displayed on the leaderboard. 

