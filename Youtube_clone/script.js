
/*

https://youtube.googleapis.com/youtube/v3/search?
part=snippet&maxResults=2&q=chickencurry&
key=AIzaSyBbKsliUTg6o7DSXNOz1l5Ks-5En9B5PS0

*/
// console.log("kabir");
let searchInput = document.getElementById("search-input");

let apiKey = `AIzaSyBbKsliUTg6o7DSXNOz1l5Ks-5En9B5PS0`;

localStorage.setItem("api_key",apiKey);


function searchVideos(){
    let searchValue = searchInput.value;
    fetchvideos(searchValue);
    // alert("i am good");
}

async function fetchvideos(searchValue){

    let endpoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${searchValue}&key=${apiKey}`;

    try{
        let response = await fetch(endpoint);

        let result = await response.json();

        

        for(let i=0; i < result.items.length; i++){
            let video = result.items[i];
            let videoStats = await fetchStats(video.id.videoId);
            if(videoStats.items.length > 0){
                result.items[i].videoStats = videoStats.items[0].statistics;
                result.items[i].duration = videoStats.items[0].contentDetails.duration;
            }
        }
        // console.log(result);
        console.log(result.items)
        showThumbnails(result.items)
    }
    catch(error){
        alert("Something went wrong", error);
        // console.log(error);
    }
}

let container = document.getElementById("container");

function showThumbnails(items){
    for(let i=0; i<items.length;i++){
        let videoItem = items[i];
        // console.log(videoItem)
        let imageUrl = videoItem.snippet.thumbnails.high.url;

        let videoElement = document.createElement("div");

        videoElement.addEventListener("click", ()=>{
            navigateToVideo(videoItem.id.videoId)
        })

        const videoChildren = `
                            <img src="${imageUrl}">
                            <b>${videoItem.duration}</b>
                            <p class="title">${videoItem.snippet.title}</p>
                            <P class="channel-name">${videoItem.snippet.channelTitle}</P>
                            <p class="view-count">${videoItem.videoStats ? getViews(videoItem.videoStats.viewCount)+" Views": "NA"}</p>
                            `;

        videoElement.innerHTML = videoChildren;
        container.append(videoElement);
        

    }
}

function getViews(n){
        if(n < 1000) return n;
        else if(n >= 1000 && n <= 999999) {
            n /= 1000;
            n = parseInt(n)
            return n+"K";
        }
        return parseInt(n/1000000)+"M"
}

async function fetchStats(videoId){
    
    const endpoint = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=statistics,contentDetails&id=${videoId}`;

    let response = await fetch(endpoint);
    let result = await response.json();
    return result;
}

// navigation to other paga
function navigateToVideo(videoId){
    let path = `/Youtube_clone/video.html`;
    if(videoId){
        document.cookie = `video_id = ${videoId}; path=${path}`
        let linkItem = document.createElement("a");
//         linkItem.href = "http://127.0.0.1:5500/Youtube_clone/video.html"
        linkItem.href = "https://dikesh01.github.io/List-details/Youtube_clone/video.html"
        
        
        linkItem.target = "_blank";
        linkItem.click();
    }
    else{
        alert("Please refer youtube to watch this video");
    }
}




