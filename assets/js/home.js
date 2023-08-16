
const card_container = document.getElementById('card-container')
const logOutBtn = document.getElementById('logout-btn')
const single_card_container = document.getElementById('card-container')
const mainTag = document.querySelector('main')
const managePostWindows = document.getElementById('manage-post-panel')


response = fetchUrl(token,assessmentsListViewUrl,"GET")
response.then(result=>{
    if (result[0]){
        for(assessment of result){
            card_body = `<div id="single-card" class="card-body" style="margin-top: 30px;background: #ffffff;border-radius: 30px;box-shadow: 0px 0px 5px 1px #000000;"><div class="row"><div class="col"><h4 style="text-align: right;margin-bottom: 1px;font-family: bnazanb;">${assessment.company_name} : نام شرکت</h4></div><div class="col"><h4 style="text-align: right;font-family: bnazanb;">${assessment.product_name} : نام سامانه</h4></div></div><div class="row"><div class="col"><h5 style="text-align: right;margin-bottom: 1px;font-family: bnazanb;">${assessment.date_of_contract.replaceAll('-','/')} : تاریخ عقد قرارداد</h5></div><div class="col"><h5 style="text-align: right;margin-bottom: 1px;font-family: bnazanb;">${assessment.contract_number} : شماره قرارداد</h5></div></div><button id="${assessment.id}" class="btn btn-primary post-edit" type="button" style="font-family: bnazanb;background: #00aacc;border-style: solid;border-radius: 18px;border-color: #00aacc;margin-right: 10px;margin-left: 10px;">ویرایش</button><button id="${assessment.id}" class="btn btn-primary post-delete" type="button" style="font-family: bnazanb;background: var(--bs-danger);border-radius: 18px;margin-right: 10px;margin-left: 10px;text-align: center;width: 69.25px;border-style: none;border-color: #00aacc;">حذف</button></div>`
            card_container.innerHTML += card_body
        }
        no_content_massage = document.getElementById('no-content-massage')
        no_content_massage.style.display = "none"
    }
}).catch(err =>  {
    alert(`${err} : خطایی رخ داده`) 
    no_content_massage.style.display = "block"
})




function windowsClickOutside(event){
    var element = document.getElementById("manage-post-panel")
    if (element.style.display==='none'){
        element = document.getElementById("create-new-post")
        if (element.style.display==='none')
            return
    }
    var rect = element.getBoundingClientRect()
    if (event.clientY < rect.top-20 || 
        event.clientY > rect.bottom+20 ||
        event.clientX < rect.left-20 ||
        event.clientX > rect.right+20){
            if (!confirm('آیا مطمین هستید؟'))
                return
            page = document.querySelectorAll('.home')
            home_btns = document.querySelectorAll('.home button')
            home_inputs_btns = document.querySelectorAll('.home input')
            for (node of page)
                node.style.opacity = '1'
            for (btn of home_btns)
                btn.disabled = false
            for (ins of home_inputs_btns)
                ins.disabled = false
            element.style.display = 'none'
        }

}


function postManageBtnHandler(event) {
    const isButton = event.target.nodeName === 'BUTTON'
    if (!isButton || 
        event.target.id==='add-post-btn' ||
        event.target.classList.contains('post-delete') ) {
      return
    }
  
    selected_post_id = event.target.id
    response = fetchUrl(token,assessmentsListViewUrl+`${selected_post_id}`,"GET")
    response.then(result=>{

        page = document.querySelectorAll('.home')
        home_btns = document.querySelectorAll('.home button')
        home_inputs_btns = document.querySelectorAll('.home input')
        for (node of page)
            node.style.opacity = '0.4'
        for (btn of home_btns)
            btn.disabled = true
        for (ins of home_inputs_btns)
            ins.disabled = true

        document.getElementById('organization-name-details').value =  result.company_name
        document.getElementById('product-name-details').value =  result.product_name
        document.getElementById('date-details').value =  result.date_of_contract.replaceAll('-','/')
        document.getElementById('contract-number-details').value =  result.contract_number
        managePostWindows.style.display = 'block'
    }).catch(err =>  {
        alert(`${err} : خطایی رخ داده`) 
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
    response = fetchDelete(token,assessmentsListViewUrl+`${selected_post_id}`,"DELETE")
    response.then(result=>{
        alert('قرارداد ارزیابی با موفقیت حذف شد.')
    }).catch(err =>  {
        alert(`${err} : خطایی رخ داده`) 
    })
  }





logOutBtn.addEventListener('click', (e)=> {
    eraseCookie('token')
    window.location.href = "index"
})

document.addEventListener('click', windowsClickOutside)

// post Manage Btn Handler
single_card_container.addEventListener('click',postManageBtnHandler)

// post delete Btn Handler
single_card_container.addEventListener('click', postDeleteBtnHandler)