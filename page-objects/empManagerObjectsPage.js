var employeeeManagerCommands = {
    clickByText:  function(textToBeSelected){
        this.api.useXpath()
        this.click(`//*[text()="${textToBeSelected}"]`)
        this.api.useCss()
        return this
    },
    
    editEmployee: function(newEmployeeInfo){
        if(newEmployeeInfo.name){
            this
                .clearValue('@nameInput')
                .setValue('@nameInput',newEmployeeInfo.name)
        }
         if(newEmployeeInfo.phone){
            this
                .clearValue('@phoneNumberInput')
                .setValue('@phoneNumberInput',newEmployeeInfo.phone)
         }   
         if(newEmployeeInfo.title){
            this
                .clearValue('@titleInput')
                .setValue('@titleInput',newEmployeeInfo.title)
         }   
            
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
    //url : 'http://localhost:3000/',
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