const express = require("express");
const users = require("./users.js");

const server = express();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

server.use(express.static("public"));

server.get("/", (request, response) => {
  let item = "";
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
            <label for="post" id="post-label">Your post
                <input name="post" id="post" required maxlength="280" class="char-remain-txt"/>
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

function sanitise(original_input) {
    let sanitised = {};
    for (let entry of Object.entries(original_input)) {
        let key = entry[0];
        let value = entry[1];
        sanitised[key] = value.replaceAll("<", "&lt;");
        sanitised[key] = value.replaceAll(">", "&gt;");
    }
    return sanitised;
};

server.post("/", bodyParser, (request, response) => {
    if (request.body.username && request.body.post) {
        let newUser = sanitise(request.body);
        const userId = idCounter;
        users[userId] = newUser;
        users[userId].id = userId;
        response.redirect("/");
        idCounter++;
    }
    else {
        response.status(403).send(`<h1>Form error</h1>`)
    }
});

server.post("/delete-post", bodyParser, (request, response) => {
  const postToDelete = request.body.id;
  delete users[postToDelete];
  response.redirect("/");
});
