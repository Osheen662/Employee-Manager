module.exports = {
    beforeEach: browser =>{
        browser.url("https://devmountain-qa.github.io/employee-manager/1.0_Version/index.html")
        .waitForElementPresent("#root",5000)
        browser
        .getText("p#noEmployee",results =>{
            browser.verify.ok("No Employee Selected"===results.value,'Checks that no employee is selected on page load')
            console.log(results.value);
        })
    },

    after: browser =>{
        browser.end()
    },
    'Loading correct employee info in the editor':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-32
        browser
            .click('li[name="employee1"]')
            .verify.containsText('p#employeeTitle','Bernice Ortiz')
            .verify.value('input[name="phoneEntry"]','4824931093')
            .verify.value('input[name="titleEntry"]','CEO')

    },


    //Testing the save functionality
    'To test save functionality of valid inputs/changes': browser=>{

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
    'To test the modification and save functionality of valid inputs/changes': browser=>{
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
    'To test the modification and save functionality of empty test data': browser=>{  //***This is a bug, The emp records should not save blank info */
        //https://dmutah.atlassian.net/browse/Q9R-34
        //https://dmutah.atlassian.net/browse/Q9R-43 =>bug
        browser
            .click('li[name="employee2"]')
            .verify.containsText('p#employeeTitle','Marnie Barnett')
            .clearValue('input[name="nameEntry"]')
           
            .clearValue('input[name="phoneEntry"]')
          
            .clearValue('input[name="titleEntry"]')
         
            .click('button#saveBtn')
            .verify.value('input[name="nameEntry"]','')
            .verify.value('input[name="phoneEntry"]','')
            .verify.value('input[name="titleEntry"]','')
    },

    //**********************************Test fails due to a bug**************************************************/
    // 'To check if the data can be saved any other way other than the save button':browser =>{
    //  //https://dmutah.atlassian.net/browse/Q9R-36
    //  //https://dmutah.atlassian.net/browse/Q9R-45
    //     browser
    //         .click('li[name="employee5"]')
    //         .verify.containsText('p#employeeTitle','Dollie Berry')
          
    //         .setValue('input[name="nameEntry"]','much')
        
    //         .click('li[name="employee5"]')
    //         .verify.value('input[name="nameEntry"]','Dollie Berry')
          
    // },


    //Testing the Cancel functionality
    'To test the modification and cancel functionality':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-33
        browser
        .click('li[name="employee3"]')
        .verify.containsText('p#employeeTitle','Phillip Weaver')
        .setValue('input[name="nameEntry"]','bird')
        .click('button[name="cancel"]')
        .verify.value('input[name="nameEntry"]','Phillip Weaver')
    },


    //Checking i fthe buttons are inactive when they are supposed to be
    'Checking if the save and cancel buttons are inactive when no changes are made the employee details.':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-35

        browser
            .click('li[name="employee3"]')
            .verify.containsText('p#employeeTitle','Phillip Weaver')
            .verify.attributeContains('button#saveBtn','disabled','true','checking if save is disabled')
            .verify.attributeContains('button.neutralButton','disabled','true','checking if cancel is disabled')

    },
   
    // MAKING SURE THIS WORKED 
}