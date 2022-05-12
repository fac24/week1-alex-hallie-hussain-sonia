it("can visit homepage", () => {
    cy.visit("https://micro-blogge.herokuapp.com/");
})

it("homepage includes expected contents", () => {
    cy.visit("https://micro-blogge.herokuapp.com/");
    cy.contains("h1", "bløgge");
})

it("user can read posts on home page", () => {
    cy.visit("https://micro-blogge.herokuapp.com/");
    cy.contains("h3", "sonianb");
    cy.contains("p", "The best post");
})

// it("user can read more than one post", () => {
//     cy.visit("https://micro-blogge.herokuapp.com/");
//     cy.contains()
// })

// it("user can view form on home page", () => {
//     cy.visit("https://micro-blogge.herokuapp.com/");
//     // cy.get("form").find("input[name='username']");
//     // cy.get("form").find("input[name='post'])");
//     cy.get("form").find(`button[data-cy="submit"])`);
// })

it("user can submit post and post will appear beneath", () => {
    cy.visit("http://localhost:3000/");
    cy.get('form').find('input[data-cy="username"]').type("alex");
    cy.get('form').find('input[data-cy="post"]').type('test');
    cy.get('form').find('button[data-cy="submit"]').click();
    cy.get('ul>li').contains("h3", "alex");
    cy.get('ul>li').contains("p", "test");
})

//routes
//post
//delete
//read posted post
