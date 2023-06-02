
let cookieString = document.cookie;
let videoId = cookieString.split("=")[1];
// console.log(videoId);
const apiKey = localStorage.getItem("api_key");
// console.log(apiKey);

let firstScript = document.getElementsByTagName("script")[0];

firstScript.addEventListener("load", onLoadScript)

function onLoadScript(){
    if(YT){
        new YT.Player("playVideo", {
            width:"850",
            height:"500",
            videoId,
            // events: {
            //     onReady: ()=>{
            //         console.log("video loaded");
            //     }
            // }
            // -------------------
            events:{
                onReady:(event) =>{
                    // console.log(event.target.videoTitle)
                    // document.title is ans inbuilt function line document.create-------->
                    document.title = event.target.videoTitle;
                    extractVideoDetails(videoId);
                    fetchStats(videoId);
                }
            }

        });
              
    }
}

const statsContainer = document.getElementsByClassName("video-details")[0];

async function extractVideoDetails(videoId){
    
    let endpoint = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}`;

    try{
        let response = await fetch(endpoint);
        let result = await response.json();
        // return result;
        // console.log(result);
        rendercomments(result.items);
    }
    catch(error){
        console.log(`something wrong`,error);
    }
}


async function fetchStats(videoId){

    let endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${apiKey}&id=${videoId}`;

    try{
        let response = await fetch(endpoint);
        let result = await response.json();
        // console.log(result, "stats");

        const item = result.items[0];
        const title = document.getElementById("title")
        title.innerText = item.snippet.title;
        title.style.color="white";
        title.style.fontSize = "20px";
        // titile, desctiption, statistics
        statsContainer.innerHTML =`
        
        <div class="profile">
            <img src="./img_1.jpg" class="channel-logo"alt="">
            <div class="owner-details">
                <span style="color:white;">${item.snippet.channelTitle}</span>
                <span>20 Subscribers</span>
            </div>
        </div>
        <div class="stats">
            <div class="like-container">
                <div class="like">
                    <span class="material-icons">thumb_up</span>
                    <span>${item.statistics.likeCount}</span>
                </div>
                <div class="like">
                    <span class="material-icons">thumb_down</span>
                </div>
            </div>
            <div class="comment-container">
                <span class="material-icons">comment</span>
                <span>${item.statistics.commentCount}</span>
            </div>
        </div>
        `
    }
    catch(error){
        console.log("error",error);
    }

}

function rendercomments(commentList){
    const commentContainer = document.getElementById("comments-container")

    for(let i=0; i<commentList.length; i++){

        let comment = commentList[i];
        const topLevelComment = comment.snippet.topLevelComment;

        let commentElement = document.createElement("div");
        commentElement.className = "comment"
        commentElement.innerHTML = `
        <img src="${topLevelComment.snippet.authorProfileImageUrl}" alt="">
        <div class="comment-right-half">
            <b>${topLevelComment.snippet.authorDisplayName}</b>
            <p>${topLevelComment.snippet.textOriginal}</p>
            <div style="display: flex;gap:20px; align-items:center;">
                <div class="like">
                    <span class="material-icons">thumb_up</span>
                    <span>${topLevelComment.snippet.likeCount}</span>
                </div>
                <div>
                    <span class="material-icons">thumb_down</span>
                </div>
                <button class="reply">
                    ${comment.snippet.totalReplyCount+" "}Replies
                </button>
            </div>
        </div>
        `
        commentContainer.append(commentElement);
    }
}