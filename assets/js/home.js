// templates to show when needed
const post_template = document.getElementById('POST_TEMPLATE').innerHTML
const search_header_template = document.getElementById('search_header_template').innerHTML

//massage to show when no posts available
const no_content_massage = document.getElementById('no-content-massage')

//for disabling scroll of page while in another panel
const body = document.querySelector('body')
const edit_forms_div = document.getElementById('edit-forms-div')

//for check if delete btn for a post is clicked and handle it
const card_container_for_delete = document.getElementById('card-container')
const mainTag = document.querySelector('main')
const logOutBtn = document.getElementById('logout-btn')


//
const cancel_post_edit_btn = document.querySelectorAll('.manage_panel_close_btn')
const cancel_post_create_btn = document.getElementById('cancel-post-create-btn')
const newPostForm = document.getElementById('create-new-post-panel')


//
const search_form = document.getElementById('search-form')
const  search_text = document.getElementById('search-text')

//
//image preview panels
const img_preview_panels = document.querySelectorAll('.image-preview')

const img_preview_btns = document.querySelectorAll('.preview-btn')

const img_close_btn = document.querySelectorAll('.btn-close')



//check if certificate_renewal_selector is selected yes to enable its description
const certificate_renewal_selector = document.getElementById('certificate_renewal_selector')

//get the token from cookie to send authentication with requests
let token = readCookie('token')

//see which post is selected now
let selected_post_id;

//image preview needs an url
let contract_image_url = ''
let phase_one_image_url = ''
let phase_twoimage_url = ''
let supplement_image_url = ''
let image_url = ''


