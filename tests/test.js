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
        // empManagerPageObjs
        // .getText('@noEmployee',results =>{
        //    empManagerPageObjs.verify.ok("No Employee Selected"===results.value,'Checks that no employee is selected on page load')
        //    //console.log(results.value);
        // })
    },

    after: browser =>{
        browser.end()
    },
    'Test Script 1 : Loading correct employee info in the editor':browser =>{
        //https://dmutah.atlassian.net/browse/Q9R-32
        clickByText(browser,'Bernice Ortiz')
        empManagerPageObjs
           
            .verify.containsText('@employeeID','1')
            .verify.containsText('p#employeeTitle','Bernice Ortiz')
            .verify.value('input[name="phoneEntry"]','4824931093')
            .verify.value('input[name="titleEntry"]','CEO')

    },
}