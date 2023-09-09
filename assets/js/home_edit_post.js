const managePostWindows = document.getElementById('manage-post-panel')
//edit forms manage-post-panel
const edit_form_panel = document.getElementById('manage-post-panel')
edit_form_panel.addEventListener('submit', ContractEditHandler)

// const contract_details_edit_form = document.getElementById('contract_details_edit')
// const contact_details_edit_form = document.getElementById('contact_details_edit')
// const phase_one_edit_form = document.getElementById('phase_one_edit')
// const phase_two_edit_form = document.getElementById('phase_two_edit')
// const supplement_edit_form = document.getElementById('supplement_edit')

// post Manage Btn Handler
const card_container = document.getElementById('card-container')
card_container.addEventListener('click',postManageBtnHandler)

//not available massagess
const notavailable_msgs = document.querySelectorAll('.notavailable-msg')

//download btns
const download_btns = document.querySelectorAll('.download-btn')

//img tag that previews the images
const images_to_show = document.querySelectorAll('#image-to-show')


//retreive a post details and show them to user, also geting files related to this post
function postManageBtnHandler(e) {
    const isButton = e.target.nodeName === 'BUTTON'
    if (!isButton || 
        e.target.id==='add-post-btn' ||
        e.target.classList.contains('post-delete') || 
        e.target.classList.contains('return') ) {
      return
    }
  
    selected_post_id = e.target.id

    formFields = edit_form_panel.elements

    
    response = fetchUrl(token,contractRetrieveUrl+`${selected_post_id}`,"GET")
    response.then(result=>{

        formFields.product_name.value = result.product_name
        formFields.organ_name.value = result.company_name
        formFields.date.value = result.date_of_contract

        formFields.product_category.value = result.product_category

        arr = result.contract_number.split('/')
        formFields.contract_number_details1.value = arr[3]
        formFields.contract_number_details2.value = arr[2]
        formFields.contract_number_details3.value = arr[0]
        formFields.contract_number_details4.value = arr[1]

        formFields.contract_total_price.value = result.contract_total_price
        formFields.contract_deadline_date.value = result.contract_deadline_date
        formFields.approved_discount.value = result.approved_discount
        formFields.certificate_renewal.value = (result.certificate_renewal)? 'yes' : 'no'
        formFields.certificate_renewal_description.value = result.certificate_renewal_description
        formFields.certificate_renewal_description.disabled = !result.certificate_renewal
        

        formFields.landline_phone_number.value = result.landline_phone_number
        formFields.interface_name.value = result.interface_name
        formFields.postal_code.value = result.postal_code
        formFields.phone_number.value = result.phone_number
        formFields.address.value = result.address


        formFields.first_phase_deposit_date.value = result.first_phase_deposit_date
        formFields.first_phase_price.value = result.first_phase_price
        formFields.first_phase_deadline_date.value = result.first_phase_deadline_date


        formFields.second_phase_deposit_date.value = result.second_phase_deposit_date
        formFields.second_phase_price.value = result.second_phase_price
        formFields.second_phase_deadline_date.value = result.second_phase_deadline_date


        formFields.supplement_price.value = result.supplement_price
        formFields.supplement_date.value = result.supplement_date
        

        //handling contract first page photo
        response2 = fetcfile(token,manageContractPhotoUrl+`${selected_post_id}`,"GET")
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

        
        
        //handling first phase documents
        response3 = fetcfile(token,managePhaseOneDocsUrl+`${selected_post_id}`,"GET")
        response3.then( res=>{
            if(res.type==='application/x-zip-compressed'){
                //get the zip file from request and open its contents
                var myzp = new JSZip()
                myzp.loadAsync(res).then(function(zip) {
                    // read the phase one documents and create a download link for them

                try{
                    zip.file("p1_rec.jpeg").async("blob").then((file)=> {
                        fiel_url = URL.createObjectURL(file)
                        download_btns[1].href =  fiel_url
                        images_to_show[1].src = fiel_url
                        download_btns[1].style.display = 'flex'
                        img_preview_btns[1].style.display = 'flex'
                    })
                }catch(err){
                    notavailable_msgs[1].style.display = 'block'
                }


                try{
                    zip.file("trp.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[2].href =  test
                            download_btns[2].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[2].style.display = 'block'
                }


                try{
                    zip.file("vtr.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[3].href =  test
                            download_btns[3].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[3].style.display = 'block'
                }


                try{
                    zip.file("other_reports.zip").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[4].href =  test
                            download_btns[4].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[4].style.display = 'block'
                }   
          

                try{
                    zip.file("st.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[5].href =  test
                            download_btns[5].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[5].style.display = 'block'
                }
                
                
                try{
                    zip.file("adv.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[6].href =  test
                            download_btns[6].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[6].style.display = 'block'
                }


                try{
                    zip.file("agd.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[7].href =  test
                            download_btns[7].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[7].style.display = 'block'
                }


                try{
                    zip.file("alc.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[8].href =  test
                            download_btns[8].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[8].style.display = 'block'
                }   
          

                try{
                    zip.file("presentation.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[9].href =  test
                            download_btns[9].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[9].style.display = 'block'
                }
                
                try{
                    zip.file("catalog.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[10].href =  test
                            download_btns[10].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[10].style.display = 'block'
                }


                try{
                    zip.file("other_docs.zip").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[11].href =  test
                            download_btns[11].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[11].style.display = 'block'
                }   
            
                })
            }
            else{
                for (let i = 1; i <= 11; i++)
                    notavailable_msgs[i].style.display = 'block'
            }
        }).catch(err =>  {
            console.log(`${err} : خطایی رخ داده`) 
        })

       
        //handling second phase documents
        response4 = fetcfile(token,managePhaseTwoDocsUrl+`${selected_post_id}`,"GET")
        response4.then( res=>{
            if(res.type==='application/x-zip-compressed'){
                //get the zip file from request and open its contents
                var myzp = new JSZip()
                myzp.loadAsync(res).then(function(zip) {
                    // read the phase one documents and create a download link for them

                try{
                    zip.file("p2_rec.jpeg").async("blob").then((file)=> {
                        fiel_url = URL.createObjectURL(file)
                        download_btns[12].href =  fiel_url
                        images_to_show[2].src = fiel_url
                        download_btns[12].style.display = 'flex'
                        img_preview_btns[2].style.display = 'flex'
                    })
                }catch(err){
                    notavailable_msgs[12].style.display = 'block'
                }


                try{
                    zip.file("vul_report.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[13].href =  test
                            download_btns[13].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[13].style.display = 'block'
                }


                try{
                    zip.file("func_report.docx").async("blob").then((file)=> {
                            test = URL.createObjectURL(file)
                            download_btns[14].href =  test
                            download_btns[14].style.display = 'flex'
                        })
                }catch{
                    notavailable_msgs[14].style.display = 'block'
                }


            
                })
            }
            else{
                for (let i = 12; i <= 14; i++)
                    notavailable_msgs[i].style.display = 'block'
            }
        }).catch(err =>  {
            console.log(`${err} : خطایی رخ داده`) 
        })
   
     

        //handling suppliment phase receipt photo
        response5 = fetcfile(token,manageSupplementDocsUrl+`${selected_post_id}`,"GET")
        response5.then( res=>{
            if(res.type==='image/jpeg'){
                const imageUrl = URL.createObjectURL(res)
                download_btns[15].href =  imageUrl
                download_btns[15].style.display = 'flex'
                img_preview_btns[3].style.display = 'flex'
                images_to_show[3].src = imageUrl
            }
            else
                notavailable_msgs[15].style.display = 'block'
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

/////////////////////////////////////////////////////////////////////////////////////////////////
//
function ContractEditHandler(event){
    event.preventDefault()
    form = event.target
    formFields = form.elements

    const body = {
        company_name: formFields.organ_name.value,
        product_name: formFields.product_name.value,
        date_of_contract: formFields.date.value,
        product_category: formFields.product_category.value,
        contract_number: formFields.contract_number_details3.value + '/' +
                        formFields.contract_number_details4.value + '/' +
                        formFields.contract_number_details2.value + '/'+
                        formFields.contract_number_details1.value ,
        contract_deadline_date: formFields.contract_deadline_date.value, 
        approved_discount: formFields.approved_discount.value,
        contract_total_price: formFields.contract_total_price.value, 
        certificate_renewal: formFields.certificate_renewal.value,
        certificate_renewal_description: (formFields.certificate_renewal.value == 'yes')? formFields.certificate_renewal_description.value: '', 


        landline_phone_number: formFields.landline_phone_number.value,
        interface_name: formFields.interface_name.value, 
        postal_code: formFields.postal_code.value,
        phone_number: formFields.phone_number.value, 
        address: formFields.address.value,


        first_phase_deposit_date: formFields.first_phase_deposit_date.value, 
        first_phase_price: formFields.first_phase_price.value, 
        first_phase_deadline_date: formFields.first_phase_deadline_date.value, 


        second_phase_deposit_date: formFields.second_phase_deposit_date.value,
        second_phase_price: formFields.second_phase_price.value, 
        second_phase_deadline_date: formFields.second_phase_deadline_date.value,

        supplement_price: formFields.supplement_price.value,
        supplement_date: formFields.supplement_date.value, 

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
        
        //sending files if they exist
        //Contract first page photo post request
        if (formFields.contract_first_page_photo.files[0]){
            var formData = new FormData()
            formData.append( 'photo', formFields.contract_first_page_photo.files[0], `${res.product_name}_contract_firtspage_photo.jpeg` )
            await postfile(formData,"PUT",manageContractPhotoUrl+`${selected_post_id}` )
        }

        //sending phase one files if they exist
        if (
            formFields.first_phase_receipt_photo.files[0] ||
            formFields.trp_document.files[0] ||
            formFields.vtr_document.files[0] ||
            formFields.other_reports.files[0] ||
            formFields.st_document.files[0] ||
            formFields.adv_document.files[0] ||
            formFields.agd_document.files[0] ||
            formFields.alc_document.files[0] ||
            formFields.product_info_document.files[0] ||
            formFields.catalog_document.files[0] ||
            formFields.other_documents.files[0]
        ){
            zip_response = fetcfile(token,managePhaseOneDocsUrl+`${selected_post_id}`,"GET")
            zip_response.then( async(res2)=>{
                //if there is nothing in it already
                if(res2.type=='application/json'){
                    var newzp = new JSZip()
                    if (formFields.first_phase_receipt_photo.files[0])
                        newzp.file('p1_rec.jpeg',formFields.first_phase_receipt_photo.files[0] )
                    
                    if (formFields.trp_document.files[0])
                        newzp.file('trp.docx',formFields.trp_document.files[0] )

                    if (formFields.vtr_document.files[0])
                        newzp.file('vtr.docx',formFields.vtr_document.files[0] )

                    if (formFields.other_reports.files[0])
                        newzp.file('other_reports.zip',formFields.other_reports.files[0] )

                    if (formFields.st_document.files[0])
                        newzp.file('st.docx',formFields.st_document.files[0] )
                    
                    if (formFields.adv_document.files[0])
                        newzp.file('adv.docx',formFields.adv_document.files[0] )

                    if (formFields.agd_document.files[0])
                        newzp.file('agd.docx',formFields.agd_document.files[0] )
                    
                    if (formFields.alc_document.files[0])
                        newzp.file('alc.docx',formFields.alc_document.files[0] )

                    if (formFields.product_info_document.files[0])
                        newzp.file('presentation.docx',formFields.product_info_document.files[0] )
                    
                    if (formFields.catalog_document.files[0])
                        newzp.file('catalog.docx',formFields.catalog_document.files[0] )

                    if (formFields.other_documents.files[0])
                        newzp.file('other_docs.zip',formFields.other_documents.files[0] )


                    //convert zip object to file object (.zip) and post the request
                    await newzp.generateAsync({ type: 'blob' }).then(async(blob) => {
                        newFile = new File([blob], `${res.product_name}_phase_one_docs.zip`, {
                        type: 'application/zip'
                        })

                        var formData = new FormData()
                        formData.append( 'documents', newFile )
                        formData.append( 'post_id', res.id )
                        await postfile(formData,"POST",managePhaseOneDocsUrl )
                    })
                    
                }

                //else:if there is a file associated with this contract get the zip file from request and open its contents for edit
                else{
                    var zp = new JSZip()
                    zp.loadAsync(res2).then(async (myzip) =>{
                        if (formFields.first_phase_receipt_photo.files[0])
                            myzip.file('p1_rec.jpeg',formFields.first_phase_receipt_photo.files[0] )
                        
                        if (formFields.trp_document.files[0])
                            myzip.file('trp.docx',formFields.trp_document.files[0] )

                        if (formFields.vtr_document.files[0])
                            myzip.file('vtr.docx',formFields.vtr_document.files[0] )

                        if (formFields.other_reports.files[0])
                            myzip.file('other_reports.zip',formFields.other_reports.files[0] )

                        if (formFields.st_document.files[0])
                            myzip.file('st.docx',formFields.st_document.files[0] )
                        
                        if (formFields.adv_document.files[0])
                            myzip.file('adv.docx',formFields.adv_document.files[0] )

                        if (formFields.agd_document.files[0])
                            myzip.file('agd.docx',formFields.agd_document.files[0] )
                        
                        if (formFields.alc_document.files[0])
                            myzip.file('alc.docx',formFields.alc_document.files[0] )

                        if (formFields.product_info_document.files[0])
                            myzip.file('presentation.docx',formFields.product_info_document.files[0] )
                        
                        if (formFields.catalog_document.files[0])
                            myzip.file('catalog.docx',formFields.catalog_document.files[0] )

                        if (formFields.other_documents.files[0])
                            myzip.file('other_docs.zip',formFields.other_documents.files[0] )


                        //convert zip object to file object (.zip) and post the request
                        await myzip.generateAsync({ type: 'blob' }).then(async(blob) => {
                            newFile = new File([blob], `${res.product_name}_phase_one_docs.zip`, {
                            type: 'application/zip'
                            })

                            var formData = new FormData()
                            formData.append( 'documents', newFile )
                            await postfile(formData,"PUT",managePhaseOneDocsUrl+`${selected_post_id}` )
                        })
                    })
                }
            })
        
        }

        //sending phase two files if they exist
        if (
            formFields.second_phase_receipt_photo.files[0] ||
            formFields.second_phase_vulnerability_document.files[0] ||
            formFields.second_phase_functional_document.files[0] 
        ){
            zip_response = fetcfile(token,managePhaseTwoDocsUrl+`${selected_post_id}`,"GET")
            zip_response.then( async(res3)=>{
                //if there is nothing in it already
                if(res3.type=='application/json'){
                    var newzp = new JSZip()
                    if (formFields.second_phase_receipt_photo.files[0])
                        newzp.file('p2_rec.jpeg',formFields.second_phase_receipt_photo.files[0] )

                    if (formFields.second_phase_vulnerability_document.files[0])
                        newzp.file('vul_report.docx',formFields.second_phase_vulnerability_document.files[0])

                    if (formFields.second_phase_functional_document.files[0])
                        newzp.file('func_report.docx',formFields.second_phase_functional_document.files[0] )
                    
                    //convert zip object to file object (.zip) and post the request
                    await newzp.generateAsync({ type: 'blob' }).then(async(blob) => {
                        newFile = new File([blob], `${res.product_name}_phase_two_docs.zip`, {
                        type: 'application/zip'
                        })

                        var formData = new FormData()
                        formData.append( 'documents', newFile )
                        formData.append( 'post_id', res.id )
                        await postfile(formData,"POST",managePhaseTwoDocsUrl)
                })
                }

                //else:if there is a file associated with this contract get the zip file from request and open its contents for edit
                else{
                    var zp = new JSZip()
                    zp.loadAsync(res3).then(async (myzip) =>{


                        if (formFields.second_phase_receipt_photo.files[0])
                            myzip.file('p2_rec.jpeg',formFields.second_phase_receipt_photo.files[0] )
                        
                        if (formFields.second_phase_vulnerability_document.files[0])
                            myzip.file('vul_report.docx',formFields.second_phase_vulnerability_document.files[0])

                        if (formFields.second_phase_functional_document.files[0])
                            myzip.file('func_report.docx',formFields.second_phase_functional_document.files[0] )
                        
                        //convert zip object to file object (.zip) and post the request
                        await myzip.generateAsync({ type: 'blob' }).then(async(blob) => {
                            newFile = new File([blob], `${res.product_name}_phase_two_docs.zip`, {
                            type: 'application/zip'
                            })

                            var formData = new FormData()
                            formData.append( 'documents', newFile )
                            await postfile(formData,"PUT",managePhaseTwoDocsUrl+`${selected_post_id}`)
                        })
                    })
                }
            })
        }

        //sending supplement photo if it exists
        if (formFields.supplement_receipt_photo.files[0] ){
            var formData = new FormData()
            formData.append( 'photo', formFields.supplement_receipt_photo.files[0], `${res.product_name}_supplement_receipt_photo.jpeg`  )
            response5 = await postfile(formData,"PUT",manageSupplementDocsUrl+`${selected_post_id}` )
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