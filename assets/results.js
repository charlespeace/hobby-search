var dropdownbtn = document.getElementById('dropdownBtn');
var dropdownEl = document.getElementById('dropdown')

dropdownbtn.addEventListener('click', function() {
  dropdownEl.classList.toggle('active');
})

var getHobby = function() {
  var queryString = document.location.search;
    var hobby = queryString.split("=")[1];
    if (hobby) {
        getYoutubeResults(hobby);
        getRedditResults(hobby);
        getWikiResults(hobby);
    } else {
        document.location.replace("./index.html");
    }
}

// YOUTUBE SECTION
  // get API
var getYoutubeResults = function(hobby) {
  var apiUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + hobby + "-tutorial" + "&type=video&maxResults=30&key=AIzaSyCIdf8UZgAIhrjvw1jNT-u3Wk9bAAOqdxU"
  
  fetch(apiUrl)
  .then(function(response) {
    response.json().then(function(data) {
      console.log("youtube");
      console.log(data);
      displayYTresults(data);
      saveHobbyYT(hobby, data);
    })
  });
};

// variables for displayYTresults
var ytContainer = document.querySelector(".yt-container");

var ytCard = [];
var ytTitle = [];
var ytImg = [];
var ytData = [];

// displays YT videos on site
var displayYTresults = function(data){
  for(var i = 0; i <= 5 /*data.items.length*/; i++){
    ytCard[i] = document.createElement("a");
      ytCard[i].classList = "yt-card col s2 card";
        var newImage = data.items[i].snippet.thumbnails.medium.url;
        ytCard[i].style.backgroundImage = "url(" + newImage + ")";

    ytTitle[i] = document.createElement("p");
      ytTitle[i].textContent = data.items[i].snippet.title;
      ytTitle[i].classList.add("crdtitle");

      ytCard[i].href ="https://www.youtube.com/watch?v=" + data.items[i].id.videoId;
      ytCard[i].setAttribute("target", "_blank");
      
      ytCard[i].addEventListener("click", function(){
    })
      
      ytContainer.appendChild(ytCard[i]);
      ytCard[i].appendChild(ytTitle[i]);
  }

};


// REDDIT
  // get Reddit API
var getRedditResults = function(hobby) {
  var apiUrl = "https://www.reddit.com/search.json?q=" + hobby /* to just look for communities + "&type=sr" */;

  fetch(apiUrl)
    .then(function(response) {
      response.json().then(function(data) {
        console.log("reddit");
        console.log(data);
        // saveHobbyRed(hobby, data);
      })
    })
};


// WIKIPEDIA
  // get Wiki API
var getWikiResults = function(hobby) {
  var url = "https://en.wikipedia.org/w/api.php"; 
  
  var params = {
      action: "query",
      list: "search",
      srsearch: hobby,
      srlimit: "10",
      format: "json"
  };
  
  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
  
  fetch(url)
      .then(function(response) {
        response.json().then(function(data) {
          console.log("wiki");
          console.log(data);
          // saveHobbyWiki(hobby, data);
        })
      })
}
 
// var myArray = new Array();
// myArray[0] = "first-hobby";
// myArray[1] = "second-hobby";
// myArray[2] = "third-hobby";
// myArray[3] = "fourth-hobby";
// for (var i=0; i<myArray.length; i++) {
//   document.write("Element " +i+ " contains: " +myArray[i]+ "<br />");
// }

var firstHobby = document.querySelector("#first-hobby");
var secondHobby = document.querySelector("#second-hobby");
var thirdHobby = document.querySelector("#third-hobby");
var fourthHobby = document.querySelector("#fourth-hobby");

// save to local storage
var saveHobbyYT = function(hobby, data){
  var hobbyName = hobby;
  var hobbyData = data;

  localStorage.setItem(hobbyName, JSON.stringify(hobbyData));
  JSON.parse(localStorage.getItem(hobbyName));



  if(!firstHobby.textContent){
    firstHobby.textContent = hobbyName;
    firstHobby.addEventListener("click", getHobby);
  }
  else if(!secondHobby.textContent){
    secondHobby.textContent = hobbyName;
    secondHobby.addEventListener("click", getHobby);
  }
  else if(!thirdHobby.textContent){
    thirdHobby.textContent = hobbyName;
    thirdHobby.addEventListener("click", getHobby);
  }
  else if(!fourthHobby.textContent){
    fourthHobby.textContent = hobbyName;
    fourthHobby.addEventListener("click", getHobby);
    
  }

  
};


getHobby();