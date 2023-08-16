const baseUrl = 'http://127.0.0.1:8000/'
const tokenObtainPairViewUrl = baseUrl + 'api/token/'
const checkTokenViewUrl = baseUrl + 'api/user/checktoken/'
const assessmentsListViewUrl = baseUrl + 'api/assessments/'


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