const express = require("express");
const users = require("./users.js");

const server = express();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

server.use(express.static("public"));

server.get("/", (request, response) => {
  item = "";
  for (const user of Object.values(users)) {
    item += `<li class="user-post">
        <div>
            <h3>${user.username}</h3> 
            <form action="/delete-post" method="POST" style="display: inline;">
            <input name="username" hidden value="${user.username}"/>
            <button name="id" value="${user.id}" aria-label="Delete ${user.post}">
              &times;
            </button>
          </form>
            <p>${user.post}</p>
        </div>
            </li>`;
  }
  const html = /* html */ `
    <html>
    <head>
        <meta charset="utf-8">
        <title>bløgge</title>
        <link rel="stylesheet" type="text/css" href="/style.css">
        <script src="index.js" defer></script>
    </head>
    <body>
        <h1>bløgge</h1>
        <form method="POST">
            <label for="username">Your name
                <input name="username" id="username" required/>
            </label>
            <br>
            <label for="post" id="post-lable">Your post
                <input name="post" id="post" maxlength="280" required class="char-remain-txt"/>
                <div><span class="char-remain-count"></span>/280</div>
            </label>
            <button type="submit">Submit</button>
        </form>
        <section>
        <h2>Recent Posts</h2>
        <ul>${item}</ul>
        </section>

  </body>
</html>`;
  response.send(html);
});

const bodyParser = express.urlencoded({ extended: true });
let idCounter = 5;

server.post("/", bodyParser, (request, response) => {
  let newUser = request.body;
  console.log(request.body);
  let name = newUser.username.toLowerCase();
  const userId = idCounter;
  users[userId] = newUser;
  users[userId].id = userId;
  console.log(users);

  response.redirect("/");
  idCounter++;
});

server.post("/delete-post", bodyParser, (request, response) => {
  console.log(request.body.id);

  const postToDelete = request.body.id;

  delete users[postToDelete];
  response.redirect("/");
});
