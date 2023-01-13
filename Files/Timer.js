function showTime() {
   const date = new Date();
   return (
      date.getHours() +
      "Hrs: " +
      date.getMinutes() +
      "Mins: " +
      date.getSeconds() +
      "Sec: "
   );
}

function showSessionExpires() {
   console.log("Activity B- Your session Expired at", showTime());
}

console.log("Activity-A: triggering Activity-B", showTime());
setTimeout(showSessionExpires, 5000);
console.log(
   "Activity A: Triggered Activity B: at",
   showTime(),
   "will execute after 5 seconds"
);
