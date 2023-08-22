const no_content_massage = document.getElementById('no-content-massage')
const card_container = document.getElementById('card-container')
const logOutBtn = document.getElementById('logout-btn')
const mainTag = document.querySelector('main')
const managePostWindows = document.getElementById('manage-post-panel')
const cancel_post_edit_btn = document.getElementById('cancel-post-edit-btn')
const cancel_post_create_btn = document.getElementById('cancel-post-create-btn')
const newPostForm = document.getElementById('create-new-post-panel')
const search_form = document.getElementById('search-form')
let token = readCookie('token')
let selected_post_id;







FETCH_POSTS(false)
function FETCH_POSTS(search){
    if(search){

    }
    else{
    response = fetchUrl(token,assessmentsListCreateViewUrl,"GET")
    response.then(result=>{
        if (result[0]){
            for(assessment of result){
                card_body = `<div id="single-card" class="card-body" style="margin-top: 30px;background: #ffffff;border-radius: 30px;box-shadow: 0px 0px 5px 1px #000000;"><div class="row" ><div class="col" ><h5 style="direction: rtl;text-align: right;margin-bottom: 1px;font-family: bnazanb;">نام شرکت : ${assessment.company_name} </h5></div><div class="col"><h5 style="direction: rtl;text-align: right;font-family: bnazanb;">نام سامانه : ${assessment.product_name}</h5></div></div><div class="row"><div class="col"><h6 style="direction: rtl;text-align: right;margin-bottom: 1px;font-family: bnazanb;">تاریخ عقد قرارداد : ${assessment.date_of_contract}</h6></div><div class="col"><h6 style="direction: rtl;text-align: right;margin-bottom: 1px;font-family: bnazanb;">شماره قرارداد : ${assessment.contract_number}</h6></div></div><button id="${assessment.id}" class="btn btn-primary post-edit" type="button" style="font-family: bnazanb;background: #00aacc;border-style: solid;border-radius: 18px;border-color: #00aacc;margin-right: 10px;margin-left: 10px;">ویرایش</button><button id="${assessment.id}" class="btn btn-primary post-delete" type="button" style="font-family: bnazanb;background: var(--bs-danger);border-radius: 18px;margin-right: 10px;margin-left: 10px;text-align: center;width: 69.25px;border-style: none;border-color: #00aacc;">حذف</button></div>`
                card_container.innerHTML += card_body
            }   
        }
        no_content_massage.style.display = "block"
    }).catch(err =>  {
        alert(`${err} : خطایی رخ داده`) 
        no_content_massage.style.display = "block"
        location.reload()
    
    })
    }
}




function disableScroll(e) {
    TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    LeftScroll = window.pageXOffset || document.documentElement.scrollLeft,

    // if scroll happens, set it to the previous value
    window.onscroll = function() {
    window.scrollTo(LeftScroll, TopScroll);
            };
 }
function enableScroll(e) {
    window.onscroll = function() {};
}

function toggleWindowOpacity(opac,disabled){
    page = document.querySelectorAll('.home')
    home_btns = document.querySelectorAll('.home button')
    home_inputs_btns = document.querySelectorAll('.home input')
    for (node of page)
        node.style.opacity = opac
    for (btn of home_btns)
        btn.disabled = disabled
    for (ins of home_inputs_btns)
        ins.disabled = disabled
}

// function windowsClickOutside(event){
//     var element = document.getElementById("manage-post-panel")
//     if (element.style.display==='none'){
//         element = document.getElementById("create-new-post-panel")
//         if (element.style.display==='none')
//             return
//     }
//     var rect = element.getBoundingClientRect()
//     if (event.clientY < rect.top-20 || 
//         event.clientY > rect.bottom+20 ||
//         event.clientX < rect.left-20 ||
//         event.clientX > rect.right+20){
//             if (!confirm('آیا مطمین هستید؟'))
//                 return
//             toggleWindowOpacity('1',false)
//             enableScroll()
//             element.style.display = 'none'
//         }

// }


function postManageBtnHandler(event) {
    const isButton = event.target.nodeName === 'BUTTON'
    if (!isButton || 
        event.target.id==='add-post-btn' ||
        event.target.classList.contains('post-delete') ) {
      return
    }
  
    selected_post_id = event.target.id
    
    response = fetchUrl(token,assessmentsListCreateViewUrl+`${selected_post_id}`,"GET")
    response.then(result=>{

    toggleWindowOpacity('0.4',true)
    disableScroll()

    document.getElementById('organization-name-details').value =  result.company_name
    document.getElementById('product-name-details').value =  result.product_name
    document.getElementById('date-details').value =  result.date_of_contract
    document.getElementById('contract-number-details').value =  result.contract_number

    response2 = fetcphoto(token,managePhotoUrl+`${selected_post_id}`,"GET")
    response2.then( res=>{
        if(res.type==='image/jpeg'){
            const imageUrl = URL.createObjectURL(res)
            document.getElementById('existing-image-download-btn').href =  imageUrl
            document.getElementById('existing-image-download-btn').style.display = 'flex'
        }
    }
    ).catch(err =>  {
        alert(`${err} : خطایی رخ داده`) 
    })
    
    managePostWindows.style.display = 'block'
    }).catch(err =>  {
        alert(`${err} : خطایی رخ داده`) 
        location.reload()
    })
  }


