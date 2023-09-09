// This is the backend URL(IP) you can edit and give your new backend URL
const BackEnd_URL = 'http://127.0.0.1:8000/'


const tokenObtainPairViewUrl = BackEnd_URL + 'api/token/'
const tokenRefreshViewUrl = BackEnd_URL + 'api/token/refresh/'
const checkTokenViewUrl = BackEnd_URL + 'api/user/checktoken/'

const assessmentsListCreateViewUrl = BackEnd_URL + 'api/contracts/'
const contractRetrieveUrl = BackEnd_URL + 'api/contracts/'
const searchAssessmentUrl = assessmentsListCreateViewUrl

const manageContractPhotoUrl = BackEnd_URL + 'api/contracts/contract-photo/'
const manageSupplementDocsUrl = BackEnd_URL + 'api/contracts/supplement/'
const managePhaseOneDocsUrl = BackEnd_URL + 'api/contracts/phase-one/'
const managePhaseTwoDocsUrl = BackEnd_URL + 'api/contracts/phase-two/'



const getUsernameUrl = BackEnd_URL + 'api/user/getusername/'
const changeUsernameUrl = BackEnd_URL + 'api/user/changeusername/'
const changeUsernameAndPasswordUrl = BackEnd_URL + 'api/user/changeuserpass/'
const isAdminUrl = BackEnd_URL + 'api/user/isAdmin/'
const createUserUrl = BackEnd_URL + 'api/user/createuser/'


function myAlert(massage,succ){
  const box = document.getElementById('massage-box')
  const text = document.querySelector('#massage-box h5')
  text.textContent  = massage
  if(succ){
    box.style.background = 'var(--bs-green)'
    box.style.boxShadow = '0px 0px 5px 2px var(--bs-green)'
  }
  else{
    box.style.background = 'var(--bs-form-invalid-color)'
    box.style.boxShadow = '0px 0px 5px 2px var(--bs-form-invalid-color)'
  }
  box.style.display = 'block'
  setTimeout(function(){box.style.display='none'},2000)
}

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



async function fetcfile(Token,url,method) {
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


  async function postfile(body, method, url) {
    Token = readCookie('token')
    const response = await fetch(url, {
      method: method, 
      headers: {
            'Authorization': `Bearer ${Token}`,
      },
      body: body, 
    }).then( response=> response)
    return response 
  }