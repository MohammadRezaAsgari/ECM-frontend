const editUserForm = document.getElementById('edit-user-form')
const createUserForm = document.getElementById('create-user-form')
const logOutBtn = document.getElementById('logout-btn')
const userNameInput = document.getElementById('user-details-1')
let token = readCookie('token')

res = fetchUrl(token,getUsernameUrl,'GET')
res.then(result=>{
    userNameInput.value = result.username
})

check_admin_res = fetchUrl(token,isAdminUrl,'GET')
check_admin_res.then(result=>{
    if(result.access)
    createUserForm.style.display = 'block'
})


function editUserHandler(e){
    e.preventDefault()
    form = e.target
    formFields = form.elements

    user_name = formFields.user_name.value
    current_pass = formFields.current_pass.value
    new_pass = formFields.new_pass.value
    repeat_new_pass = formFields.repeat_new_pass.value 
    
    if(!new_pass && !repeat_new_pass){
        let body = {
            username: user_name,
            password: current_pass
        }

        change_username_response =  postData(body,"POST",changeUsernameUrl )
        change_username_response.then(result => {
            if(result.error){
                myAlert(result.status,false)
                return
            }
            myAlert(result.status,true)
            setTimeout(function() {location.reload()}, 2000)
            return
            })
    }
    if(new_pass && !repeat_new_pass){
        myAlert('!لطفا تکرار رمز عبور جدید خود را وارد کنید', false)
        return
    }
    if(!new_pass && repeat_new_pass){
        myAlert('!لطفا رمز عبور جدید خود را وارد کنید', false)
        return
    }
    if(new_pass!==repeat_new_pass){
        myAlert('!رمز عبور جدید و تکرار آن یکسان نیستند',false)
        return
    }
    if(new_pass===current_pass){
        myAlert('!رمز عبور جدید باید متفاوت باشد',false)
        return
    }

    if(user_name&&current_pass&&new_pass&&repeat_new_pass){    
    let body1 = {
        username: user_name,
        password: current_pass,
        new_password: new_pass
    }

    change_user_and_pass_response =  postData(body1,"POST",changeUsernameAndPasswordUrl )
    change_user_and_pass_response.then(result => {
        if(result.error){
            myAlert(result.status,false)
            return
        }
        myAlert(result.status,true)
        setTimeout(function() {location.reload()}, 2000)
        return
        })}
}


function crateUserHandler(e){
    e.preventDefault()
    form = e.target
    formFields = form.elements

    user_name = formFields.user_name.value
    pass = formFields.pass.value
    repeat_pass = formFields.repeat_pass.value 
    is_admin = formFields.is_admin.checked 
    

    if(pass!==repeat_pass){
        myAlert('!رمز عبور و تکرار آن یکسان نیستند',false)
        return
    }


    let body = {
        username: user_name,
        password: pass,
        isAdmin: is_admin
    }

    create_user_response =  postData(body,"POST",createUserUrl )
    create_user_response.then(result => {
        if(result.error){
            myAlert(result.status,false)
            return
        }
        myAlert(result.status,true)
        setTimeout(function() {location.reload()}, 2000)
        return
        })

}

editUserForm.addEventListener('submit', editUserHandler)
createUserForm.addEventListener('submit',crateUserHandler)


logOutBtn.addEventListener('click', (e)=> {
    eraseCookie('token')
    window.location.href = "index"
})