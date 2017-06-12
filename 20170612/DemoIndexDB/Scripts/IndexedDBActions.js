localDatabase.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

localDatabase.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

localDatabase.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

function writeToConsoleScreen(message) {
    var now = new Date();
    var outStr = now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();

    $("#console").prepend("> " + outStr + " " + message + '</br>');
}

localDatabase.indexedDB.onerror = function (e) {   
    writeToConsoleScreen("Database error  " + e.target.errorCode);   
};

localDatabase.indexedDB.onsuccess = function (e) {   
    writeToConsoleScreen("Database success  " + e.target.errorCode);   
};

function openDatabase() {
    writeToConsoleScreen("Started database open - " + dbName);
    var openRequest = localDatabase.indexedDB.open(dbName, 1);

    openRequest.onerror = function(e) {       
        writeToConsoleScreen("Database opened error: " + event.target.error);
    };
    openRequest.onsuccess = function(event) {
        localDatabase.db = openRequest.result;
        writeToConsoleScreen("Finished database open " + localDatabase.db.name);              
    };  
}

function closeDatabase() {
    writeToConsoleScreen("Started database close");
    localDatabase.db.close();
    writeToConsoleScreen("Finished database close");
}

function createDatabase() {
    var deleteDbRequest;

    try {
        if (localDatabase.db != null) localDatabase.db.close();        

        deleteDbRequest = localDatabase.indexedDB.deleteDatabase(dbName); // delete old db

        deleteDbRequest.onsuccess = function (event) {
            writeToConsoleScreen('Started database create - ' + dbName);
            var openRequest = localDatabase.indexedDB.open(dbName, 1); //version used

            openRequest.onerror = function (e) {
                writeToConsoleScreen("Database error: " + e.target.errorCode);
            };
            openRequest.onsuccess = function (event) {
                writeToConsoleScreen('Finished database create - ' + dbName);               
                localDatabase.db = openRequest.result;
            };
            openRequest.onupgradeneeded = function (evt) {

                // check if OS\table not already added
                if (!evt.currentTarget.result.objectStoreNames.contains(osTableName)) {
                    writeToConsoleScreen("Started creating object-store - '" + osTableName);
                    var employeeStore = evt.currentTarget.result.createObjectStore(osTableName, { keyPath: "recid" }); // key id ID

                    employeeStore.createIndex("lnameIndex", "lname", { unique: false });
                    employeeStore.createIndex("emailIndex", "email", { unique: true }); // email has to be unique (a constraint)
                    employeeStore.createIndex("sdateIndex", "sdate", { unique: false });
                }
                writeToConsoleScreen("Finished creating object-store - '" + osTableName); // onupgradeneeded called first
            };

            deleteDbRequest.onerror = function (e) {
                writeToConsoleScreen("Database error: " + e.target.errorCode);               
            };
        };
    }
    catch (e) {
        writeToConsoleScreen(e.message);
    }
}

function deleteDatabase() {
    try {
        writeToConsoleScreen('Started database delete');
        localDatabase.db.close();
        var deleteDbRequest = localDatabase.indexedDB.deleteDatabase(dbName);

        deleteDbRequest.onsuccess = function (event) {
            writeToConsoleScreen('Finished database delete');

        deleteDbRequest.onerror = function (e) {
                writeToConsoleScreen("Database error: " + e.target.errorCode);
            };
        };
    }
    catch (e) {
        writeToConsoleScreen(e.message);
    }
}

function addData(txn, store, records, i, commitT) {
    try {
        if (i < records.length) {
            var rec = records[i];
            var req = store.add(rec);
            req.onsuccess = function (ev) {               
                i++;
                addData(txn, store, records, i, commitT);
            }
            req.onerror = function (ev) {
                writeToConsoleScreen("Failed to add record." + "  Error: " + ev.message);
            }
        }
        else if (i == records.length) {
            // writeToConsoleScreen('Finished adding ' + records.length + " records");            
        }
    }
    catch (e) {
        writeToConsoleScreen(e.message);
    }
}

