
const loginForm = document.getElementById('login-form')


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
        window.location.href = "home"
      }
    }).catch(error => alert('اشکال در سرور!'))
    
})

