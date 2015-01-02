var scoreDiv = document.getElementById("scorediv");
var updatedDiv = document.getElementById("updatedDiv");
var arrayToSort = new Array();

for (var user in homework) {
    var userArray = new Array();
    userArray.push(user);
    var scores = homework[user];
    for (var sc in scores) {
        userArray.push(scores[sc]);
    }
    arrayToSort.push(userArray);
}

var sortIndex = 2;
var ascending = 1;
arrayToSort.sort(function(a,b){
   var scoreA = a[sortIndex];
   var scoreB = b[sortIndex];
   if(scoreA == -1) {
     if (ascending == 1) {
       scoreA = 9999;
     } else {
       scoreA = -9999;
     }
   }
   if(scoreB == -1){
     if (ascending == 1) {
       scoreB = 9999;
     } else {
       scoreB = -9999;
     }
   }
   if(ascending == 0){
      return scoreB-scoreA;
   }
   else {
      return scoreA-scoreB;
   }
});
    
updatedDiv.innerHTML = "last updated at " + lastUpdated;

var currentRank = 1;
for (var userIndex = 0; userIndex < arrayToSort.length; userIndex++) {
    var userArray = arrayToSort[userIndex];
    var user = userArray[0];
    var state = "";
    var trEl = document.createElement("tr");
    scoreDiv.appendChild(trEl);
    var rank = "";
    if (user == "oracle" || user == "baseline" || user == "default"){
       user = "<b>" + user + "</b>"
    }
    else { 
       rank = currentRank;
       currentRank = currentRank+1;
    }
    var rankTd = document.createElement('td');
    rankTd.innerHTML = rank;
    trEl.appendChild(rankTd)
    
    var stateTd = document.createElement('td');
    stateTd.innerHTML = state;
    trEl.appendChild(stateTd)

    var userTd = document.createElement('td');
    userTd.innerHTML = user;
    trEl.appendChild(userTd)

    for (var hwindex = 1; hwindex < userArray.length; hwindex++){
       var scTd = document.createElement('td');
       var sc = userArray[hwindex];
       if( sc != -1){
       scTd.innerHTML = sc;
       }
       trEl.appendChild(scTd)
    }
}

