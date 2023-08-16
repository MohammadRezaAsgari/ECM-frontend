

let token = readCookie('token')
if (!token){
    alert('هیچ نشست فعالی برای شما وجود ندارد! دوباره وارد شوید.')
    window.location.href = "index"
    setTimeout(checkTokenValidation, 5000)
}

checkTokenValidation()
async function checkTokenValidation () {
    response = fetchUrl(token,checkTokenViewUrl,"GET")

    response.then( (response) => {
        if (response.access!='OK'){
            alert('نشست شما به پایان رسیده است!لطفا دوباره وارد شوید.')
            window.location.href = "index"
        }
    }).catch(error => {
        alert(`${error} : خطایی رخ داده`) 
        window.location.href = "index"
    })
}    

