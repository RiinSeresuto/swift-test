const Localbase = require("./localbase.dev");

export const db = new Localbase("test-bank");

db.config.debug = false;

/*
db.collection("identification").doc({ id: "6afe80cc-ff96-4944-8865-2f35fdb8ce3e" }).update({
    chapterNo: "1",
});
*/
