module.exports = {
    url : 'https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html',
    elements : {
        noEmployee:'p#noEmployee',
        employeeID:'span[id="employeeID"]',
        editorTitle:'p#employeeTitle',
        nameInput: 'input[name="nameEntry"]',
        phoneNumberInput:'input[name="phoneEntry"]',
        titleInput:'input[name="titleEntry"]',
        errorCard:{
                    selector: '//span[@class="errorMessage"]',
                    locateStrategy: 'xpath',
                    },
        saveButton:'button#saveBtn',
        cancelButton:'button.neutralButton'            

    }               
}