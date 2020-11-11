# my-react

## Context
An app that allows you to list events in Paris thanks to the Opendata API.

## Starting
```bash
git clone https://github.com/DRF-dev/openDataParis.git
npm i
npm start
```

## Structure

```bash
.
├── package.json
├── README.md
├── src
│   ├── components
│   │   ├── body
│   │   │   └── index.js
│   │   ├── details
│   │   │   └── index.js
│   │   ├── form
│   │   │   ├── index.js
│   │   │   └── list
│   │   │       └── index.js
│   │   └── manageData
│   │       └── index.js
│   ├── index.html
│   ├── index.js
│   ├── index.scss
│   └── reset.scss
└── webpack.config.js
```

## Technologies used
* HTML5
* Scss
* JavaScript
* React framework

## Components
* Navbar
  * where we do our research
* Body
  * where the results of our research appear
* Details
  * The detail of one of the events of your choice

## Features

* Navbar
  * We can choose between a research by query or by criteria
  * When we submit, on the left cards appear with informations of each events
* Body
  * It is where our cards appear
  * We have basic informations like the type of entrie, the category of activity etc...
  * We can click on "Plus d'informations" button to be redirected to a page containing more informations 
* Details
  * In the detail's page, we have all the informations about the event and a map with the exact location of the activity.

## Author
[**FRANCISCO Dany**](https://github.com/DRF-dev)
