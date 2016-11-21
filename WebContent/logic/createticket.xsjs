
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
    var testid;
    try {
        conn = $.db.getConnection("wth.logic::dbuser");
        var testidsquery = 'SELECT COUNT(*) as testid from "WTH"."TICKETS"';
        stmt = conn.prepareStatement(testidsquery);
        rs = stmt.executeQuery();
       while (rs.next()) {
            testid = rs.getString(1);
        }
        
        
        testid =  "765894532" + parseInt(testid) ;
        
        var inserttoresult='INSERT INTO "WTH"."TICKETS" VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
        stmt = conn.prepareStatement(inserttoresult);
        stmt.setString(1,testid);  
        stmt.setString(2,answers.description);
        stmt.setString(3,answers.category);
        stmt.setString(4,answers.processtype);
        stmt.setString(5,answers.urgency);
        stmt.setString(6,answers.eqno);
        stmt.setString(7,answers.system);
        stmt.setString(8,answers.building);
        stmt.setString(9,answers.room);
        stmt.setString(10,answers.comment);
        stmt.setString(11,answers.username);
         stmt.setString(12,answers.userid);
        
        
        rs = stmt.executeQuery();
        
         /*while (rs.next()) {
            testid = testid.trim();
        }*/
       
        conn.commit();  
            successresult.testid = testid;
            
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

try {
    var method = $.request.method;
    if (method === $.net.http.POST) {
        $.response.status = 200;
        $.response.contentType = "application/json";
        // $.response.setBody(JSON.stringify(getQuestions()));
        $.response.setBody(JSON.stringify(createtest($.request.body.asString())));
    } 
    else
     if (method === $.net.http.GET){
        $.response.status = 200;
        $.response.contentType = "application/json";
        $.response.setBody(JSON.stringify({"description": "","category": "","processtype": "","urgency": "","eqno": "","system": "","building": "","room": "","comment": "","username": "","userid": ""}));
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
