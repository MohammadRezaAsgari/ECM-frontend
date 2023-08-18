

// if (!token){
//     alert('هیچ نشست فعالی برای شما وجود ندارد! دوباره وارد شوید.')
//     window.location.href = "index"
//     setTimeout(checkTokenValidation, 5000)
// }

checkTokenValidation()
async function checkTokenValidation () {
    let token = readCookie('token')
    response = fetchUrl(token,checkTokenViewUrl,"GET")

    response.then( (response) => {
        if (response.access!='OK'){
            alert('هیچ نشست فعالی برای شما وجود ندارد! دوباره وارد شوید.')
            window.location.href = "index"
        }
    }).catch(error => {
        alert(`${error} : خطایی رخ داده`) 
        window.location.href = "index"
    })
}    

