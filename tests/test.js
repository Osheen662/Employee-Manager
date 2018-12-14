module.exports = {
    beforeEach: browser => {
        browser.url("https://devmountain-qa.github.io/employee-manager/1.1_Version/index.html")
        .waitForElementPresent("#root",10000)
        browser
            .getText("p#noEmployee", results => {
                browser.verify.ok("No Employee Selected" === results.value, 'Checks that no employee is selected on page load')
                //console.log(results.value);
                //console.log(browser.Keys)
            })
    },

    after: browser => {
        browser.end()
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

}