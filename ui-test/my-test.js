import { Selector } from 'testcafe';

fixture("User accounts")

/*test.page("https://weeknumber.net")("Test weeks", async t => {
    await t
        .typeText("#q", "1/1 2018")
        .click("#querybox > form > button")
        .expect(Selector("#ugenr").innerText).eql("week 1")
        .selectText(Selector("#q"))
        .pressKey("delete")
        .typeText("#q", "1/1 2017")
        .click("#querybox > form > button")
        .expect(Selector("#ugenr").innerText).eql("week 52");
})*/

test.page(process.env.BASE_URL + "/admin/register")("Register admin account", async t => {
    await t
        .takeScreenshot()
        .click("#create-admin-account")
        .expect(Selector("#email-validation").visible).ok()
        .expect(Selector("#name-validation").visible).ok()
        .expect(Selector("#password-validation").visible).ok()
        .expect(Selector("#password-confirm-validation").visible).ok()
        .typeText("#registerEmail", "tbmh@easv.dk")
        .typeText("#registerName", "Thomas")
        .typeText("#registerPassword", "test1234")
        .typeText("#registerConfirmPassword", "test1234")
        .click("#create-admin-account")
        .expect(Selector("#login-button").visible).ok()
        .takeScreenshot();
})

test.page(process.env.BASE_URL + "/admin/login")("Login to admin account", async t => {
    await t
        .typeText("#loginEmail", "wrong@wrong.dk")
        .typeText("#loginPassword", "wrong")
        .click("#login-button")
        .expect(Selector("#login-failed-error").visible).ok()
        .takeScreenshot()
        .selectText(Selector("#loginEmail"))
        .pressKey("delete")
        .selectText(Selector("#loginPassword"))
        .pressKey("delete")
        .typeText("#loginEmail", "tbmh@easv.dk")
        .typeText("#loginPassword", "test1234")
        .click("#login-button")
        .takeScreenshot()
        .expect(Selector("title").innerText).contains("Dashboard")
})