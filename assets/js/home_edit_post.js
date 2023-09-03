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
const notavailable_msgs = document.querySelectorAll('.notavailable-msg')

//download btns
const download_btns = document.querySelectorAll('.download-btn')

const images_to_show = document.querySelectorAll('#image-to-show')

//retreive a post details and show them to user, also geting files related to this post
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
        






        //handling contract first page photo
        response2 = fetcphoto(token,manageContractPhotoUrl+`${selected_post_id}`,"GET")
        response2.then( res=>{
            if(res.type==='image/jpeg'){
                const imageUrl = URL.createObjectURL(res)
                download_btns[0].href =  imageUrl
                download_btns[0].style.display = 'flex'
                img_preview_btns[0].style.display = 'flex'
                images_to_show[0].src = imageUrl
            }
            else
                notavailable_msgs[0].style.display = 'block'
        }
        ).catch(err =>  {
            console.log(`${err} : خطایی رخ داده`) 
        })

        
/////////////not complete
        //handling first phase documents
        response4 = fetcphoto(token,managePhaseOneDocsUrl+`${selected_post_id}`,"GET")
        response4.then( res=>{
            if(res.type==='application/x-zip-compressed'){
                // const fileUrl = URL.createObjectURL(res)
                // download_btns[2].href =  imageUrl
                // download_btns[2].style.display = 'flex'
                var myzp = new JSZip();
                myzp.loadAsync(res).then(function(zip) {
                    zip.file("receipt.png").async("blob").then((file)=> {
                        test = URL.createObjectURL(file)
                        download_btns[1].href =  test
                        download_btns[1].style.display = 'flex'
                    })

                    zip.file("TRP.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[2].href =  test
                            download_btns[2].style.display = 'flex'
                        })
                        

                    // Read from the zip file!
                   // read_zip.file("hello.txt").async("string"); // a promise of "Hello World\n"
                });
            }
            else
                notavailable_msgs[2].style.display = 'block'
        }
        ).catch(err =>  {
            console.log(`${err} : خطایی رخ داده`) 
        })







        // //handling first phase receipt photo
        // response3 = fetcphoto(token,getPhaseOneReceiptPhotoUrl+`${selected_post_id}`,"GET")
        // response3.then( res=>{
        //     if(res.type==='image/jpeg'){
        //         const imageUrl = URL.createObjectURL(res)
        //         download_btns[1].href =  imageUrl
        //         download_btns[1].style.display = 'flex'
        //         img_preview_btns[1].style.display = 'flex'
        //         images_to_show[1].src = imageUrl
        //     }
        //     else
        //         notavailable_msgs[1].style.display = 'block'
        // }
        // ).catch(err =>  {
        //     console.log(`${err} : خطایی رخ داده`) 
        // })


        
        // //handling first phase documents
        // response4 = fetcphoto(token,getPhaseOneDocumentsUrl+`${selected_post_id}`,"GET")
        // response4.then( res=>{
        //     if(res.type==='application/x-zip-compressed'){
        //         const imageUrl = URL.createObjectURL(res)
        //         download_btns[2].href =  imageUrl
        //         download_btns[2].style.display = 'flex'
        //     }
        //     else
        //         notavailable_msgs[2].style.display = 'block'
        // }
        // ).catch(err =>  {
        //     console.log(`${err} : خطایی رخ داده`) 
        // })



        // //handling second phase receipt photo
        // response5 = fetcphoto(token,getPhaseTwoReceiptPhotoUrl+`${selected_post_id}`,"GET")
        // response5.then( res=>{
        //     if(res.type==='image/jpeg'){
        //         const imageUrl = URL.createObjectURL(res)
        //         download_btns[3].href =  imageUrl
        //         download_btns[3].style.display = 'flex'
        //         img_preview_btns[2].style.display = 'flex'
        //         images_to_show[2].src = imageUrl
        //     }
        //     else
        //         notavailable_msgs[3].style.display = 'block'
        // }
        // ).catch(err =>  {
        //     console.log(`${err} : خطایی رخ داده`) 
        // })



        


        // //supplement_form_fields.supplement_receipt_photo = 

        // //handling second phase vulnerability document
        // response6 = fetcphoto(token,getPhaseTwoVulDocumentsUrl+`${selected_post_id}`,"GET")
        // response6.then( res=>{
        //     if(res.type==='application/x-zip-compressed'){
        //         const imageUrl = URL.createObjectURL(res)
        //         download_btns[4].href =  imageUrl
        //         download_btns[4].style.display = 'flex'
        //     }
        //     else
        //         notavailable_msgs[4].style.display = 'block'
        // }
        // ).catch(err =>  {
        //     console.log(`${err} : خطایی رخ داده`) 
        // })


        // //handling second phase functional document
        // response7 = fetcphoto(token,getPhaseTwoFuncDocumentsUrl+`${selected_post_id}`,"GET")
        // response7.then( res=>{
        //     if(res.type==='application/x-zip-compressed'){
        //         const imageUrl = URL.createObjectURL(res)
        //         download_btns[5].href =  imageUrl
        //         download_btns[5].style.display = 'flex'
        //     }
        //     else
        //         notavailable_msgs[5].style.display = 'block'
        // }
        // ).catch(err =>  {
        //     console.log(`${err} : خطایی رخ داده`) 
        // })       




        // //handling suppliment phase receipt photo
        // response5 = fetcphoto(token,manageSupplementFilesUrl+`${selected_post_id}`,"GET")
        // response5.then( res=>{
        //     if(res.type==='image/jpeg'){
        //         const imageUrl = URL.createObjectURL(res)
        //         download_btns[6].href =  imageUrl
        //         download_btns[6].style.display = 'flex'
        //         img_preview_btns[3].style.display = 'flex'
        //         images_to_show[3].src = imageUrl
        //     }
        //     else
        //         notavailable_msgs[6].style.display = 'block'
        // }
        // ).catch(err =>  {
        //     console.log(`${err} : خطایی رخ داده`) 
        // })





    toggleWindowOpacity('0.4',true)
    disableScroll()
    managePostWindows.style.display = 'block'
    }).catch(err =>  {
        console.log(`${err} : خطایی رخ داده`) 
    })
  }