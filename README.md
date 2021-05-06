# Movie Explorer API
Backend of simple movie explorer app built with Node.js

API is available on: [`https://api.movies-exlorer.khizrim.ru`](https://api.movies-exlorer.khizrim.ru)

Server's public IP: [`84.201.148.130`](https://84.201.148.130)
___
## Scripts
Run **app.js**:
`npm start`

Run **app.js** with hot-reaload:
`npm run dev`

Check app with linter (ESLint):
`npm run lint`

## Endpoints
#### Access
`POST /signup`
Creates a new user profile using JSON data from the request body:
`name`, `email`, `password`

`POST /signin`
Checks sent email and password. Returns a JWT if the data is correct:
`email`, `password`

`POST /signout`
Clears browser cookies if user is logged in.

#### User
`GET /users/me`
Return user's information.

`PATCH /users/me`
Edits user's information: `name`, `email`

#### Movies
`GET /movies`

`POST /movies`
Adds movie to collection using JSON data from request body:
`country`, `director`, `duration`, `year`, `description`, `image`, `trailer`, `nameRU`, `nameEN` и `thumbnail`

`DELETE /movies/:movieId`
Removes saved movie from collection.
