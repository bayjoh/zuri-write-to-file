const fs = require('fs');
const http = require('http');
  
http.get("http://jsonplaceholder.typicode.com/posts", (res) => {

    //fs.access checks if directory exists
    fs.access("./result", function(error) {
        if (error) {
            console.log("Directory does not exist.")
        }
        else {
            // initialize the container for our data
            var data = "";

            // this event fires many times, each time collecting another piece of the response
            res.on("data", function (chunk) {
                // append this chunk to our growing `data` var
                data += chunk;
            });
        
            // this event fires *one* time, after all the `data` events/chunks have been gathered
            res.on("end", () => {
                
                //Writes the result into posts.txt file
                fs.writeFile("./result/posts.txt", data, (err) => {
                    if(err)
                        throw err;
        
                    console.log("Post File created successfully");
                })
            });
        }

    });  
})
//display error message if error exists
.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});;

console.log("Server created successfully");