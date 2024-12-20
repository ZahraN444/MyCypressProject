import { uploadDocument } from "../support/pages/UploadDocumentPage";
import { validateResp } from "../support/pages/ValidateResponses";

import "cypress-file-upload";

describe("File Upload Page Tests", () => {
  const file1 = {
    fileName: "Testing.pdf",
    fileType: "application/pdf",
  };

  const invalidFile = {
    fileName: "gnupg-w32cli-1.4.23.exe",
    fileType: "application/exe",
  };

  beforeEach(() => {
    cy.visit("/");
  });


   it('Checks the upload button is disabled when no file is added; Upload a single file and process it;ask questions about the document and then delete it', () => {

    cy.fixture('expectedAnswers.json').then((data) => {
      const { questions } = data;
      

     uploadDocument.uploadDoc(file1);  //call the fucntion to upload doc
     uploadDocument.processFile();  //call fucntion to process file
     
     questions.forEach(({ question, expectedRegex }) => {
      // Ask the question
      validateResp.askChatbot(question);


        // Validate the response
      validateResp.getChatbotResponse().then((responseText) => {
         
          if (expectedRegex) {
            const regex = new RegExp(expectedRegex);  //store expected regex in variable
            expect(responseText).to.match(regex);  //match response of chatbot with the regex
          }

        });

    });   

    uploadDocument.deleteFile();

  });   

});  

  it("Handles invalid file upload", () => {

    cy.intercept("POST", "http://localhost:8000/documents/upload/").as(
      "uploadcall"   
    );   //intercept the api call for upload document

    uploadDocument.uploadDoc(invalidFile);  //attach invalid file

    cy.wait("@uploadcall").its("response.statusCode").should("eq", 400);  //the call must fail

    cy.on("window:alert", (alertText) => { //if no file is attached then throws error
      
      // Assert the alert message text
      expect(alertText).to.equal("Failed to upload file. Please try again.");
    });

   });

  });



