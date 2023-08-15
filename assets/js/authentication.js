

let token = readCookie('token')
if (!token){
    alert('هیچ نشست فعالی برای شما وجود ندارد! دوباره وارد شوید.')
    window.location.href = "index"
    setTimeout(checkTokenValidation, 5000)
}

async function checkTokenValidation () {
    response = checkToken(token)

    response.then( access => {
        if (access!=='OK'){
            alert('نشست شما به پایان رسیده است!لطفا دوباره وارد شوید.')
            window.location.href = "index"
        }
    })
}    

