# Prepaze Frontend Coding Challenge

Welcome to the Prepaze frontend coding challenge! Please read the following instructions carefully.

**Your goal is to set up a React application which enables the user to take the question answer test.**

# Contents

- [Business need](#business-need)
- [Use cases](#use-cases)
- [Evaluation criteria](#evaluation-criteria)
  - [Technology requirements](#technology-requirements)
  - [Code requirements](Criteria.md#must-have)
- [How to submit](#how-to-submit)
- [How to run API server](#how-to-run-api-server)
- [Time limit](#time-limit)

# Business need

The main goal is for the user to take an assessment with a set of questions and get the report.

# Use cases

- The user shall be able to take the test successfully.
- The questions must be displayed in the order of difficulty level (difficulty_level_id ascending).
- Only active question should be displayed.
- The questions with the same difficulty level should be grouped on the same page. The users can click on the next button to see the next difficlty level set of questions on the next page.
  There are three difficulty levels so there should be three pages with next and previous navigations and on the final page, there should be submit button.
- The three difficulty levels are
    - Easy (difficulty_level_id : 1)
    - Medium (difficulty_level_id : 2)
    - Hard (difficulty_level_id : 3)
- Each answer field must have form validation. Cannot be left empty.
- There are three different types of question
    - Free Text (question_type_id : 1)
    - Single Choice (question_type_id : 2)
    - Free Text accepts only numbers (question_type_id : 3)
- Application should remember the answers even after page refresh (This means you should store and access the answers state in localstorage or session storage)
- Finally on submit, show a detailed report of the assessment with the validated score.
  - Use the assigned_score to generate the score.
  - Free text answers should not be validated. The score should be validated only for the rest of the question types.
  - Display the number of right questions right on each level.

Note:- The interactions should not refresh the page.

# Evaluation criteria

## Technology requirements

**React** and **JavaScript** are mandatory requirements. Apart from this, you can use any libraries, task runners and build processors. ES6 is highly encouraged.

## Code requirements

The full criteria for evaluating the coding challenge can be found [here](./Criteria.md).

# How to submit

- Clone this repository.
- A RESTful API for `questions` is provided with the challenge. To run, follow: [How to run API server](#how-to-run-api-server)
- Complete your project as described above within your local repository.
- Make sure that there are scripts to start both the server and the client.
- Ensure everything you want to commit is committed before you bundle.
- Create a git bundle: `git bundle create your_name.bundle --all`
- Email the bundle file to your point of contact. (manian.selvan@prepaze.com and skumar@prepaze.com)

**In order to be fair to all candidates, please refrain from sharing your solution on public repository hosting services such as GitHub and Bitbucket.**

# How to run API server

The boilerplate includes a small service for data fetching. The file `db.json` includes all the necessary data to achieve the goal. Please follow the steps below to start the server:

```
yarn or npm install .
yarn server or npm run server
```

Check [json-server](https://github.com/typicode/json-server) for more information.

# Time limit

There is no hard time limit for this coding challenge. However, we believe that 4-5 hours is sufficient for the must-have parts of the application. While we appreciate all the effort put into the challenge, we also do not want to take up too much of your time. Our advice is to focus on making sure [that the application works properly and has some tests](Criteria.md#must-have) before moving on to secondary objectives.

Good luck,
Prepaze
