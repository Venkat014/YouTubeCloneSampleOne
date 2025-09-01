let navBarMenuIcon = document.getElementById('navMenuIcon');
// let sideNavBar = document.querySelectorAll('side-nav-container');
let sideNavBar = document.getElementById('sideNavBar');
navBarMenuIcon.onclick = function() {
    sideNavBar.classList.toggle('small-side-nav')
}



// api key --------- AIzaSyAwikLuVW-581MWxsK4HzGcJrPj6Dqyyx0
let result = document.getElementById('result');
// console.log(result);

const API_KEY = 'AIzaSyAwikLuVW-581MWxsK4HzGcJrPj6Dqyyx0';
//let VIDEO_ID = "ggJg6CcKtZE";
const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=20&key=${API_KEY}`;
//const GET_VID_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${VIDEO_ID}&key=${API_KEY}`;
const mostPopularVideos = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const itemsList = data.items;
        let allVideosMap = itemsList.map((item) => item.id);
        let newArr = JSON.stringify([...allVideosMap]);
        // console.log(allVideosMap);
        localStorage.setItem("YouTubeVidIds", newArr);
    } catch (error) {
        console.log(error);
    }
}
//localStorage.setItem("YouTubeVidIds", mostPopularVideos());
let ids = JSON.parse(localStorage.getItem("YouTubeVidIds"));
console.log(ids);
// let arr = ids.split(",");
// console.log(arr)
//mostPopularVideos();
//let vid_ids = mostPopularVideos();
//console.log(vid_ids);

for (let item of ids) {
    //fetchFunction(item); //.then(data => console.log(data))
    //d.then(data => console.log(data))
    // console.log(item);
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${item}&key=${API_KEY}`)
        .then(response => response.json())
        .then(jsonData => createThumbnails(jsonData))
        .catch(err => console.log(err));
}

function createThumbnails(data) {
    let {
        channelId,
        channelTitle,
        title
    } = data.items[0].snippet;
    
    let imgUrl = data.items[0].snippet.thumbnails.medium.url;
    let image = document.createElement('img');
    image.src = imgUrl;
    image.classList.add('card', 'thumbile');
    result.appendChild(image);
} 