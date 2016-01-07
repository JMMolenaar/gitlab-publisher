"use strict";

var sqlite3 = require('sqlite3').verbose();
var db;

function createDb() {
    console.log("createDb chain");
    db = new sqlite3.Database('projects.sqlite3', createTable);
    return db;
}


function createTable() {
    console.log("createTable projects");
    db.run("CREATE TABLE IF NOT EXISTS projects (project_id, name, path, owner_name, owner_email,created_at)");
}


function insertProject(data){

    var stmt = db.prepare("INSERT INTO projects VALUES(?,?,?,?,?)");
    stmt.run(data.project_id, data.name, data.path, data.owner_name, data.owner_email, data.created_at);
    stmt.finalize();

}

function listProjects(cb){
    db.all("SELECT * FROM projects", cb);
}
//function insertRows() {
//    console.log("insertRows Ipsum i");
//    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//
//    for (var i = 0; i < 10; i++) {
//        stmt.run("Ipsum " + i);
//    }
//
//    stmt.finalize(readAllRows);
//}
//
//function readAllRows() {
//    console.log("readAllRows lorem");
//    db.all("SELECT rowid AS id, info FROM lorem", function(err, rows) {
//        rows.forEach(function (row) {
//            console.log(row.id + ": " + row.info);
//        });
//        closeDb();
//    });
//}

function closeDb() {
    console.log("closeDb");
    db.close();
}

module.exports = {
    db: db,
    create: createDb,
    close: closeDb,
    insert: insertProject,
    list: listProjects
};