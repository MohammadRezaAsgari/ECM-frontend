const baseUrl = 'http://127.0.0.1:8000/'
const tokenObtainPairViewUrl = baseUrl + 'api/token/'
const checkTokenViewUrl = baseUrl + 'api/user/checktoken/'



function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
  
  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
  }
  
  function eraseCookie(name) {
    createCookie(name,"",-1);
  }
  


  async function checkToken(token) {
    const response = await fetch(checkTokenViewUrl,{
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            Authentication: `Bearer {${token}}`,
            'Content-Type': 'application/json'
      }
    }
    ).then(data => {
        return data.json();
    })
    return response 
  }
