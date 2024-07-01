https://stalker9509.github.io/Test-task-quiz/

# Test task quiz

A simple, interactive quiz application built with HTML, CSS, and JavaScript.

## Features

- Multiple-choice questions
- Timer for each question
- Score tracking
- Next button to navigate through questions
- Responsive design
- Dark/Light theme toggle

## File Structure

- `index.html`: Main HTML structure
- `style.css`: Styles for the application
- `main.js`: Core JavaScript functionality
- `const.js`: Constants and DOM element selections
- `questions.js`: Array of quiz questions

## Customization

To add or modify questions, edit the `questions.js` file. Each question object should follow this structure:

```javascript
{
 question: "Your question here?",
 answer: [
     {text: "Option 1", correct: true},
     {text: "Option 2", correct: false},
     {text: "Option 3", correct: false},
 ]
}