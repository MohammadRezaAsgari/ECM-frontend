
const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', event=>{
    event.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const body = {
      username: username,
      password: password
    }
    response = postData(body , "POST", tokenObtainPairViewUrl)
    
    response.then(res => {
      if (!res.access)
        alert('نام کاربری یا رمز عبور اشتباه است. لطفا دوباره امتحان کنید!')
      else{
        createCookie('token',res.access,1)
        window.location.href = "home"
      }
    }).catch(err=> alert(`${err} : خطایی رخ داده`) )
    
})
