# MyCypressProject
* My github project contains my cypress tests in a file fileUpload.cy.js
* Testing data is added in the fixtures folder
* Run the github action which contains workflow to run tests on the Docker application
* By default baseUrl is set to localhost:8000/

What this project does is:
* It checks first that the upload button is disabled.
* It uploads and tests with invalid file and then deletes the file
* It uploads and tests with a valid test file, uploads it and verifies the call is successful.
* It then clicks on process button to process the file, this call is failing mostly throwing 500.
* It asks questions from chatbot, using the expectedAnswers file in fixtures folder and validates teh responses based on comapring regex.
* Finally it clicks on delete to delete the file. 


# Issues in Project
1. Getting 500 on processing some files even valid pdfs

2. Getting 500 when I ask even basic simple questions from chatbot like What is the summary of this document?

3. Asking multiple questions at at time also crashes the system.

4. The references are not very accurate , they pick up a whole chunk of data and show it as responses.

