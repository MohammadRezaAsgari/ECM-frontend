
const logOutBtn = document.getElementById('logout-btn')

logOutBtn.addEventListener('click', ()=> {
    eraseCookie('token')
    window.location.href = "index"
})


