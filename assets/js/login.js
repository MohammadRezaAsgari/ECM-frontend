
const loginForm = document.getElementById('login-form')




// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// const csrftoken = getCookie('csrftoken');
// console.log(csrftoken)

// async function loginRequest(username, password) {
//     const user_info = {
//         username: username,
//         password: password,
//     }


//     const response = await fetch(baseUrl+'api/token/', {
//        method: "POST",
//        //credentials: 'include',
//        mode: "no-cors",
//        headers: {
//          //"X-CSRFToken": csrfToken,
//          //'Accept': 'application/json',
//          'Accept': 'application/json',
//          'Content-Type': 'application/x-www-form-urlencoded'
//        },
//        body:  JSON.stringify(user_info)
//      }).then(response => {
//         console.log(response)
//      }).then( data => {
//         console.log(data)
//      }).catch( error => {
//         console.log('ERROR',error)
//      })
// }




async function postData(username, password) {
    const user_info = {
        username: username,
        password: password,
    }
    const response = await fetch(tokenObtainPairViewUrl, {
      method: "POST", 
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin", 
       headers: {
            'Content-Type': 'application/json; charset=UTF-8',
      },
      redirect: "follow", 
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(user_info), 
    }).then( response=> response.json()
      ).then(jsonResponse => jsonResponse.access
        )
    return response 
  }

  loginForm.addEventListener('submit', event=>{
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    
    response = postData(username,password)
    
    response.then(access => {
      if (!access)
        alert('نام کاربری یا رمز عبور اشتباه است. لطفا دوباره امتحان کنید!')
      else{
        createCookie('token',access,1)
        window.location.href = "index.html"
      }
    })
    
})

