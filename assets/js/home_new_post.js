newPostForm.addEventListener('submit',CreatePostHandler)

function CreatePostHandler(e){
    e.preventDefault()
    form = e.target
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
        

        //sending files if they exist
        //Contract first page photo post request
        if (formFields.contract_first_page_photo.files[0]){
            var formData = new FormData()
            formData.append( 'photo', formFields.contract_first_page_photo.files[0], `${res.product_name}_contract_firtspage_photo.jpeg` )
            formData.append( 'post_id', res.id )
            response2 = await postfile(formData,"POST",manageContractPhotoUrl )
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
            let myzip = new JSZip()

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
                formData.append( 'post_id', res.id )
                await postfile(formData,"POST",managePhaseOneDocsUrl )
              })

        }

        //sending phase two files if they exist
        if (
            formFields.second_phase_receipt_photo.files[0] ||
            formFields.second_phase_vulnerability_document.files[0] ||
            formFields.second_phase_functional_document.files[0] 
        ){
            let myzip = new JSZip()

            if (formFields.second_phase_receipt_photo.files[0])
                myzip.file('p2_rec.jpeg',formFields.second_phase_receipt_photo.files[0] )
            
            if (formFields.second_phase_vulnerability_document.files[0])
                myzip.file('func_report.docx',formFields.second_phase_vulnerability_document.files[0])

            if (formFields.second_phase_functional_document.files[0])
                myzip.file('vul_report.docx',formFields.second_phase_functional_document.files[0] )
            
            //convert zip object to file object (.zip) and post the request
            await myzip.generateAsync({ type: 'blob' }).then(async(blob) => {
                newFile = new File([blob], `${res.product_name}_phase_two_docs.zip`, {
                  type: 'application/zip'
                })

                var formData = new FormData()
                formData.append( 'documents', newFile )
                formData.append( 'post_id', res.id )
                await postfile(formData,"POST",managePhaseTwoDocsUrl )
              })

            }

        //sending supplement photo if it exists
        if (formFields.supplement_receipt_photo.files[0] ){
            var formData = new FormData()
            formData.append( 'photo', formFields.supplement_receipt_photo.files[0], `${res.product_name}_supplement_receipt_photo.jpeg`  )
            formData.append( 'post_id', res.id )
            response5 = await postfile(formData,"POST",manageSupplementDocsUrl )
        }

        myAlert('قرارداد با موفقیت اضافه شد.',true)
        setTimeout(function() {
            toggleWindowOpacity('1',false)
            newPostForm.style.display = 'none'
            location.reload()
        }, 1000)


      }
      )



}