/////////////////////////////////////////////////////////////////////////////////////////////////
//fetching posts at startup
FETCH_POSTS()
function FETCH_POSTS(){
    response = fetchUrl(token,assessmentsListCreateViewUrl,"GET")
    response.then(result=>{
        if (result[0]){
            for(assessment of result){
                card_body =  eval('`'+post_template+'`')
                card_container.innerHTML += card_body
            }   
            return
        }
        no_content_massage.style.display = "block"
    }).catch(err =>  {
        console.log(`${err} : خطایی رخ داده`) 
        no_content_massage.style.display = "block"
    
    })
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//listener for preview btns
// img_preview_btns.forEach((item) => {
//     item.addEventListener('click', previewImage)
// })
function previewImageBtnHandler(id){
    img_preview_panels[id].style.display = 'block'
}


img_close_btn.forEach((item) => {
    item.addEventListener('click', img_close)
})
function img_close (e){
    e.preventDefault()
    img_preview_panels[0].style.display = 'none'
    img_preview_panels[1].style.display = 'none'
    img_preview_panels[2].style.display = 'none'
    img_preview_panels[3].style.display = 'none'
}

/////////////////////////////////////////////////////////////////////////////////////////////////
// post delete Btn Handler
card_container_for_delete.addEventListener('click', postDeleteBtnHandler)
function postDeleteBtnHandler(event) {
    const isButton = event.target.nodeName === 'BUTTON'
    if (!isButton || 
        event.target.id==='add-post-btn' ||
        event.target.classList.contains('post-edit') || 
        event.target.classList.contains('return') ) {
      return
    }
    
    if(!confirm('آیا میخواهید این قرارداد را حذف کنید؟'))
        return

    selected_post_id = event.target.id
    response = fetchDelete(token,assessmentsListCreateViewUrl+`${selected_post_id}`,"DELETE")
    response.then(result=>{
        myAlert('قرارداد با موفقیت حذف شد.',true)
        setTimeout(function() {location.reload()}, 1000)
    }).catch(err =>  {
        console.log(`${err} : خطایی رخ داده`) 
    })
  }


/////////////////////////////////////////////////////////////////////////////////////////////////
//
function addPostBtnHandler(){
    toggleWindowOpacity('0.4',true)
    newPostForm.style.display = 'block'
    disableScroll()
}


/////////////////////////////////////////////////////////////////////////////////////////////////
//
function newPostHanlder(event){
    event.preventDefault()
    form = event.target
    formFields = form.elements

    
    
    
    
    const body = {
        company_name: formFields.organ_name.value,
        product_name: formFields.product_name.value,
        date_of_contract: formFields.date.value,
        contract_number: formFields.contract_number_details3.value + '/' +
                        formFields.contract_number_details4.value + '/' +
                        formFields.contract_number_details2.value + '/'+
                        formFields.contract_number_details1.value 
    }
    

    response =  postData(body,"POST",assessmentsListCreateViewUrl )
    response.then(async res => {
        if(Object.keys(res).length===1){
            msg = `${res[Object.keys(res)[0]]}`.replace('contract','قرارداد','contract number','شماره پرونده')
            msg = msg.replace('contract number','شماره پرونده')
            msg = msg.replace('product_name','نام سامانه')
            msg = msg.replace('company_name', 'نام سازمان')
            msg = msg.replace(',', ' و' )

            myAlert(msg,false)
            return
        }
        
        const formData = new FormData()
        formData.append( 'photo', formFields.photo_details.files[0] )
        formData.append( 'post_id', res.id )
        response2 = await postPhoto(formData,"POST",managePhotoUrl )
        

        myAlert('قرارداد با موفقیت اضافه شد.',true)
        setTimeout(function() {
            toggleWindowOpacity('1',false)
            newPostForm.style.display = 'none'
            location.reload()
        }, 1000)


      }
      ).catch(err=> console.log(`${err} : خطایی رخ داده`) )
    
    
    
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//
function updatePostHandler(event){
    event.preventDefault()
    form = event.target
    formFields = form.elements

    const body = {
        company_name: formFields.organ_name.value,
        product_name: formFields.product_name.value,
        date_of_contract: formFields.date.value,
        contract_number: formFields.contract_number_details3.value + '/' +
                        formFields.contract_number_details4.value + '/' +
                        formFields.contract_number_details2.value + '/'+
                        formFields.contract_number_details1.value 
    }
    response = postData(body,"PUT",assessmentsListCreateViewUrl+`${selected_post_id}`)
    response.then(async res => {
        

        if(Object.keys(res).length===1){

            msg = `${res[Object.keys(res)[0]]}`.replace('contract','قرارداد','contract number','شماره پرونده')
            msg = msg.replace('contract number','شماره پرونده')
            msg = msg.replace('product_name','نام سامانه')
            msg = msg.replace('company_name', 'نام سازمان')
            msg = msg.replace(',', ' و' )

            myAlert(msg,false)
            return
        }
        
        if(!!formFields.photo_details.files[0]){
            const formData = new FormData()
            formData.append( 'photo', formFields.photo_details.files[0] )
            
            response2 = await postPhoto(formData,"PUT",managePhotoUrl+ `${selected_post_id}`)
        }

        myAlert('قرارداد با موفقیت ویرایش شد.',true)
        setTimeout(function() {
            toggleWindowOpacity('1',false)
            newPostForm.style.display = 'none'
            location.reload()
        }, 1000)

      }
      ).catch(err=> console.log(`${err} : خطایی رخ داده`) )
}


/////////////////////////////////////////////////////////////////////////////////////////////////
//
search_form.addEventListener('submit',searchHandler)
function searchHandler(e){
    e.preventDefault()
    form = e.target
    formFields = form.elements

    if(!formFields.organ_name.value && 
        !formFields.product_name.value &&
        !formFields.contract_num.value)
        return


    document.getElementById('home-btn').style.background = null
    no_content_massage.style.display = "none"

    let search_factors_all = []
    let query_params = `?`
    search_factors_all.push(formFields.organ_name.value)
    search_factors_all.push(formFields.product_name.value)
    search_factors_all.push(formFields.contract_num.value )


    for(item of search_factors_all){
        if (item)
        query_params = query_params.concat(`search=${item}&`)
    }
    if (query_params.at(-1)===`&`)
        query_params = query_params.slice(0,query_params.length - 1) 
    

    
    response = fetchUrl(readCookie('token'), searchAssessmentUrl+query_params, "GET")
    response.then(result=>{
            card_container.innerHTML = ``
            card_container.innerHTML += search_header_template
            if (result[0]){
                for(assessment of result){
                    card_body =  eval('`'+post_template+'`')
                    card_container.innerHTML += card_body
                }   
                return
            }
            no_content_massage.style.display = "block"
        }).catch(err =>  {
            console.log(`${err} : خطایی رخ داده`) 
            no_content_massage.style.display = "block"

        
        })
}



// cancel_post_create_btn.addEventListener('click', (e)=>{
//     e.preventDefault()
//     toggleWindowOpacity('1',false)
//     enableScroll()
//     newPostForm.style.display = 'none'
// })


//newPostForm.addEventListener('submit', newPostHanlder)

//managePostWindows.addEventListener('submit', updatePostHandler)



/////////////////////////////////////////////////////////////////////////////////////////////////
//
certificate_renewal_selector.addEventListener('change',(e)=>{
    if (certificate_renewal_selector.value == 'yes')
        document.getElementById('certificate_renewal_description').disabled = false
    else
        document.getElementById('certificate_renewal_description').disabled = true
    })


/////////////////////////////////////////////////////////////////////////////////////////////////
//
document.getElementById('close_post_edit_panel').addEventListener('click',close_post_edit)
cancel_post_edit_btn.forEach((item) => {
    item.addEventListener('click', close_post_edit)
})
function close_post_edit(e){
    location.reload()
    // e.preventDefault()
    // toggleWindowOpacity('1',false)
    // enableScroll()
    // managePostWindows.style.display = 'none'
    // img_download_btn.style.display  = 'none'
    // img_preview_btn.style.display  = 'none'
}


/////////////////////////////////////////////////////////////////////////////////////////////////
//
logOutBtn.addEventListener('click', (e)=> {
    eraseCookie('token')
    window.location.href = "index"
})


/////////////////////////////////////////////////////////////////////////////////////////////////
//not working yet
function disableScroll(e) {
    body.style.overflow = 'hidden'
    edit_forms_div.style.overflow = 'auto'
 }
function enableScroll(e) {
    body.style.overflow = 'auto'
}


/////////////////////////////////////////////////////////////////////////////////////////////////
//
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
