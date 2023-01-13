let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
   const date = new Date();
   return (
      date.getHours() +
      " Hrs: " +
      date.getMinutes() +
      " Mins: " +
      date.getSeconds() +
      " Secs "
   );
}

function makePromiseCall(methodType, url, async = true, data = null) {
   return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
         // console.log(methodType+" State Changed Called at: "+showTime() + "RS: " +
         //      xhr.readyState+" Status: " +xhr.status);
         if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
               resolve(xhr.responseText);
            } else if (xhr.status >= 400) {
               reject({
                  status: xhr.status,
                  statusText: xhr.statusText,
               });
               console.log("XHR FAILED");
               console.log(
                  "Handle 400 client error or 500 server error at: " +
                     showTime()
               );
            }
         }
      };
      xhr.open(methodType, url, async);
      if (data) {
         //    console.log(JSON.stringify(data));
         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.send(JSON.stringify(data));
      } else xhr.send();
      console.log(methodType + " request sent to the server at: " + showTime());
   });
}

const getURL = "http://localhost:3000/employee/2";
makePromiseCall("GET", getURL, true)
   .then((responseText) => {
      console.log("Get User Data: " + responseText);
   })
   .catch((error) => console.log("Get Error Status: " + JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employee/4";
makePromiseCall("DELETE", deleteURL, false)
   .then((responseText) => {
      console.log("User Deleted: " + responseText);
   })
   .catch((error) =>
      console.log("Delete Error Status: " + JSON.stringify(error))
   );

const postURL = "http://localhost:3000/employee";
const emplData = { name: "Adesh", salary: "40000" };
makePromiseCall("POST", postURL, true, emplData)
   .then((responseText) => {
      console.log("User Added: " + responseText);
   })
   .catch((error) =>
      console.log("Post Error Status: " + JSON.stringify(error))
   );
