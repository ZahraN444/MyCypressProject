class UploadDocumentPage {
  elements = {
    FileInput: () => cy.get('input[type="file"]'), //making elements in the class so that they are accessible by all fucnitons
    uploadButton: () => cy.get("div.flex.items-center.space-x-2 input"),
  };

  uploadDoc(files) {
    const filesForUpload = Array.isArray(files) ? files : [files]; //check if files is a signle object or array

    const fileUploads = filesForUpload.map(({ fileName, fileType }) => ({
      //this maps the files for a format that cypress can interpret
      filePath: fileName,
      mimeType: fileType,
    }));

    // Attach all files to the same input
    return this.elements.FileInput().should("exist").attachFile(fileUploads);
  }

  uploadButton() {
    this.elements.uploadButton().then(($btn)=>{

      click();

    })

    cy.get('label[for="fileInput"]').then(($label) => {
      if ($label.text().includes("file(s) selected")) {
        //this checks if any file is attached or not
        cy.get("#popupMessage")
          .should("be.visible")
          .then(($msg) => {
            cy.wrap($msg).should("have.text", "File is being processed..."); // Confirm the text to ensure file upload is in progress
          });

        //Here I want to intercept the successful network call to assert that file uploaded successfully but I am unable to because application isnt working till that point
      } else {
        cy.on("window:alert", (alertText) => {
          //if no file is attached then throws error
          // Assert the alert message text
          expect(alertText).to.equal("Please select files to upload.");
        });
      }
    });
  }
}

export const uploadDocument = new UploadDocumentPage();
