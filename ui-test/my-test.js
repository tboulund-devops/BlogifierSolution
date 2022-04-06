import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://www.google.dk`;

test("My first test", async t => {
    await t.takeScreenshot();
})