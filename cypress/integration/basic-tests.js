it("user can visit homepage", () => {
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

it("user can read more than one post", () => {
    cy.visit("https://micro-blogge.herokuapp.com/");
    cy.get("ul")
        .children()
        .should('contain', 'The best post')
        .and('contain', 'The worst post')
})

it("user can submit post and post will appear beneath", () => {
    cy.visit("https://micro-blogge.herokuapp.com");
    cy.get('form').find('input[name="username"]').type("Theodore Roosevelt");
    cy.get('form').find('input[name="post"]').type('Call me Teddy');
    cy.get('form').find('button').click();
    cy.get('ul>li').contains("h3", "Theodore Roosevelt");
    cy.get('ul>li').contains("p", "Call me Teddy");
})

it("user can delete a post", () => {
    cy.visit("https://micro-blogge.herokuapp.com");
    cy.get('form').find('input[name="username"]').type("Theodore Roosevelt");
    cy.get('form').find('input[name="post"]').type('Call me Teddy');
    cy.get('form').find('button').click();
    cy.get('ul>li').contains("h3", "Theodore Roosevelt");
    cy.get('ul>li').contains("p", "Call me Teddy");
    cy.contains('Theodore Roosevelt').should('exist');
    cy.get('button[name="name"]').last().click();
    cy.contains('Theodore Roosevelt').should('not.exist');
})

//routes
//post
//delete
