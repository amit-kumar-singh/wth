
function createtest(requestbody) { 
    $.trace.fatal("In my method");
    var conn, stmt, rs;
    conn = null;
    stmt = null;
    rs = null;
    var answers = JSON.parse(requestbody); 
    var successresult = {
        "id":null
    };
    var notest = {"message":"Unable to save new test."};
    //var testid;
    try {
        conn = $.db.getConnection("wth.logic::dbuser");

        var inserttoresult='INSERT INTO "WTH"."Queries" VALUES(?,?,?,?,?)';
        stmt = conn.prepareStatement(inserttoresult);
       
        stmt.setInteger(1,answers.id);
        stmt.setString(2,answers.User);
        stmt.setString(3,answers.Createdon);
        stmt.setString(4,answers.Question);
        stmt.setString(5,answers.Status);
        
        rs = stmt.executeQuery();
        
         /*while (rs.next()) {
            testid = testid.trim();
        }*/
       
        conn.commit();  
         //  successresult.is = answers.id;
            
    } catch (e) {
        $.trace.fatal('result calculation error :: ' + e.message);
      return successresult;
   // return e.message;
       
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
      return successresult;
}



function getTests() { 
    $.trace.fatal("In my method");
    var conn, stmt, rs;
    conn = null;
    stmt = null;
    rs = null;
    var tests = []; 
    //var notests={"error":"No Tests available"};
    try {
        conn = $.db.getConnection("wth.logic::dbuser");
        var sql = 'SELECT ID,User,CreatedOn,Question,Status FROM "WTH"."Queries"';// WHERE QUESIONID=33';
        stmt = conn.prepareStatement(sql);
        rs = stmt.executeQuery();
        
        while (rs.next()) {
            
            tests.push({ 
            "id":rs.getInteger(1),
           "User":rs.getString(2),
           "Createdon":rs.getString(3),
           "Question":rs.getString(4),
           "Status":rs.getString(5)
    });
             
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
   
   return tests;
}

try {
    var method = $.request.method;
    if (method === $.net.http.POST) {
        $.response.status = 200;
        $.response.contentType = "application/json";
       $.response.setBody(JSON.stringify(createtest($.request.body.asString())));
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
