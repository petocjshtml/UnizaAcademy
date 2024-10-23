function changePasswordPage(userFromLS)
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    const userEmail = userFromLS.email;
    const userJwtToken = userFromLS.jwt_token;
    
    page_info.innerHTML="Zmena hesla";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form id="loginForm" onsubmit="changePassword(event,'${userJwtToken}')">
            <div class="mb-3">
                <label for="current_password" class="form-label">Zadajte aktuálne heslo &nbsp;&nbsp;&nbsp; <span id="changePasswordFormMessage" style="color:#f37429;"></span></label>
                <input type="password" id="current_password" name="current_password" minlength="8" maxlength="20" class="form-control">
            </div>
            <div class="mb-3">
                <label for="new_password" class="form-label">Zadajte nové heslo</label>
                <input type="password" id="new_password" name="new_password" minlength="8" maxlength="20" class="form-control">
            </div>
            <button type="submit" class="btn btn-danger">Zmeniť heslo</button>
            <img id="passwordLoadingElement" src="images/loading.gif" alt="Loading" style="width: 30px; margin-left: 10px; display:none;">
        </form>
        </div>
    `;
    closeMenu();
    enableFooter(false);
}

function changePasswordMessage(message)
{
    document.getElementById("changePasswordFormMessage").innerHTML=message;
}

function changePassword(event,jwtToken) {
    event.preventDefault();
    const old_password = document.getElementById("current_password").value;
    const new_password = document.getElementById("new_password").value;
    const jsonData = {
        oldPassword:old_password,
        newPassword:new_password,
    }
    postDataLoggedIn(jsonData, "/change-password", jwtToken).then(response => {
        if(response.success)
        {
            alert("Heslo bolo úspešne zmenené!");
            const userInfo = {
                nickname: response.user.nickName,
                email: response.user.email,
                jwt_token: jwtToken,
                is_admin: response.user.isAdmin,
            };
            ulozitDoLocalStorage("user", userInfo);
            showMainPage();
        }
        else
        {
            changePasswordMessage(response.message);
        } 
    })
    .catch(error => {
        console.error('Error:', error);
        changePasswordMessage(error.message);
    });
}