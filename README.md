# Social Versal
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```


## Table of Contents

- [Description](#description)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)


## Description

The purpose of this project is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list by using Express.js for routing, a MongoDB database, and the Mongoose ODM. MongoDB is chosed for this project over SQL as it is a popular choice for many social networks due to its speed with large amounts of data and flexibility with unstructured data.


## Technologies

- Day.js
- Express.js
- JavaScript
- JSON
- Mongoose ODM
- Node.js 
- NoSQL/ MongoDB


## Installation

In order to be able to run the applicaton, you are required to do the following:

- Download the zip file/ clone the GitHub repo 
- Open the folder in VSCode
- Click the "Toggle Panel" on the right-side or "Ctrl+J" to see the Terminal or Command Line Interface(CLI)
- Install npm (Node Package Manager) inside the repo by typing the following code in the Command Line:

```
    npm install               Press Enter
```


## Usage

To use the application,
- You need to do, "npm install" if you haven't done in the Installation section above.
- Type the following commands in the Command Line:

```
    npm start               Press Enter
```

- Then, test all the different api routes.
- Watch the walkthrought video by [clicking here](https://drive.google.com/file/d/1PVjxtVQOURVPO-SJqWwcUiLnlA28BCdc/view). 


## License

This project is under the MIT License. [Click here for more information](https://opensource.org/licenses/MIT).
