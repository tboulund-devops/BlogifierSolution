import { ClientFunction, Selector } from 'testcafe';

fixture("User accounts")

test.page("http://devops.setgo.dk:9876/admin/register")("Register admin account", async t => {
    const getPathname = ClientFunction(() => document.location.pathname);
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
        .expect(getPathname()).contains("/admin/login/")
        .takeScreenshot();
})

test.page("http://devops.setgo.dk:9876/admin/login")("Login to admin account", async t => {
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