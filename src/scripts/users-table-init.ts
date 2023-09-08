import Db from "../db";

async function init() {
  const db = Db.getInstance();
  const tableExists = db.doesTableExist();

  if (tableExists) {
    const result = db.getAllUsers();
    console.log(result);

    if (result.length === 0) {
      db.seedUsersTable();
      const result = db.getAllUsers();
      console.log(result);
      return;
    }

    return;
  }

  db.createUsersTable();

  const doesCreatedTableExist = db.doesTableExist();

  if (!doesCreatedTableExist) {
    throw new Error("something went wrong");
  }

  db.seedUsersTable();
}
init();
