const express = require("express");
const users = require("./users.js");

const server = express();

const PORT = 3000;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

server.get("/", (request, response) => {

    const html = /* html */`
    <html>
    <head>
        <meta charset="utf-8">
        <title>bløgge</title>
    </head>
    
    <body>
        <h1>bløgge</h1>
        <form>
            <label for="username">
                <input name="username" id="username" />
            </label>
            <label for="post">
                <input name="post" id="post" />
            </label>
            <button type="submit">Submit</button>
        </form>

  </body>
</html>
`;
    response.send(html);
});

// app.use(express.static("/" + '/public'));

server.get("/show-posts", (request, response) => {
    item = "";
    for (const user of Object.values(users)) {
        item += `<li><div><h3>${user.username}</h3> <p>${user.post}</p></div></li>`;
    }
    const html = /* html */`
    <html>
    <head>
        <meta charset="utf-8">
        <title>bløgge</title>
        <link rel="stylesheet" type="text/css" href="/style.css">
    </head>
    
    <body>
        <h1 style="color:blue;text-align:center;">bløgge</h1>
        <form>
            <label for="username">
                <input name="username" id="username" />
            </label>
            <label for="post">
                <input name="post" id="post" />
            </label>
            <button type="submit">Submit</button>
        </form>
        <section>
        <h2>Recent Posts</h2>
        <ul class="user-post">${item}</ul>
        </section>
  </body>
</html>`
    response.send(html)
})