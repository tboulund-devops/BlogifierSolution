import { ClientFunction, Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://devops.setgo.dk:9876/`;

test("My first test", async t => {
    const getPathname = ClientFunction(() => document.location.pathname);

    await t
        .expect(getPathname()).eql("/admin/register")
        .takeScreenshot()
        .click("#app > div > form > button")
        .expect(await Selector("#app > div > form > div:nth-child(1) > div").visible).ok()
        .expect(await Selector("#app > div > form > div:nth-child(2) > div").visible).ok()
        .expect(await Selector("#app > div > form > div:nth-child(3) > div").visible).ok()
        .expect(await Selector("#app > div > form > div:nth-child(4) > div").visible).ok()
        .takeScreenshot();
})