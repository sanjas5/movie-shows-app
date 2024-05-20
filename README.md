# Movie and TV Show App

Click here to see [LIVE DEMO](https://staging.d25t44g13j97rq.amplifyapp.com)

![landingShowsPage](https://github.com/sanjas5/movie-shows-app/assets/89469159/951ae719-448a-4594-9e69-b6e587965c3d)

## Overview

This project is a web application designed to showcase the top 10 rated TV shows and movies, with functionalities for searching and viewing detailed information about individual items. It uses [TheMovieDB API](https://developers.themoviedb.org/3) for fetching data and is built with React, Typescript, and various other modern web development tools.

## Features

- Display top 10 rated TV shows and movies.
- Search functionality for both TV shows and movies.
- Detailed view for individual TV shows and movies, including trailer video if available.
- Live search.
- Persistent state management using React Context.
- Responsive design.
- Clean and modular architecture.

## Technical Requirements

- **Node Version**: 21.7.1
- **React Version**: 18.3.1
- **State Management**: React Context
- **Routing**: React Router
- **API Consumption**: Axios
- **Language**: Typescript
- **Testing**: React Testing Library, Jest

## Installation

[node.js](https://nodejs.org/) is required to get npm.

If you would like to download the code and try it for yourself:

1.  Clone the repository:

    bashCopy codegit
    `https://github.com/sanjas5/movie-shows-app.git`

2.  Navigate to the project directory:

    bashCopy code
    `cd movie-shows-app`

3.  Add the .env file in application and add base url and API key:
    Create a `.env` file in the root of the project and add next two lines:

        REACT_APP_BASE_URL = https://api.themoviedb.org/3
        REACT_APP_API_KEY = _your_api_key_

4.  Install dependencies:

    bashCopy code
    `npm install`

5.  Start project:

    bashCopy code
    `npm start`

## Usage

### Displaying Top 10 Rated TV Shows and Movies

- The app defaults to displaying the top 10 TV shows on load.
- Use the tab navigation to switch between TV shows and movies.

### Search Functionality

- Search input is debounced with a 1-second delay after the user stops typing.
- Minimum 3 characters are required to trigger the search.
- Search results appear below the search box.
- Switching tabs while searching will update the results based on the current search term.

### Detailed View

- Clicking on a TV show or movie navigates to the detailed view page.
- The detailed view includes a cover image or trailer video (if available) and basic information about the selected item.
- A back button returns the user to their previous state.

## Testing

Tests are written using Jest and React Testing Library. To run the tests:

bashCopy code `npm test`

## Linting

ESLint is used for code quality and consistency. To run the linting process:

bashCopy code `npm run lint`

## Additional Features

- **Responsive Design**: The app is responsive and works on various screen sizes.
- **Styling**: Custom CSS for styling without using CSS frameworks.

## Contact

- **Author**: Sanja Kadic
- **Email**: kadicsanja5@gmail.com
- **GitHub**: [sanjas5](https://github.com/sanjas5)

Thank you for checking out this project!
