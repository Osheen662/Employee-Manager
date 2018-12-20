var empManagerPageObjs = {}

let modifyEmployee = require('../test-assests/modulesPractice')
// var clickByText = (browser,textToBeSelected) =>{
//     browser
//         .useXpath()
//         .click(`//*[text()="${textToBeSelected}"]`)
//         .useCss()
// }

// var modifyEmployee = (pageObject,oldEmployeeInfo,newEmployeeInfo,verificationEmployee) =>{
//     clickByText(pageObject.api,oldEmployeeInfo)
//     pageObject
//     .verify.containsText('@editorTitle',oldEmployeeInfo)
//     .clearValue('@nameInput')
//     .setValue('@nameInput',newEmployeeInfo.name)
//     .clearValue('@phoneNumberInput')
//     .setValue('@phoneNumberInput',newEmployeeInfo.phone)
//     .clearValue('@titleInput')
//     .setValue('@titleInput',newEmployeeInfo.title)
//     clickByText(pageObject.api,' Save ')
//     clickByText(pageObject.api,verificationEmployee)
//     clickByText(pageObject.api,newEmployeeInfo.name)
// }

// var verificationOfSelectedEmployeeDetails = (pageObject,employeeInfo) =>{
//     clickByText(pageObject.api,employeeInfo.name)
//     pageObject
           
//             .verify.value('@nameInput',employeeInfo.name)
//             .verify.value('@phoneNumberInput',employeeInfo.phone)
//             .verify.value('@titleInput',employeeInfo.title)
// }

module.exports = {
    beforeEach: browser =>{
        empManagerPageObjs = browser.page.empManagerObjectsPage()
        empManagerPageObjs.navigate()
       empManagerPageObjs
        .getText('@noEmployee',results =>{
           empManagerPageObjs.verify.ok("No Employee Selected"===results.value,'Checks that no employee is selected on page load')
           //console.log(results.value);
       })
    },

    after: browser =>{
        browser.end()
    },
    'Test Script 1 : Loading correct employee info in the editor':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-32
        empManagerPageObjs
            .clickByText('Bernice Ortiz')          
            .verify.containsText('@employeeID','1')
            .verificationOfSelectedEmployeeDetails({name:'Bernice Ortiz',phone: '4824931093',title: 'CEO'})
            //.api.pause(20000)
    },


    //Testing the save functionality
    'Test Script 2 : To test save functionality of valid inputs/changes': browser=>{
        //https://dmutah.atlassian.net/browse/Q9R-31
    
            modifyEmployee(empManagerPageObjs,'Marnie Barnett',{name:'Marnie Barnett Bishop',phone:'3545434567',title:'CFO'}, 'Dollie Berry')
            empManagerPageObjs
            .verificationOfSelectedEmployeeDetails({name: 'Marnie Barnett Bishop',phone: '3545434567',title: 'CFO'})
            //.api.pause(20000)
    
    },
    'Test Script 3 : To test the modification and save functionality of valid inputs/changes': browser=>{
        //Modifying existing data
        //https://dmutah.atlassian.net/browse/Q9R-31
        empManagerPageObjs
        .clickByText('Marnie Barnett')
        .verify.containsText('@editorTitle','Marnie Barnett')
        .setValue('@nameInput',' Bishop')
        .setValue('@titleInput','CFO')
        .clickByText(' Save ')
        .verificationOfSelectedEmployeeDetails({name: 'Marnie Barnett Bishop',phone: '3094812387',title: 'CTOCFO'})
        //.api.pause(20000)
    },     
    
    'Test Script 4 : To test the Add Employee Functionality': browser=>{
        //Adding a new Employee
        //https://dmutah.atlassian.net/browse/Q9R-57
        empManagerPageObjs
        .clickByText(' + Add Employee ')   // # Click on  "+ Add Employee "
        // # A new employee with the name "New Employee" will be created.
        // # Verify the details in the editor.
        // # Add the desired employee name, phone, and title.
        // # Click save
        // # Click on another employee record.
        modifyEmployee(empManagerPageObjs,'New Employee',{name:'Ichigo Kurosaki',phone:'3545434567',title:'Shinigami'}, 'Dollie Berry' )
         // # Click back on the newly created employee and verify the entered details.
         empManagerPageObjs.verificationOfSelectedEmployeeDetails({name: 'Ichigo Kurosaki',phone: '3545434567',title: 'Shinigami'})
       // .api.pause(20000)
       
    }
}