function add10kRecordsToDB() {
    try {

        if (localDatabase != null && localDatabase.db != null) {
            writeToConsoleScreen('Started adding 10,000 records');
            var transaction = localDatabase.db.transaction(osTableName, "readwrite");
            if (transaction) {
                transaction.oncomplete = function () {
                }
                transaction.onabort = function () {
                    writeToConsoleScreen("transaction aborted.");
                    localDatabase.db.close();
                }
                transaction.ontimeout = function () {
                    writeToConsoleScreen("transaction timeout.");
                    localDatabase.db.close();
                }
                var store = transaction.objectStore(osTableName);
                if (store) {
                    var req;
                    var customer = {};                   
                    for (var loop = 0; loop < 10000; loop++) {
                        customer = {};
                        customer.recid = loop + 1000; // past existing range of previous inserts
                        customer.fname = 'Susan';
                        customer.lname = 'Ottie';
                        customer.email = 'NewEmployee@' + loop + '.com';
                        customer.sdate = '4/3/2012';

                        req = store.add(customer);

                        req.onsuccess = function (ev) {
                        }
                        req.onerror = function (ev) {
                            writeToConsoleScreen("Failed to add record." + "  Error: " + ev.message);
                        }
                    }
                    writeToConsoleScreen("Finished adding 10,000 records");                   
                }               
            }
        }
    }
    catch (e) {
        writeToConsoleScreen(e.message);
    }
}

function countRecords()
{
    if (localDatabase != null && localDatabase.db != null) {
        writeToConsoleScreen("Starting count");
        var transaction = localDatabase.db.transaction(osTableName, "readwrite");
        if (transaction) {
            transaction.oncomplete = function () {
            }
            transaction.onabort = function () {
                writeToConsoleScreen("transaction aborted.");
                localDatabase.db.close();
            }
            transaction.ontimeout = function () {
                writeToConsoleScreen("transaction timeout.");
                localDatabase.db.close();
            }
            var store = transaction.objectStore(osTableName);
            if (store) {
                var keyRange = IDBKeyRange.lowerBound(0);
                var cursorRequest = store.openCursor(keyRange);
                var count = 0;

                cursorRequest.onsuccess = function (e) { // success called for each cursor action
                    var result = e.target.result;
                    result ? ++count && result.continue() : alert(count);                    
                };
            }
        }       
    }
    else
    {
        writeToConsoleScreen("Database needs to be created first");
    }
}

function populateDatabase() {
    var i = 0;

    try {
        if (localDatabase != null && localDatabase.db != null) {
            writeToConsoleScreen('Started adding records');

            var transaction = localDatabase.db.transaction(osTableName, "readwrite");
            if (transaction) {
                transaction.oncomplete = function () {
                    //localDatabase.db.close();
                }
                transaction.onabort = function () {
                    writeToConsoleScreen("transaction aborted.");
                    localDatabase.db.close();
                }
                transaction.ontimeout = function () {
                    writeToConsoleScreen("transaction timeout.");
                    localDatabase.db.close();
                }
                var store = transaction.objectStore(osTableName);
                if (store)
                    addData(transaction, store, employeeData, 0, true);
            }
            writeToConsoleScreen('Finished adding records');
        }
    }
    catch (e) {
        writeToConsoleScreen(e.message);
    }
}

function fetchAllEmployees() {
    try {       
        if (localDatabase != null && localDatabase.db != null) {            
            records = [];

            if (!localDatabase.db.objectStoreNames.contains(osTableName)) {
                writeToConsoleScreen("No employees table exists - click on Create");
                return;
            }

            writeToConsoleScreen('Started fetching all recrds');
            var store = localDatabase.db.transaction(osTableName).objectStore(osTableName);
            var request = store.openCursor();
            request.onsuccess = function (evt) {
                var cursor = evt.target.result;
                if (cursor) {
                    var employee = cursor.value;
                    records.push(employee);
                    cursor.continue();
                }
                else {
                    try {
                       writeToConsoleScreen('Finished fetching ' + records.length + ' recrds');
                        w2ui.grid.clear();
                        w2ui.grid.add(records); // bind to grid - auto refresh    
                       
                    } catch (ex) {
                        writeToConsoleScreen("Exception..." + ex);

                    }
                }
            };           
        }
    }
    catch (e) {        
        writeToConsoleScreen(e.message);
    }
}

