
// Restaurant structure flow
document.getElementById('menuList').addEventListener('click', getMenu);
const container = document.getElementById("container")

function getMenu() {
    if(document.body.classList.contains('menu')){
        const ele = document.getElementsByClassName("menu");
        ele.remove();
    }else{
        fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
        .then(response => response.json())
        .then(data => {

            console.log(data);
            // return data;
             for(let i = 0; i < data.length; i++){
            let item = data[i];
            let itemContainer = document.createElement("div");
            itemContainer.className = "item-container";
            itemContainer.innerHTML = `
            <div><img src="${item.imgSrc}" alt=""></div>
            <div class="detail-div">
                <div>
                    <span class="id">${item.id}</span>
                    <span class="name">${item.name}</span>
                </div>
                <div class="price">$${item.price}</div>
    
            </div>
            `
            container.append(itemContainer);
            }
        })
        .catch(error => {
            console.log('Error fetching menu:', error);
        });
    }
    
  }
  
  // Function to take the order
  function takeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const order = {
          burgers: ['Burger 1', 'Burger 2', 'Burger 3']
        };
        resolve(order);
      }, 2500);
    });
  }
  
  // Function for order preparation
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = {
          order_status: true,
          paid: false
        };
        resolve(orderStatus);
      }, 1500);
    });
  }
  
  // Function for payment
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const orderStatus = {
          order_status: true,
          paid: true
        };
        resolve(orderStatus);
      }, 1000);
    });
  }
  
  // Function to display the thank you message
  function thankYou() {
    alert('Thank you for eating with us today!');
  }
  
  // Event listeners for the buttons
  
  document.getElementById('orderdList').addEventListener('click', () => {
    takeOrder()
      .then(order => {
        console.log('Order:', order);
        return orderPrep();
      })
      .then(orderStatus => {
        console.log('Order status:', orderStatus);
        return payOrder();
      })
      .then(orderStatus => {
        console.log('Order status:', orderStatus);
        if (orderStatus.paid) {
          thankYou();
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  });
  document.getElementById('payment').addEventListener('click', payOrder);
