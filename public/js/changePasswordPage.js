function changePasswordPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Zmena hesla";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form id="loginForm" onsubmit="changePassword(event)">
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

function changePassword(event) {
    event.preventDefault();
    const oldPassword = document.getElementById("current_password").value;
    const newPassword = document.getElementById("new_password").value;
    const userFromLs = getUserFromLS(), jsonData = { oldPassword, newPassword };
    putDataLoggedIn(userFromLs.id, jsonData, "/change-password", userFromLs.token).then(response => {
        if(response.success)
        {
            alert("Heslo bolo úspešne zmenené!");
            showMainPage();
        }
        else { message("changePasswordFormMessage", response.message); }
    })
    .catch(error => {
        console.error('Error:', error);
        message("changePasswordFormMessage", error.message);
    });
}