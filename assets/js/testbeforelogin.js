let token = readCookie('token')
response = fetchUrl(token,checkTokenViewUrl,"GET")

response.then( (response) => {
    if (response.access==='OK')
        window.location.href = "home"
}).catch(error => {
    console.log(`${error} : خطایی رخ داده`) 
})