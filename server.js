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
            <form action="/delete-post" method="POST" data-cy="deleting-form">
            <button name="name" value="${user.username}" aria-label="Delete ${user.post}" data-cy="delete-btn">
              &times;
            </button>
          </form>
            <p>${user.post}</p>
        </div>
            </li>`;

    }
    const html = /* html */`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
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
                <input name="username" id="username" class="input_name" placeholder="Please enter your name" required/>
            </label>
            <br><br>
            <label for="post" id="post-lable">
                <input name="post" id="post" class="input_post" placeholder="Please type your post" maxlength="280" required class="char-remain-txt"/>
                <div><span class="char-remain-count"></span>/280</div>
            </label>
            <br><br>
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

const bodyParser = express.urlencoded({extended: false});

server.post("/", bodyParser, (request, response) => {
    let newUser = request.body;
    let name = newUser.username.toLowerCase();
    users[name] = newUser;
    response.redirect("/");
});

server.post("/delete-post", bodyParser, (request, response) => {
    const postToDelete = request.body.name.toLowerCase();
    delete users[postToDelete];
    response.redirect("/");
});