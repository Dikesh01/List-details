
let ipAdd;
$.getJSON("https://api.ipify.org?format=json",function(data){
    // Give data value to p(html) element for #ipAddress
    $("#ipAddress").html(data.ip);
     ipAdd = data.ip;
})

const getDataButton = document.getElementById("getDataBtn");
const secondView = document.getElementsByClassName('second_view')[0];
const mapContainer = document.getElementById('map_container');
const filterSearch = document.getElementById('search');


getDataButton.addEventListener('click', function(){
    getDataButton.style.display='none';
    secondView.style.display='block';

    // getting ip from the ipAdd
    const token = '22e085fee39e4d';
    return fetch(`https://ipinfo.io/${ipAdd}/?token=${token}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);

        let lat = data.loc.split(",")[0];
        let long = data.loc.split(",")[1];

        let Cdate = getDate();
        let Ctime = getTime();

        showMap(lat, long);

        // provide values to html elements
        document.getElementById('lat').innerText= lat;
        document.getElementById('long').innerText= long;
        document.getElementById('city').innerText= data.city;
        document.getElementById('region').innerText= data.region;
        document.getElementById('organisation').innerText= data.org;
        document.getElementById('hostname').innerText= location.hostname;
        document.getElementById('timeZone').innerText= data.timezone;
        document.getElementById('D&T').innerText= `${Cdate}, ${Ctime}`;
        document.getElementById('pincode').innerText= data.postal;
         

        // proceeding to fetch pincode api----
        getPostOffice(data.postal);
    })
    .catch((error) =>{
        console.log('something wrong: ', error)
    })
});

// Addrressign Grign contaier
const gridContainer = document.getElementsByClassName('grid_container')[0];

let postOffice;
function getPostOffice(pincode){
    return fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        document.getElementById('message').innerText= `${data[0].Message}`;
        // Mapping through all post Office
        postOffice = data[0].PostOffice;

        postOffice.forEach((elem) =>{
            let pinDetail = document.createElement('div');
            pinDetail.className = 'pinDetails';
            pinDetail.innerHTML = `
                    <div><span class="boltSpan">Name : </span> ${elem.Name}</div>
                    <div><span class="boltSpan">Branch Type : </span> ${elem.BranchType}</div>
                    <div><span class="boltSpan">Delivery Status : </span> ${elem.DeliveryStatus}</div>
                    <div><span class="boltSpan">District : </span> ${elem.District}</div>
                    <div><span class="boltSpan">Division : </span> ${elem.Division}</div>
                    
            `
            gridContainer.append(pinDetail);
        })

    })
    .catch(err=>{
        console.log('Unable to fetch due to : ', err);
    })
}

function showMap(lat, long){
    mapContainer.innerHTML = ` <iframe src="https://maps.google.com/maps?q=${lat}, ${long}&output=embed" 
    width="1300" 
    height="600" 
    frameborder="0" 
    style="border:0"
></iframe>`;
}

function getDate(){
    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth()+1;
    let year = now.getFullYear();

    let currtDate = `${date}/${month}/${year}`
    return currtDate;
}

function getTime(){
    let curr = new Date();

    let hr = addZero(curr.getHours());
    let min = addZero(curr.getMinutes());
    let sec = addZero(curr.getSeconds());

    if(hr >= 12){
        
        return `${hr-12}:${min}:${sec} PM`
    }
    else{
        return `${hr}:${min}:${sec} AM`
    }
   
}
function addZero(num){
    return num < 10? `0${num}` : num;
  }
