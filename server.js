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
            <form class="delete_form" action="/delete-post" method="POST" style="display: inline;">
            <input name="username" hidden value="${user.username}"/>
            <button class="delete_button" name="id" value="${user.id}" aria-label="Delete ${user.post}">
              &times;
            </button>
          </form>
            <p>${user.post}</p>
        </div>
            </li>`;
    }
    const html = /* html */ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>bløgge</title>
        <link rel="stylesheet" type="text/css" href="/style.css">
        <script src="index.js" defer></script>
    </head>
    <body>
        <h1>bløgge</h1>
        <p class = "blogge">bløgge(noun): the traditional Scandinavian art of sharing short thoughts from a distance.</p>
         <section class="form-s">
         <form method="POST">
            <label for="username">
                <input name="username" aria-label="Name" id="username" class="input_name" placeholder="Please enter your name" required/>
            </label>
            <br><br>
            <label for="post" id="post-lable">
                <input name="post" id="post" aria-label="Message" class="input_post" placeholder="Please type your post" maxlength="280" required class="char-remain-txt"/>
                <div class="counter"><span class="char-remain-count"></span>/280</div>
            </label>
            <button type="submit">Submit</button>
        </form>
        </section>
        <section>
            <h2>Recent Posts</h2>
            <ul>${item}</ul>
        </section>

  </body>
</html>`;
    response.send(html);
});

const bodyParser = express.urlencoded({extended: true});
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
