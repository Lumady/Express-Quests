const express = require("express");
require("dotenv").config();
/* quête 7 */
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

/* routes publics */
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
/*quete 2 */
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUserById);
/* quête 7 */
app.post("/api/users", hashPassword, usersHandlers.postUser);
app.post(
  "/api/login",
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

/* routes protégées */
/* quête 3*/
app.post("/api/movies", movieHandlers.postMovie);
/* quête 4*/
app.put("/api/movies/:id", movieHandlers.updateMovie);
/* quête 5 */
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
/* quête 5 */
app.delete("/api/users/:id", usersHandlers.deleteUser);
/* quête 7 */
app.put("/api/users/:id", hashPassword, usersHandlers.updateUser);

//app.post("/api/users", usersHandlers.postUser);
//app.put("/api/users/:id", usersHandlers.updateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
