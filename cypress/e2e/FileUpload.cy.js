import { uploadDocument } from "../support/pages/UploadDocumentPage";
import "cypress-file-upload";

describe("File Upload Page Tests", () => {
  
  const file1 = { fileName: "test.pdf", fileType: "application/pdf" };
  
  const invalidFile = {
    fileName: "gnupg-w32cli-1.4.23.exe",
    fileType: "application/exe",
  };

  beforeEach(() => {
    cy.visit("/");
  });

   it('Uploads a single file and verifies it is uploaded or not', () => {

     uploadDocument.uploadDoc(file1)  //call the fucntion to upload doc

     cy.get('label[for="fileInput"]').should('have.text', '1 file(s) selected');

     uploadDocument.uploadButton(); //call function to upload file

    });



  //  it('Handles invalid file upload', () => {

  //   uploadDocument.uploadDoc(invalidFile);

  //   //.get('.error-message').should('contain', 'Invalid file type'); //I have added this error msg in case of invalid files like .exe
  // });

  // it("Handles the case if user adds no file and clicks on upload", () => {
  //   uploadDocument.uploadButton();
  // });
});
