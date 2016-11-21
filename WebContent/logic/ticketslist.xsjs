
function getTests() { 
    $.trace.fatal("In my method");
    var conn, stmt, rs;
    conn = null;
    stmt = null;
    rs = null;
    var tests = []; 
    //var notests={"error":"No Tests available"};
    var flag = false;
    try {
        conn = $.db.getConnection("wth.logic::dbuser");
        var sql = 'SELECT TOP 1000 "ID", "DESCRIPTION", "CATEGORY", "PROCESSTYPE", "URGENCY", "EQNO", "SYSTEM", "BUILDING", "ROOM", "COMMENT", "USERNAME", "USERID" FROM "WTH"."TICKETS" ORDER BY ID DESC';// WHERE QUESIONID=33';
        stmt = conn.prepareStatement(sql);
        rs = stmt.executeQuery();
        
        while (rs.next()) {
            
            tests.push({ 
            "id":rs.getString(1),
           "description":rs.getString(2),
           "category":rs.getString(3),
           "processtype":rs.getString(4),
           "urgency":rs.getString(5),
           "eqno":rs.getString(6),
           "system":rs.getString(7),
           "building":rs.getString(8),
           "room":rs.getString(9),
           "comment":rs.getString(10),
           "username":rs.getString(11),
           "userid":rs.getString(12)
    });
             flag = true;
             
        }
      // return user;
    } catch (e) {
        $.trace.fatal('validate user : Error while fetching user details :: ' + e.message);
        return e.message;
       
    } finally {
        if (rs) {
            rs.close();
        }
        if (stmt) {
            stmt.close();
        }
        if (conn) {
            conn.close();
        }
    }
   if(flag === false){
   return tests;
   }
   
   return tests;
}

try {
    var method = $.request.method;
    if (method === $.net.http.POST) {
        $.response.status = 200;
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify(getTests()));
       // $.response.setBody(JSON.stringify(validateuser($.request.body.asString())));
    } 
    else
     if (method === $.net.http.GET){
        $.response.status = 200;
        $.response.contentType = "application/json";
         $.response.setBody(JSON.stringify(getTests()));
        // $.response.setBody(JSON.stringify({"userid": "","password": ""}));
     }
    else {
        $.trace.fatal("In POSt method");
        $.trace.fatal(' post response 500');
        $.response.status = 500;
        $.response.contentType = "application/json";
    }
} catch (e) {
    $.trace.fatal("In CATCH method");
    $.response.status = 500;
    $.response.contentType = "application/json";
    $.response.setBody(JSON.stringify({
        status: "error",
        "message": e.toString()
    }));

}
