import Db from "../db";

async function init() {
  const db = Db.getInstance();

  console.log(db.getAllUsers());
}
init();
