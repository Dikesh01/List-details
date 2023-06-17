
    const onSubmit = document.getElementById('add-btn');
    const newAddition = document.getElementsByClassName('newAddition')[0];

    let arr =[];
    let idCount = 0;
    onSubmit.addEventListener('click',(event) =>{
        event.preventDefault();

   const nameVlaue = (document.getElementsByTagName('input')[0].value).trim();
   const professionVlaue = (document.getElementsByTagName('input')[1].value).trim();
   const ageVlaue = (document.getElementsByTagName('input')[2].value).trim();
    
    if(nameVlaue != "" && professionVlaue != "" && ageVlaue != ""){
        document.getElementById('error').style.display = 'none';
        document.getElementById('zeroEmployee').style.display = 'none';
        document.getElementById('success').style.display = 'block';
        arr = [];
        arr.push({id:idCount,name:nameVlaue,profession:professionVlaue,age:ageVlaue});
        idCount++;
        console.log(idCount);
        // console.log(arr);
        arr.map((value) =>{
            const container = document.createElement('div');
            container.className = "newContainer";
            container.innerHTML =`
                <div class="addedEmployees">
                    <div class="serialNo">${idCount}.</div>
                    <div class="addName">Name : ${value.name}</div>
                    <div class="addProfession">Profession: ${value.profession}</div>
                    <div class="addAge">Age:${value.age}</div>
                </div>
                <div>
                    <button id="dlt">Delete User</button>
                </div>
            `
            newAddition.append(container);
    
            const deleteUser = document.getElementById('dlt');
            deleteUser.addEventListener('click',(event) =>{
                event.preventDefault();
                const container = document.createElement('div');
                container.className = "newContainer";
                container.innerHTML =`
                    <div class="addedEmployees">
                        <div class="serialNo">""</div>
                        <div class="addName">Name : ""</div>
                        <div class="addProfession">Profession: ""</div>
                        <div class="addAge">Age:""</div>
                    </div>
                    <div>
                        <button id="dlt">Delete User</button>
                    </div>
                `
                
            });

        })
        
    }
    else{
        document.getElementById('error').style.display = 'block';
    }
});