function addEmployee() {
    try {
        var transaction = localDatabase.db.transaction(osTableName, "readwrite");
        var store = transaction.objectStore(osTableName);                    
	  
        if (localDatabase != null && localDatabase.db != null) {
            writeToConsoleScreen('Started adding recrd');
            var request = store.add({
                "recid": 1,
                "fname" : "Jane",
                "lname" : "Doh",
                "email" : "jane.doh@somedomain.com",
                "sdate" : Date.now(),
            });

            request.onsuccess = function (e) {                
                writeToConsoleScreen('Finished adding recrd');
            };			
            request.onerror = function(e) {                
                writeToConsoleScreen("Employee record was not added");               
            };
        }
    }
    catch(e){
        console.log(e);
    }
}

function updateEmployee() {
    try {     
        writeToConsoleScreen('Started record update');
        var transaction = localDatabase.db.transaction(osTableName, "readwrite");
        var store = transaction.objectStore(osTableName);                    
        var jsonStr;
        var employee;
	  	
        if (localDatabase != null && localDatabase.db != null) {			
            store.get(7).onsuccess = function(event) {
                employee = event.target.result;
                // save old value
                jsonStr = "Old: " + JSON.stringify(employee);
                writeToConsoleScreen(jsonStr);
               				
                // update record
                employee.email = "bert.oneill@kofax.com";
                jsonStr = "New: " + JSON.stringify(employee);              
                var request = store.put(employee);
					
                request.onsuccess = function (e) {
                    writeToConsoleScreen("Finished Updating employee - " + jsonStr);                 
                    w2ui.grid.clear();
                    records = [];
                    fetchAllEmployees();                    
                };
				
                request.onerror = function (e) {
                    writeToConsoleScreen("Error " + e.value);                    
                };				              
            }; 
        }
    }
    catch(e){
        console.log(e);
    }
}

function clearAllEmployees() {
    try {       
		
        if (localDatabase != null && localDatabase.db != null) {
            writeToConsoleScreen('Started clearing records');
            var store = localDatabase.db.transaction(osTableName, "readwrite").objectStore(osTableName);
		  
            store.clear().onsuccess = function (event) {
                writeToConsoleScreen('Finished clearing records');
                records = [];
                w2ui.grid.clear();              
            };
        }
    }
    catch(e){
        console.log(e);
    }
}

function deleteEmployee() {
    try {
        writeToConsoleScreen('Started deleting record # 7');
        var transaction = localDatabase.db.transaction(osTableName, "readwrite");
        var store = transaction.objectStore(osTableName);
        var jsonStr;
        var employee;

        if (localDatabase != null && localDatabase.db != null) {

            var request = store.delete(7);

            request.onsuccess = function (e) {
                writeToConsoleScreen('Finished deleting record # 7');
                fetchAllEmployees();
            };

            request.onerror = function (e) {
                writeToConsoleScreen(e);
            };                     
        }
    }
    catch (e) {
        console.log(e);
    }
}

function fetchEmployee() {
    try {
        writeToConsoleScreen('Started fetching record # 8');
        if (localDatabase != null && localDatabase.db != null) {
            var store = localDatabase.db.transaction(osTableName).objectStore(osTableName);
            store.get(8).onsuccess = function (event) {
                writeToConsoleScreen('Finished fetching record # 8');
                var employee = event.target.result;
                w2ui.grid.clear();
                w2ui.grid.add(employee);                            
            };
        }
    }
    catch(e){
        console.log(e);
    }
}

