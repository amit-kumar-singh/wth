function searchSkills(skill){
    
    $.trace.fatal("In my method");
    var conn, stmt, rs;
    conn = null;
    stmt = null;
    rs = null;
    //var skillSearch = JSON.parse(request.getParameter("skill"));     
    // var successresult = {
    //     "id":null
    // };
    var people=[];
    try {
        conn = $.db.getConnection("wth.logic::dbuser");
        var testidsquery = 'SELECT score() AS score,Ino,ExpertName FROM "WTH"."SHERLOCK" WHERE contains(Skills, ?, fuzzy(0.8, ?)) ';
        testidsquery.setString(1,skill);
        // textsearch=compare
        testidsquery.setString(2,"textsearch=compare");
        stmt = conn.prepareStatement(testidsquery);
        rs = stmt.executeQuery();
        while (rs.next()) {
                people.push({
                    "Id" :  rs.getString(1),
                    "Name" :rs.getString(2)                
                    });
        }
    }catch (e) {
        $.trace.fatal('result calculation error :: ' + e.message);
      return people;
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
      return people;
    
}
try {
    var method = $.request.method;
    if (method === $.net.http.POST) {
        $.response.status = 200;
        $.response.contentType = "application/json";
        // $.response.setBody(JSON.stringify(getQuestions()));
      //  $.response.setBody(JSON.stringify(createtest($.request.body.asString())));
    } 
    else
     if (method === $.net.http.GET){
        $.response.status = 200;
        $.response.contentType = "application/json";
        var x = $.request.parameters.get('skill');
        $.response.setBody(JSON.stringify(searchSkills(x)));
        //$.response.setBody(JSON.stringify({"description": "","category": "","processtype": "","urgency": "","eqno": "","system": "","building": "","room": "","comment": "","username": "","userid": ""}));
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