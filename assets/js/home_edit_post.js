const managePostWindows = document.getElementById('manage-post-panel')
//edit forms 
const contract_details_edit_form = document.getElementById('contract_details_edit')
const contact_details_edit_form = document.getElementById('contact_details_edit')
const phase_one_edit_form = document.getElementById('phase_one_edit')
const phase_two_edit_form = document.getElementById('phase_two_edit')
const supplement_edit_form = document.getElementById('supplement_edit')

// post Manage Btn Handler
const card_container = document.getElementById('card-container')
card_container.addEventListener('click',postManageBtnHandler)

//not available massagess
const contract_first_page_photo_notavailable_msg = document.getElementById('contract_first_page_photo_notavailable_msg')
const first_phase_documents_notavailable_msg = document.getElementById('first_phase_documents_notavailable_msg')
const first_phase_receipt_photo_notavailable_msg = document.getElementById('first_phase_receipt_photo_notavailable_msg')
const second_phase_receipt_photo_notavailable_msg = document.getElementById('second_phase_receipt_photo_notavailable_msg')
const second_phase_vulnerability_document_notavailable_msg = document.getElementById('second_phase_vulnerability_document_notavailable_msg')
const second_phase_functional_document_notavailable_msg = document.getElementById('second_phase_functional_document_notavailable_msg')
const supplement_receipt_photo_notavailable_msg = document.getElementById('supplement_receipt_photo_notavailable_msg')

//preview btns
const contract_first_page_photo_preview_btn = document.getElementById('contract_first_page_photo_preview_btn')

//download btns
const contract_first_page_photo_download_btn = document.getElementById('contract_first_page_photo_download_btn')

function postManageBtnHandler(event) {
    const isButton = event.target.nodeName === 'BUTTON'
    if (!isButton || 
        event.target.id==='add-post-btn' ||
        event.target.classList.contains('post-delete') || 
        event.target.classList.contains('return') ) {
      return
    }
  
    let selected_post_id = event.target.id


    let contract_details_form_fields = contract_details_edit_form.elements
    let contact_details_form_fields = contact_details_edit_form.elements
    let phase_one_form_fields = phase_one_edit_form.elements
    let phase_two_form_fields = phase_two_edit_form.elements
    let supplement_form_fields = supplement_edit_form.elements

    
    response = fetchUrl(token,contractRetrieveUrl+`${selected_post_id}`,"GET")
    response.then(result=>{
        console.log(result)

        contract_details_form_fields.product_name.value = result.product_name
        contract_details_form_fields.organ_name.value = result.company_name
        contract_details_form_fields.date.value = result.date_of_contract

        arr = result.contract_number.split('/')
        contract_details_form_fields.contract_number_details1.value = arr[3]
        contract_details_form_fields.contract_number_details2.value = arr[2]
        contract_details_form_fields.contract_number_details3.value = arr[0]
        contract_details_form_fields.contract_number_details4.value = arr[1]

        contract_details_form_fields.contract_total_price.value = result.contract_total_price
        contract_details_form_fields.contract_deadline_date.value = result.contract_deadline_date
        contract_details_form_fields.approved_discount.value = result.approved_discount
        contract_details_form_fields.certificate_renewal.value = (result.certificate_renewal)? 'yes' : 'no'
        contract_details_form_fields.certificate_renewal_description.value = result.certificate_renewal_description
        contract_details_form_fields.certificate_renewal_description.disabled = !result.certificate_renewal
        

        contact_details_form_fields.landline_phone_number.value = result.landline_phone_number
        contact_details_form_fields.interface_name.value = result.interface_name
        contact_details_form_fields.postal_code.value = result.postal_code
        contact_details_form_fields.phone_number.value = result.phone_number
        contact_details_form_fields.address.value = result.address


        phase_one_form_fields.first_phase_deposit_date.value = result.first_phase_deposit_date
        phase_one_form_fields.first_phase_price.value = result.first_phase_price
        phase_one_form_fields.first_phase_deadline_date.value = result.first_phase_deadline_date


        phase_two_form_fields.second_phase_deposit_date.value = result.second_phase_deposit_date
        phase_two_form_fields.second_phase_price.value = result.second_phase_price
        phase_two_form_fields.second_phase_deadline_date.value = result.second_phase_deadline_date


        supplement_form_fields.supplement_price.value = result.supplement_price
        supplement_form_fields.supplement_date.value = result.supplement_date
        



        //phase_one_form_fields.first_phase_documents = 
        //phase_one_form_fields.first_phase_receipt_photo = 

        // phase_two_form_fields.second_phase_receipt_photo = 
        // phase_two_form_fields.second_phase_vulnerability_document = 
        // phase_two_form_fields.second_phase_functional_document = 

        //supplement_form_fields.supplement_receipt_photo = 


        response2 = fetcphoto(token,manageContractPhotoUrl+`${selected_post_id}`,"GET")
        response2.then( res=>{
            if(res.type==='image/jpeg'){
                const imageUrl = URL.createObjectURL(res)
                contract_first_page_photo_download_btn.href =  imageUrl
                contract_first_page_photo_download_btn.style.display = 'flex'
                contract_first_page_photo_preview_btn.style.display = 'flex'
                image_url = imageUrl
            }
            else
                contract_first_page_photo_notavailable_msg.style.display = 'block'
        }
        ).catch(err =>  {
            console.log(`${err} : خطایی رخ داده`) 
        })


    toggleWindowOpacity('0.4',true)
    disableScroll()
    managePostWindows.style.display = 'block'
    }).catch(err =>  {
        console.log(`${err} : خطایی رخ داده`) 
    })
  }