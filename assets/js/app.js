//const baseUrl = 'http://192.168.43.111:8000/'
const baseUrl = 'http://192.168.1.34:8000/'
const tokenObtainPairViewUrl = baseUrl + 'api/token/'
const tokenRefreshViewUrl = baseUrl + 'api/token/refresh/'
const checkTokenViewUrl = baseUrl + 'api/user/checktoken/'
const assessmentsListCreateViewUrl = baseUrl + 'api/contracts/'
const searchAssessmentUrl = assessmentsListCreateViewUrl
const managePhotoUrl = baseUrl + 'api/contracts/photo/'


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
  
async function fetchUrl(Token,url,method) {
  const headers = {
    'Authorization': `Bearer ${Token}`,
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json; ',
    }
    const the_response = await fetch(url, { headers ,
        method: method, 
        mode: "cors", 
    }).then(response => response.json())
    //.then(jsonResponse => jsonResponse.access)
    return the_response 

}



async function fetcphoto(Token,url,method) {
  const headers = {
    'Authorization': `Bearer ${Token}`,
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'application/json; ',
    }
    const the_response = await fetch(url, { headers ,
        method: method, 
        mode: "cors", 
    }).then(response => response.blob())
    //.then(jsonResponse => jsonResponse.access)
    return the_response 

}


async function fetchDelete(Token,url,method) {
    const headers = {
      'Authorization': `Bearer ${Token}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json; ',
      }
      const the_response = await fetch(url, { headers ,
          method: method, 
          mode: "cors", 
      }).then(response => response)
      //.then(jsonResponse => jsonResponse.access)
      return the_response 
  
  }

  async function postData(body, method, url) {
    Token = readCookie('token')
    const response = await fetch(url, {
      method: method, 
      mode: "cors", 
       headers: {
            'Authorization': `Bearer ${Token}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept' : 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(body), 
    }).then( response=> response.json())
    return response 
  }


  async function postPhoto(body, method, url) {
    Token = readCookie('token')
    const response = await fetch(url, {
      method: method, 
       headers: {
            'Authorization': `Bearer ${Token}`,
            //'Content-Type': 'multipart/form-data; boundary=something',
      },
      body: body, 
    }).then( response=> response)
    return response 
  }