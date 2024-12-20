class ValidateResponses {
    elements = {
      // defined all page selectors as elements in this class
      chatInput:() => cy.get('div.space-y-2 textarea'),
      chatResponse:() => cy.get('div.space-y-4 p'),
      askQuestionButton:() => cy.get('div.space-y-2 button')
    }
  
  
    askChatbot(question) {

      this.elements.chatInput().type(`${question}{enter}`);  //type in the question
 
      cy.intercept('POST','http://localhost:8000/qna/').as('question')  //intercept the call to server for question asked

      this.elements.askQuestionButton().click().then(($askQuestion) =>{   //cick on the button

        cy.wrap($askQuestion).should('have.text', 'Processing').and('be.disabled'); 
        
        //check the button text changes to Processing and is disabled

        cy.wait('@question').its('response.statusCode').should('eq', 200);  //check if the call is successfully complete

        cy.wrap($askQuestion).should('have.text', 'Ask Question').and('not.be.disabled'); //now button should be active again with old text

      })

    }
    
    getChatbotResponse() {

     return this.elements.chatResponse().invoke('text');  //fetch the response
      }
  

  }
  
  export const validateResp = new ValidateResponses(); // Export an instance of the class
  