module.exports = (pageObject,oldEmployeeInfo,newEmployeeInfo,verificationEmployee) =>{
    pageObject
            .clickByText(oldEmployeeInfo)
            .verify.containsText('@editorTitle',oldEmployeeInfo)
            .editEmployee(newEmployeeInfo)
            .clickByText(' Save ')
            .clickByText(verificationEmployee)
            .clickByText(newEmployeeInfo.name)
       }

