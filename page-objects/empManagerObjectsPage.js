var employeeeManagerCommands = {
    clickByText:  function(textToBeSelected){
        this.api.useXpath()
        this.click(`//*[text()="${textToBeSelected}"]`)
        this.api.useCss()
        return this
    },
    
    modifyEmployee: function(oldEmployeeInfo,newEmployeeInfo,verificationEmployee){
        this
            .clickByText(oldEmployeeInfo)
            .verify.containsText('@editorTitle',oldEmployeeInfo)
            .clearValue('@nameInput')
            .setValue('@nameInput',newEmployeeInfo.name)
            .clearValue('@phoneNumberInput')
            .setValue('@phoneNumberInput',newEmployeeInfo.phone)
            .clearValue('@titleInput')
            .setValue('@titleInput',newEmployeeInfo.title)
            .clickByText(' Save ')
            .clickByText(verificationEmployee)
            .clickByText(newEmployeeInfo.name)
        return this
    },
    
    verificationOfSelectedEmployeeDetails: function(employeeInfo){
        this
            .clickByText(employeeInfo.name)
            .verify.value('@nameInput',employeeInfo.name)
            .verify.value('@phoneNumberInput',employeeInfo.phone)
            .verify.value('@titleInput',employeeInfo.title)
        return this
    }
}

module.exports = {
    url : 'https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html',
    commands: [employeeeManagerCommands],
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