function postDeleteBtnHandler(event) {
    const isButton = event.target.nodeName === 'BUTTON'
    if (!isButton || 
        event.target.id==='add-post-btn' ||
        event.target.classList.contains('post-edit') ) {
      return
    }
    
    if(!confirm('آیا میخواهید این قرارداد را حذف کنید؟'))
        return

    selected_post_id = event.target.id
    response = fetchDelete(token,assessmentsListCreateViewUrl+`${selected_post_id}`,"DELETE")
    response.then(result=>{
        location.reload()
    }).catch(err =>  {
        alert(`${err} : خطایی رخ داده`) 
        location.reload()
    })
  }



function addPostBtnHandler(event){
    toggleWindowOpacity('0.4',true)
    newPostForm.style.display = 'block'
    disableScroll()
}

logOutBtn.addEventListener('click', (e)=> {
    eraseCookie('token')
    window.location.href = "index"
})


 function newPostHanlder(event){
    event.preventDefault()
    form = event.target
    formFields = form.elements

    const body = {
        company_name: formFields.organ_name.value,
        product_name: formFields.product_name.value,
        date_of_contract: formFields.date.value,
        contract_number: formFields.contract_num.value 
    }
    

    response =  postData(body,"POST",assessmentsListCreateViewUrl )
    response.then(async res => {
        if(Object.keys(res).length===1){
            console.log(res[Object.keys(res)[0]])
            return
        }
        
        const formData = new FormData()
        formData.append( 'photo', formFields.photo_details.files[0] )
        formData.append( 'post_id', res.id )
        response2 = await postPhoto(formData,"POST",managePhotoUrl )
        


        toggleWindowOpacity('1',false)
        newPostForm.style.display = 'none'
        location.reload()
      }
      ).catch(err=> alert(`${err} : خطایی رخ داده`) )
    
    
    
    
}


function updatePostHandler(event){
    event.preventDefault()
    form = event.target
    formFields = form.elements

    const body = {
        company_name: formFields.organ_name.value,
        product_name: formFields.product_name.value,
        date_of_contract: formFields.date.value,
        contract_number: formFields.contract_num.value 
    }
    response = postData(body,"PUT",assessmentsListCreateViewUrl+`${selected_post_id}`)
    response.then(async res => {
        

        if(Object.keys(res).length===1){
            alert(res[Object.keys(res)[0]])
            return
        }
        
        if(!!formFields.photo_details.files[0]){
            const formData = new FormData()
            formData.append( 'photo', formFields.photo_details.files[0] )
            
            response2 = await postPhoto(formData,"PUT",managePhotoUrl+ `${selected_post_id}`)
        }

        toggleWindowOpacity('1',false)
        managePostWindows.style.display = 'none'
        location.reload()
      }
      ).catch(err=> alert(`${err} : خطایی رخ داده`) )
}

//////////////////////////////////okey nist
function searchHandler(e){
    e.preventDefault()
    form = e.target
    formFields = form.elements
    company_name = formFields.organ_name.value,
    product_name = formFields.product_name.value,
    contract_number = formFields.contract_num.value 
    
    response = fetchUrl(readCookie('token'), searchAssessmentUrl, "GET")
    response.then(res => {

      }
      ).catch(err=> alert(`${err} : خطایی رخ داده`) )

}

//document.addEventListener('click', windowsClickOutside)

// post Manage Btn Handler
card_container.addEventListener('click',postManageBtnHandler)

// post delete Btn Handler
card_container.addEventListener('click', postDeleteBtnHandler)

cancel_post_edit_btn.addEventListener('click', (e)=> {
    e.preventDefault()
    toggleWindowOpacity('1',false)
    enableScroll()
    managePostWindows.style.display = 'none'
    document.getElementById('existing-image-download-btn').style.display  = 'none'
})



cancel_post_create_btn.addEventListener('click', (e)=>{
    e.preventDefault()
    toggleWindowOpacity('1',false)
    enableScroll()
    newPostForm.style.display = 'none'
})


newPostForm.addEventListener('submit', newPostHanlder)

managePostWindows.addEventListener('submit', updatePostHandler)

search_form.addEventListener('submit',searchHandler)