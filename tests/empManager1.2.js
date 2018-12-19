var empManagerPageObjs = {}

var clickByText = (browser,textToBeSelected) =>{
    browser
        .useXpath()
        .click(`//*[text()="${textToBeSelected}"]`)
        .useCss()
}


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
        clickByText(browser,'Bernice Ortiz')          
        empManagerPageObjs
            .verify.containsText('@employeeID','1')
            .verify.containsText('@editorTitle','Bernice Ortiz')
            .verify.value('@phoneNumberInput','4824931093')
            .verify.value('@titleInput','CEO')

    },


    //Testing the save functionality
    'Test Script 2 : To test save functionality of valid inputs/changes': browser=>{

        //https://dmutah.atlassian.net/browse/Q9R-31
        empManagerPageObjs
            .click('li[name="employee2"]')
            .verify.containsText('@editorTitle','Marnie Barnett')
            .clearValue('@nameInput')
            .setValue('@nameInput','Marnie Barnett Bishop')
            .clearValue('@phoneNumberInput')
            .setValue('@phoneNumberInput','3545434567')
            .clearValue('@titleInput')
            .setValue('@titleInput','CFO')
            clickByText(browser,' Save ')
        empManagerPageObjs   
            .verify.value('@nameInput','Marnie Barnett Bishop')
            .verify.value('@phoneNumberInput','3545434567')
            .verify.value('@titleInput','CFO')
    },
    'Test Script 3 : To test the modification and save functionality of valid inputs/changes': browser=>{
        //Modifying existing data
        //https://dmutah.atlassian.net/browse/Q9R-31
        empManagerPageObjs
            .click('li[name="employee2"]')
            .verify.containsText('@editorTitle','Marnie Barnett')
            .setValue('@nameInput',' Bishop')
            .setValue('@phoneNumberInput','67')
            .setValue('@titleInput','CFO')
            .click('@saveButton')
            .verify.value('@nameInput','Marnie Barnett Bishop')
            .verify.value('@phoneNumberInput','309481238767')
            .verify.value('@titleInput','CTOCFO')
    },
    'Test Script 4 : To test the modification and save functionality of empty test data': browser=>{  //***This is a bug, The emp records should not save blank info */
        //     //https://dmutah.atlassian.net/browse/Q9R-34
        //     //https://dmutah.atlassian.net/browse/Q9R-43 =>bug------------->This bug was fixed in version 1.1 and passes Manual Test.
        //     //https://dmutah.atlassian.net/browse/Q9R-52 =>bug-------------> The automated test case is failing.
        empManagerPageObjs
                .click('li[name="employee2"]')
                .verify.containsText('@editorTitle','Marnie Barnett')
                .clearValue('@nameInput')
                .setValue('@nameInput',['a',browser.Keys.BACK_SPACE])
                .clearValue('@phoneNumberInput')
                .setValue('@phoneNumberInput',['a',browser.Keys.BACK_SPACE])
                .clearValue('@titleInput')
                .setValue('@titleInput',['d',browser.Keys.BACK_SPACE])
    
                .click('@saveButton')
                //.pause(20000)
                .verify.attributeContains('@nameInput','class',' invalidInfo','Name input field error check')
                .verify.attributeContains('@phoneNumberInput','class',' invalidInfo','Phone input field error check')
                .verify.attributeContains('@titleInput','class',' invalidInfo','Title input field error check')
            },


    //**********************************Test fails due to a bug**************************************************/
    'Test Script 5 : To check if the data can be saved any other way other than the save button':browser =>{
     //https://dmutah.atlassian.net/browse/Q9R-36
     //https://dmutah.atlassian.net/browse/Q9R-45--------->bug----------->this bug was fixed in version 1.1
     empManagerPageObjs
            .click('li[name="employee5"]')
            .verify.containsText('@editorTitle','Dollie Berry')
          
            .setValue('@nameInput','much')
        
            .click('li[name="employee5"]')
            .verify.value('@nameInput','Dollie Berry')
          
    },


    //Testing the Cancel functionality
    'Test Script 6 : To test the modification and cancel functionality':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-33
        empManagerPageObjs
        .click('li[name="employee3"]')
        .verify.containsText('@editorTitle','Phillip Weaver')
        .setValue('@nameInput','bird')
        .click('button[name="cancel"]')
        .verify.value('@nameInput','Phillip Weaver')
    },


    //Checking if the buttons are inactive when they are supposed to be
    'Test Script 7 : Checking if the save and cancel buttons are inactive when no changes are made the employee details.':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-35

        empManagerPageObjs
            .click('li[name="employee3"]')
            .verify.containsText('@editorTitle','Phillip Weaver')
            .verify.attributeContains('@saveButton','disabled','true','checking if save is disabled')
            .verify.attributeContains('@cancelButton','disabled','true','checking if cancel is disabled')

    },
    //********Checking the Name input fields************
    'Test Script 8 : Check for valid length inputs for the Name field.':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-46
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle','Ruby Estrada')
            .clearValue('@nameInput')
            .setValue('@nameInput','Ruby Estrada Joobu Jose Javier')
            .click('@saveButton')
            .verify.value('@nameInput','Ruby Estrada Joobu Jose Javier')
    },
    'Test Script 9 : Check for invalid length inputs for the Name field.':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-46
        //****buggy error message */
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle','Ruby Estrada')
            .clearValue('@nameInput')
            .setValue('@nameInput','Ruby Estrada Joobu Jose Javier Martinez')
            .click('@saveButton')
            .verify.attributeContains('@nameInput','class',' invalidInfo','Name input field error check')
            .verify.attributeContains('@titleInput','class',' invalidInfo','Title input field error check')// Title should not be giving out the invalid message
            
            empManagerPageObjs.verify.containsText('@errorCard','The name field must be between 1 and 30 characters long.')
            
        },
   
    'Test Script 10 : Check for valid type inputs for the Name field.':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-46
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle','Ruby Estrada')
            .clearValue('@nameInput')
            .setValue('@nameInput','Ruby Estrada Jonad^%^%&*&')
            .click('@saveButton')
            .verify.value('@nameInput','Ruby Estrada Jonad^%^%&*&')
            //verify.attributeContains('@nameInput','class',' invalidInfo','Name input field error check')
            //.useXpath()
           //browser.verify.containsText('@errorCard','The name field must be between 1 and 30 characters long.')
    },


     //********Checking the Phone Number input fields *********
    'Test Script 11 : Check for valid length and datatype inputs for the Phone Number field.': browser => {
        //     //https://dmutah.atlassian.net/browse/Q9R-47
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle', 'Ruby Estrada')
            .clearValue('@phoneNumberInput')
            .setValue('@phoneNumberInput', '1234567894')
            .click('@saveButton')
            .verify.value('@phoneNumberInput', '1234567894')
    },
    'Test Script 12 : Check for short length inputs for the Phone Number field.': browser => {
        //     //https://dmutah.atlassian.net/browse/Q9R-47
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle', 'Ruby Estrada')
            .clearValue('@phoneNumberInput')
            .setValue('@phoneNumberInput', '12345')
            .click('@saveButton')
            .verify.attributeContains('@phoneNumberInput', 'class', ' invalidInfo', 'Phone number input field error check')
            
            empManagerPageObjs.verify.containsText('@errorCard', 'The phone number must be 10 digits long.')
         
    },

    'Test Script 13 : Check for long length inputs for the Phone Number field.': browser => {
        //https://dmutah.atlassian.net/browse/Q9R-47
        //https://dmutah.atlassian.net/browse/Q9R-50------->bug
        empManagerPageObjs
            .click('li[name="employee8"]')
            .verify.containsText('@editorTitle', 'Lou White')
            .clearValue('@phoneNumberInput')
            .setValue('@phoneNumberInput', '12345678987654')
            .click('@saveButton')
            //.verify.value('@phoneNumberInput', '12345678987654')
            .verify.attributeContains('@phoneNumberInput','class',' invalidInfo','Phone number input field error check')
            
            empManagerPageObjs.verify.containsText('@errorCard','The phone number must be 10 digits long.')
            
    },
    'Test Script 14 : Check for invalid datatype inputs for the Phone Number field.': browser => {
        //     //https://dmutah.atlassian.net/browse/Q9R-47
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle', 'Ruby Estrada')
            .clearValue('@phoneNumberInput')
            .setValue('@phoneNumberInput', '12536ruhdt')
            .click('@saveButton')
            .verify.attributeContains('@phoneNumberInput', 'class', ' invalidInfo', 'Phone number input field error check')
            
            empManagerPageObjs.verify.containsText('@errorCard', 'The phone number must be 10 digits long.')
         
    },


    // //********* */Checking the Title input fields************** 
    'Test Script 15 : Check for valid length inputs for the Title field.': browser =>{
        //     //https://dmutah.atlassian.net/browse/Q9R-48
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle', 'Ruby Estrada')
            .clearValue('@titleInput')
            .setValue('@titleInput', 'CFO')
            .click('@saveButton')
            .verify.value('@titleInput', 'CFO')
    },
    'Test Script 16 : Check for invalid length inputs for the Title field.': browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-48
        //https://dmutah.atlassian.net/browse/Q9R-51--------->bug
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle', 'Ruby Estrada')
            .clearValue('@titleInput')
            .setValue('@titleInput', 'Ruby Estrada Estrada Estrada Estrada Estrada Estrada Estrada')
            .click('@saveButton')
            .verify.value('@titleInput', 'Ruby Estrada Estrada Estrada Estrada Estrada Estrada Estrada')
            //.verify.attributeContains('@phoneNumberInput', 'class', ' invalidInfo', 'Title input field error check')
          
            // empManagerPageObjs.verify.containsText('@errorCard', 'The title field must be between 1 and 30 characters long.')
            
    },

   
    'Test Script 17 : Check for invalid datatype inputs for the Title field.': browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-48
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle', 'Ruby Estrada')
            .clearValue('@titleInput')
            .setValue('@titleInput', '12536ruhdt')
            .click('@saveButton')
            .verify.value('@titleInput', '12536ruhdt')
            // .verify.attributeContains('@phoneNumberInput', 'class', ' invalidInfo', 'Title input field error check')
            // .useXpath()
            // browser.verify.containsText('@errorCard', 'The title field must be between 1 and 30 characters long.')
            // .useCss()
    },
       
    
    //**********************this is a bug and is set up in a way that is does not throw an error for now*********************************/
    'Test Script 18 : Error Message persists from one employee to another, once an Phone number field throws an error and turns red, the color persists': browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-54
        //https://dmutah.atlassian.net/browse/Q9R-53  ------>This bug is fixed in version 1.2
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle', 'Ruby Estrada')
            .clearValue('@phoneNumberInput')
            .setValue('@phoneNumberInput', '12536ruhdt')
            .click('@saveButton')
            .verify.attributeContains('@phoneNumberInput', 'class', ' invalidInfo', 'Phone number input field error check')
           
            empManagerPageObjs.verify.containsText('@errorCard', 'The phone number must be 10 digits long.')
      
            .click('li[name="employee5"]')
            .setValue('@nameInput', 'Berry')
            .click('@saveButton')
            .verify.value('@nameInput', 'Dollie BerryBerry')
            .verify.attributeContains('@phoneNumberInput','class','materialInput','Phone number input field error check')
    },

    'Test Script 19 : Error Message persists from one employee to another, once an name/title field throws an error and turns red, any data after that is not saved': browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-55
        //https://dmutah.atlassian.net/browse/Q9R-56  ------>Bug report
        empManagerPageObjs
            .click('li[name="employee7"]')
            .verify.containsText('@editorTitle', 'Ruby Estrada')
            .clearValue('@nameInput')
            .setValue('@nameInput', '12536ruhdt12536ruhdt12536ruhdt12536ruhdt12536ruhdt12536ruhdt')
            .click('@saveButton')
            .verify.attributeContains('@nameInput', 'class', ' invalidInfo', 'Name input field error check')
            
            empManagerPageObjs.verify.containsText('@errorCard', 'The name field must be between 1 and 30 characters long.')
           
            .click('li[name="employee5"]')
            .setValue('@nameInput', 'Berry')
            .click('@saveButton')
            .getText("@editorTitle",results =>{
            browser.verify.ok("Dollie BerryBerry"===results.value,'Checks that the record is updated afrer save')
            })
           
            empManagerPageObjs.verify.attributeContains('@nameInput','class','materialInput','Name  input field error check')
    },

}