function fetchSurnameSilverEmployees() {
    try {    
        records = [];
        writeToConsoleScreen("Started fetching records with lastname 'Silver'");
        if (localDatabase != null && localDatabase.db != null) {
            var range = IDBKeyRange.only("Silver");
			 
            var store = localDatabase.db.transaction(osTableName).objectStore(osTableName);
            var index = store.index("lnameIndex");
			
            index.openCursor(range).onsuccess = function(evt) {  
                var cursor = evt.target.result;    
                if (cursor) {
                    var employee = cursor.value;
                    var jsonStr = JSON.stringify(employee);
                    records.push(employee);
                    writeToConsoleScreen(jsonStr);
                    cursor.continue();  
                }
                else
                {
                    writeToConsoleScreen("Finished fetching records with lastname 'Silver' - found " + records.length);
                    w2ui.grid.clear();
                    w2ui.grid.add(records); // bind to grid - auto refresh                                             
                }
            };
        }
    }
    catch(e){
        writeToConsoleScreen(e.message);
    }
}

function addDuplicateEmailEmployeeEmail() {
    try {
        writeToConsoleScreen("Started adding duplicate record - expect error message");
        var transaction = localDatabase.db.transaction(osTableName, "readwrite");
        var store = transaction.objectStore(osTableName);

        if (localDatabase != null && localDatabase.db != null) {

            var request = store.add({
                "recid": 0,
                "fname": "Jane",
                "lname": "Doh",
                "email": "jane.doh@somedomain.com",
                "sdate": Date.now(),
            });

            request.onsuccess = function (e) {
                writeToConsoleScreen("Employee record was added successfully.");
            };

            request.onerror = function (e) {
                writeToConsoleScreen("Error adding record - " + e.value);
            };
        }
    }
    catch (e) {
        console.log(e);
    }
}

function fetchMultiFilterByEmailAndSurname() {
    try {
        records = [];
        writeToConsoleScreen("Started fetching records by multiple filters");
        if (localDatabase != null && localDatabase.db != null) {
            var range = IDBKeyRange.only("Silver");

            var store = localDatabase.db.transaction(osTableName).objectStore(osTableName);
            var index = store.index("lnameIndex");

            index.openCursor(range).onsuccess = function (evt) {
                var cursor = evt.target.result;
                if (cursor) {                  
                    var employee = cursor.value;
                    if (employee.email.indexOf('1') > 0) { // filter by another field in json object (could of used the extra indexes)
                        var jsonStr = JSON.stringify(employee);
                        records.push(employee);
                        writeToConsoleScreen(jsonStr);
                    }
                    cursor.continue();
                }
                else {
                    writeToConsoleScreen("Finished adding records by multiple filters - found "  + records.length);
                    w2ui.grid.clear();
                    w2ui.grid.add(records); // bind to grid - auto refresh                                              
                }
            };
        }
    }
    catch (e) {
        writeToConsoleScreen(e.message);
    }
}

function createGuid() {   
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return guid;
}

function filterMultipleIndexFields() {
    try {
        records = [];
        writeToConsoleScreen("Started fetching records by multiple indexes");
        if (localDatabase != null && localDatabase.db != null) {

            var store = localDatabase.db.transaction(osTableName).objectStore(osTableName);

            indexLName = store.index('lnameIndex');
            indexDate = store.index('emailIndex');
            var x_species = indexLName.get(IDBKeyRange.only('Silver'))
            var y_species = indexDate.get(IDBKeyRange.only('4/3/2012'))
            var species = x_species.intersect(y_species); // this is result           
          
            species.openCursor(range).onsuccess = function (evt) {
                var cursor = evt.target.result;
                if (cursor) {
                    var employee = cursor.value;                   
                        records.push(employee);                   
                    cursor.continue();
                }
                else {
                    writeToConsoleScreen("Finished adding records by multiple indexes - found " + records.length);
                    w2ui.grid.clear();
                    w2ui.grid.add(records); // bind to grid - auto refresh                                              
                }
            };
        }
    }
    catch (e) {
        writeToConsoleScreen(e.message);
    }
}


