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
const certificate_renewal_selector1 = document.getElementById('certificate_renewal_selector-1')

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
            for(contract of result){
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
//new post btn handler
function addPostBtnHandler(){
    toggleWindowOpacity('0.4',true)
    newPostForm.style.display = 'block'
    disableScroll()
}

/////////////////////////////////////////////////////////////////////////////////////////////////
//search handler
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
                for(contract of result){
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
// if the selector is on 'yes' option, so u can write description for it
certificate_renewal_selector.addEventListener('change',(e)=>{
    if (certificate_renewal_selector.value == 'yes')
        document.getElementById('certificate_renewal_description').disabled = false
    else
        document.getElementById('certificate_renewal_description').disabled = true
    })
certificate_renewal_selector1.addEventListener('change',(e)=>{
    if (certificate_renewal_selector1.value == 'yes')
        document.getElementById('certificate_renewal_description-1').disabled = false
    else
        document.getElementById('certificate_renewal_description-1').disabled = true
    })
/////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('cancel-post-edit-btn').addEventListener('click',close)
document.getElementById('close_post_edit_panel').addEventListener('click',close)
document.getElementById('close_post_create_panel').addEventListener('click',close)
cancel_post_create_btn.addEventListener('click',close)
cancel_post_edit_btn.forEach((item) => {
    item.addEventListener('click', close)
})
function close(e){
    location.reload()
    // e.preventDefault()
    // toggleWindowOpacity('1',false)
    // enableScroll()
    // managePostWindows.style.display = 'none'
    // img_download_btn.style.display  = 'none'
    // img_preview_btn.style.display  = 'none'
}
/////////////////////////////////////////////////////////////////////////////////////////////////
logOutBtn.addEventListener('click', (e)=> {
    eraseCookie('token')
    window.location.href = "index"
})
/////////////////////////////////////////////////////////////////////////////////////////////////\
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
