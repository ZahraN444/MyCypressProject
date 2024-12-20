class UploadDocumentPage {
  elements = {
    FileInput: () => cy.get('input[type="file"]'), //making elements in the class so that they are accessible by all fucnitons
    uploadButton: () => cy.get("svg.lucide.lucide-upload"),
    processButton: () => cy.get("svg.lucide.lucide-play"),
    processStatus: () => cy.get("div.space-y-2 div.bg-secondary div.inline-flex"),
    deleteIcon: () => cy.get("svg.lucide.lucide-trash2"),
  };

  uploadDoc(files) {

    this.elements.uploadButton().should(
      "have.css",
      "pointer-events",
      "none"
    );                             //check upload button is disabled initially

    const filesForUpload = Array.isArray(files) ? files : [files]; //check if files is a signle object or array

    const fileUploads = filesForUpload.map(({ fileName, fileType }) => ({
      //this maps the files for a format that cypress can interpret
      filePath: fileName,
      mimeType: fileType,
    }));


    // Attach file/files to the same input
    this.elements.FileInput().should("exist").attachFile(fileUploads);  //attach file

    this.elements.uploadButton().click(); //click to upload

    
  }

  processFile() {
    this.elements.processStatus().then(($status) => {
      // Extract the text content

      cy.wrap($status)
        .invoke("text")
        .then(($text) => {
          expect($text).to.equal("Unprocessed"); // Assert the text is unporcessed initially
        });

      cy.intercept('POST', 'http://localhost:8000/documents/process/*').as(
        'process');

      this.elements.processButton().click();  //user clicks on the process button

     cy.wait('@process').its('response.statusCode').should('eq', 200);  //waits for call to be successful

      cy.wrap($status)
        .invoke("text")
        .then((text) => {
          expect(text.trim()).to.equal('Processed'); // Assert the text has changed to Processed.
        });
    });
  }

  deleteFile() {

    cy.intercept('DELETE', 'http://localhost:8000/documents/*').as(
      'delete'
    );  //intercept the delete call
    this.elements.deleteIcon().click();   //click on the delete button

    cy.wait('@delete').its('response.statusCode').should('eq', 200);  //wait for the call to complete successfully
 
    cy.get('div.lucide.lucide-file').should('not.exist');  // assert that the file should be deleted

  }
}

export const uploadDocument = new UploadDocumentPage();  //create instance of class
