module.exports = {
    beforeEach: browser =>{
        browser.url("https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html")
        .waitForElementPresent("#root",5000)
        browser
        .getText("p#noEmployee",results =>{
            browser.verify.ok("No Employee Selected"===results.value,'Checks that no employee is selected on page load')
           // console.log(results.value);
        })
    },

    after: browser =>{
        browser.end()
    },
    'Test Script 1 : Loading correct employee info in the editor':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-32
        browser
            .click('li[name="employee1"]')
            .verify.containsText('span[id="employeeID"]','1')
            .verify.containsText('p#employeeTitle','Bernice Ortiz')
            .verify.value('input[name="phoneEntry"]','4824931093')
            .verify.value('input[name="titleEntry"]','CEO')

    },


    //Testing the save functionality
    'Test Script 2 : To test save functionality of valid inputs/changes': browser=>{

        //https://dmutah.atlassian.net/browse/Q9R-31
        browser
            .click('li[name="employee2"]')
            .verify.containsText('p#employeeTitle','Marnie Barnett')
            .clearValue('input[name="nameEntry"]')
            .setValue('input[name="nameEntry"]','Marnie Barnett Bishop')
            .clearValue('input[name="phoneEntry"]')
            .setValue('input[name="phoneEntry"]','3545434567')
            .clearValue('input[name="titleEntry"]')
            .setValue('input[name="titleEntry"]','CFO')
            .click('button#saveBtn')
            .verify.value('input[name="nameEntry"]','Marnie Barnett Bishop')
            .verify.value('input[name="phoneEntry"]','3545434567')
            .verify.value('input[name="titleEntry"]','CFO')
    },
    'Test Script 3 : To test the modification and save functionality of valid inputs/changes': browser=>{
        //Modifying existing data
        //https://dmutah.atlassian.net/browse/Q9R-31
        browser
            .click('li[name="employee2"]')
            .verify.containsText('p#employeeTitle','Marnie Barnett')
            .setValue('input[name="nameEntry"]',' Bishop')
            .setValue('input[name="phoneEntry"]','67')
            .setValue('input[name="titleEntry"]','CFO')
            .click('button#saveBtn')
            .verify.value('input[name="nameEntry"]','Marnie Barnett Bishop')
            .verify.value('input[name="phoneEntry"]','309481238767')
            .verify.value('input[name="titleEntry"]','CTOCFO')
    },
    'Test Script 4 : To test the modification and save functionality of empty test data': browser=>{  //***This is a bug, The emp records should not save blank info */
        //     //https://dmutah.atlassian.net/browse/Q9R-34
        //     //https://dmutah.atlassian.net/browse/Q9R-43 =>bug------------->This bug was fixed in version 1.1 and passes Manual Test.
        //     //https://dmutah.atlassian.net/browse/Q9R-52 =>bug-------------> The automated test case is failing.
            browser
                .click('li[name="employee2"]')
                .verify.containsText('p#employeeTitle','Marnie Barnett')
                .clearValue('input[name="nameEntry"]')
                .setValue('input[name="nameEntry"]',['a',browser.Keys.BACK_SPACE])
                .clearValue('input[name="phoneEntry"]')
                .setValue('input[name="phoneEntry"]',['a',browser.Keys.BACK_SPACE])
                .clearValue('input[name="titleEntry"]')
                .setValue('input[name="titleEntry"]',['d',browser.Keys.BACK_SPACE])
    
                .click('button#saveBtn')
                //.pause(20000)
                .verify.attributeContains('input[name="nameEntry"]','class',' invalidInfo','Name input field error check')
                .verify.attributeContains('input[name="phoneEntry"]','class',' invalidInfo','Phone input field error check')
                .verify.attributeContains('input[name="titleEntry"]','class',' invalidInfo','Title input field error check')
            },


    //**********************************Test fails due to a bug**************************************************/
    'Test Script 5 : To check if the data can be saved any other way other than the save button':browser =>{
     //https://dmutah.atlassian.net/browse/Q9R-36
     //https://dmutah.atlassian.net/browse/Q9R-45--------->bug----------->this bug was fixed in version 1.1
        browser
            .click('li[name="employee5"]')
            .verify.containsText('p#employeeTitle','Dollie Berry')
          
            .setValue('input[name="nameEntry"]','much')
        
            .click('li[name="employee5"]')
            .verify.value('input[name="nameEntry"]','Dollie Berry')
          
    },


    //Testing the Cancel functionality
    'Test Script 6 : To test the modification and cancel functionality':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-33
        browser
        .click('li[name="employee3"]')
        .verify.containsText('p#employeeTitle','Phillip Weaver')
        .setValue('input[name="nameEntry"]','bird')
        .click('button[name="cancel"]')
        .verify.value('input[name="nameEntry"]','Phillip Weaver')
    },


    //Checking if the buttons are inactive when they are supposed to be
    'Test Script 7 : Checking if the save and cancel buttons are inactive when no changes are made the employee details.':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-35

        browser
            .click('li[name="employee3"]')
            .verify.containsText('p#employeeTitle','Phillip Weaver')
            .verify.attributeContains('button#saveBtn','disabled','true','checking if save is disabled')
            .verify.attributeContains('button.neutralButton','disabled','true','checking if cancel is disabled')

    },
    //********Checking the Name input fields************
    'Test Script 8 : Check for valid length inputs for the Name field.':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-46
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle','Ruby Estrada')
            .clearValue('input[name="nameEntry"]')
            .setValue('input[name="nameEntry"]','Ruby Estrada Joobu Jose Javier')
            .click('button#saveBtn')
            .verify.value('input[name="nameEntry"]','Ruby Estrada Joobu Jose Javier')
    },
    'Test Script 9 : Check for invalid length inputs for the Name field.':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-46
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle','Ruby Estrada')
            .clearValue('input[name="nameEntry"]')
            .setValue('input[name="nameEntry"]','Ruby Estrada Joobu Jose Javier Martinez')
            .click('button#saveBtn')
            .verify.attributeContains('input[name="nameEntry"]','class',' invalidInfo','Name input field error check')
            .useXpath()
            browser.verify.containsText('/html/body/div/div/div[2]/div[2]/div[2]/span','The name field must be between 1 and 30 characters long. The title field must be between 1 and 30 characters long.')
            .useCss()
        },
   
    'Test Script 10 : Check for valid type inputs for the Name field.':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-46
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle','Ruby Estrada')
            .clearValue('input[name="nameEntry"]')
            .setValue('input[name="nameEntry"]','Ruby Estrada Jonad^%^%&*&')
            .click('button#saveBtn')
            .verify.value('input[name="nameEntry"]','Ruby Estrada Jonad^%^%&*&')
            //verify.attributeContains('input[name="nameEntry"]','class',' invalidInfo','Name input field error check')
            //.useXpath()
           //browser.verify.containsText('/html/body/div/div/div[2]/div[2]/div[2]/span','The name field must be between 1 and 30 characters long. The title field must be between 1 and 30 characters long.')
    },


     //********Checking the Phone Number input fields *********
    'Test Script 11 : Check for valid length and datatype inputs for the Phone Number field.': browser => {
        //     //https://dmutah.atlassian.net/browse/Q9R-47
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle', 'Ruby Estrada')
            .clearValue('input[name="phoneEntry"]')
            .setValue('input[name="phoneEntry"]', '1234567894')
            .click('button#saveBtn')
            .verify.value('input[name="phoneEntry"]', '1234567894')
    },
    'Test Script 12 : Check for short length inputs for the Phone Number field.': browser => {
        //     //https://dmutah.atlassian.net/browse/Q9R-47
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle', 'Ruby Estrada')
            .clearValue('input[name="phoneEntry"]')
            .setValue('input[name="phoneEntry"]', '12345')
            .click('button#saveBtn')
            .verify.attributeContains('input[name="phoneEntry"]', 'class', ' invalidInfo', 'Phone number input field error check')
            .useXpath()
        browser.verify.containsText('/html/body/div/div/div[2]/div[2]/div[2]/span', 'T he phone number must be 10 digits long.')
            .useCss()
    },

    'Test Script 13 : Check for long length inputs for the Phone Number field.': browser => {
        //https://dmutah.atlassian.net/browse/Q9R-47
        //https://dmutah.atlassian.net/browse/Q9R-50------->bug
        browser
            .click('li[name="employee8"]')
            .verify.containsText('p#employeeTitle', 'Lou White')
            .clearValue('input[name="phoneEntry"]')
            .setValue('input[name="phoneEntry"]', '12345678987654')
            .click('button#saveBtn')
            .verify.value('input[name="phoneEntry"]', '12345678987654')
        // .verify.attributeContains('input[name="phoneEntry"]','class',' invalidInfo','Phone number input field error check')
        // .useXpath()
        // browser.verify.containsText('/html/body/div/div/div[2]/div[2]/div[2]/span','T he phone number must be 10 digits long.')
        //.useCss()
    },
    'Test Script 14 : Check for invalid datatype inputs for the Phone Number field.': browser => {
        //     //https://dmutah.atlassian.net/browse/Q9R-47
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle', 'Ruby Estrada')
            .clearValue('input[name="phoneEntry"]')
            .setValue('input[name="phoneEntry"]', '12536ruhdt')
            .click('button#saveBtn')
            .verify.attributeContains('input[name="phoneEntry"]', 'class', ' invalidInfo', 'Phone number input field error check')
            .useXpath()
            browser.verify.containsText('/html/body/div/div/div[2]/div[2]/div[2]/span', 'T he phone number must be 10 digits long.')
            .useCss()
    },


    // //********* */Checking the Title input fields************** 
    'Test Script 15 : Check for valid length inputs for the Title field.': browser =>{
        //     //https://dmutah.atlassian.net/browse/Q9R-48
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle', 'Ruby Estrada')
            .clearValue('input[name="titleEntry"]')
            .setValue('input[name="titleEntry"]', 'Ruby Estrada Estrada')
            .click('button#saveBtn')
            .verify.value('input[name="titleEntry"]', 'Ruby Estrada Estrada')
    },
    'Test Script 16 : Check for invalid length inputs for the Title field.': browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-48
        //https://dmutah.atlassian.net/browse/Q9R-51--------->bug
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle', 'Ruby Estrada')
            .clearValue('input[name="titleEntry"]')
            .setValue('input[name="titleEntry"]', 'Ruby Estrada Estrada Estrada Estrada Estrada Estrada Estrada')
            .click('button#saveBtn')
            .verify.value('input[name="titleEntry"]', 'Ruby Estrada Estrada Estrada Estrada Estrada Estrada Estrada')
            //.verify.attributeContains('input[name="phoneEntry"]', 'class', ' invalidInfo', 'Title input field error check')
            // .useXpath()
            // browser.verify.containsText('/html/body/div/div/div[2]/div[2]/div[2]/span', 'The title field must be between 1 and 30 characters long.')
            // .useCss()
    },

   
    'Test Script 17 : Check for invalid datatype inputs for the Title field.': browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-48
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle', 'Ruby Estrada')
            .clearValue('input[name="titleEntry"]')
            .setValue('input[name="titleEntry"]', '12536ruhdt')
            .click('button#saveBtn')
            .verify.value('input[name="titleEntry"]', '12536ruhdt')
            // .verify.attributeContains('input[name="phoneEntry"]', 'class', ' invalidInfo', 'Title input field error check')
            // .useXpath()
            // browser.verify.containsText('/html/body/div/div/div[2]/div[2]/div[2]/span', 'The title field must be between 1 and 30 characters long.')
            // .useCss()
    },
       
    
    //**********************this is a bug and is set up in a way that is does not throw an error for now*********************************/
    'Test Script 18 : Error Message persists from one employee to another, once an Phone number field throws an error and turns red, the color persists': browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-54
        //https://dmutah.atlassian.net/browse/Q9R-53  ------>Bug report
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle', 'Ruby Estrada')
            .clearValue('input[name="phoneEntry"]')
            .setValue('input[name="phoneEntry"]', '12536ruhdt')
            .click('button#saveBtn')
            .verify.attributeContains('input[name="phoneEntry"]', 'class', ' invalidInfo', 'Phone number input field error check')
            .useXpath()
            browser.verify.containsText('/html/body/div/div/div[2]/div[2]/div[2]/span', 'T he phone number must be 10 digits long.')
            .useCss()
            .click('li[name="employee5"]')
            .setValue('input[name="nameEntry"]', 'Berry')
            .click('button#saveBtn')
            .verify.value('input[name="nameEntry"]', 'Dollie BerryBerry')
            .verify.attributeContains('input[name="phoneEntry"]','class','invalidInfo','Phone number input field error check')//The field should not be red anymore, but it is
    },

    'Test Script 19 : Error Message persists from one employee to another, once an name/title field throws an error and turns red, any data after that is not saved': browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-55
        //https://dmutah.atlassian.net/browse/Q9R-56  ------>Bug report
        browser
            .click('li[name="employee7"]')
            .verify.containsText('p#employeeTitle', 'Ruby Estrada')
            .clearValue('input[name="nameEntry"]')
            .setValue('input[name="nameEntry"]', '12536ruhdt12536ruhdt12536ruhdt12536ruhdt12536ruhdt12536ruhdt')
            .click('button#saveBtn')
            .verify.attributeContains('input[name="nameEntry"]', 'class', ' invalidInfo', 'Phone number input field error check')
            .useXpath()
            browser.verify.containsText('/html/body/div/div/div[2]/div[2]/div[2]/span', 'The name field must be between 1 and 30 characters long.')
            .useCss()
            .click('li[name="employee5"]')
            .setValue('input[name="nameEntry"]', 'Berry')
            .click('button#saveBtn')
            .verify.containsText('p#employeeTitle', 'Dollie Berry')//The data is not updated even after valid data type and length is entered
            .verify.attributeContains('input[name="nameEntry"]','class','invalidInfo','Name  input field error check')//The field should not be red anymore, but it is
    },

}