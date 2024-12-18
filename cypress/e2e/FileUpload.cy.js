import { uploadDocument } from "../support/pages/UploadDocumentPage";
import "cypress-file-upload";

describe("File Upload Page Tests", () => {
  const file1 = { fileName: "example.json", fileType: "application/json" };
  const file2 = { fileName: "test.pdf", fileType: "application/pdf" };
  const file3 = { fileName: "logo.png", fileType: "png" };

  const multipleFiles = [
    { fileName: "example.json", fileType: "application/json" },
    { fileName: "logo.png", fileType: "image/png" },
    { fileName: "test.pdf", fileType: "application/pdf" },
  ];

  const invalidFile = {
    fileName: "gnupg-w32cli-1.4.23.exe",
    fileType: "application/exe",
  };


  beforeEach(() => {
    cy.visit("/file_upload.html");
  });

  //  it('Uploads a single file and verifies it is uploaded or not', () => {

  //    uploadDocument.uploadDoc(file1)  //call the fucntion to upload doc

  //    cy.get('label[for="fileInput"]').should('have.text', '1 file(s) selected');

  //    uploadDocument.uploadButton(); //call function to upload file

  //   });

  // it('Uploads multiple files in the application to test functionality', () => {

  //   uploadDocument.uploadDoc(multipleFiles);

  //   cy.get('label[for="fileInput"]').should('have.text', '3 file(s) selected');

  //   uploadDocument.uploadButton(); //call function to upload file
  // });

  //  it('Handles invalid file upload', () => {

  //   uploadDocument.uploadDoc(invalidFile);

  //   //.get('.error-message').should('contain', 'Invalid file type'); //I have added this error msg in case of invalid files like .exe
  // });

  it("Handles the case if user adds no file and clicks on upload", () => {
    uploadDocument.uploadButton();
  });
});
