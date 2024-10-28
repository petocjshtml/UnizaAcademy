function changeNickNamePage(userFromLS)
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    const userNick = userFromLS.nickName;
    page_info.innerHTML="Zmena prezývky";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form id="loginForm" onsubmit="changeNickName(event)">
            <div class="mb-3">
                <label for="prezyvka" class="form-label">Zadajte novú prezývku &nbsp;&nbsp;&nbsp; <span id="changeNickNameFormMessage" style="color:#f37429;"></span></label>
                <input type="text" id="prezyvka" name="prezyvka" value="${userNick}" minlength="4" maxlength="12"  class="form-control">
            </div>
            <button type="submit" class="btn btn-danger">Zmeniť prezývku</button>
            <img id="prezyvkaLoadingElement" src="images/loading.gif" alt="Loading" style="width: 30px; margin-left: 10px; display:none;">
        </form>
        </div>
    `;
    closeMenu();
    enableFooter(false);
}

function changeNickName(event) {
    event.preventDefault();
    const newNickName = document.getElementById("prezyvka").value, userFromLs = getUserFromLS(), 
    jsonData = { newNickName }; if(newNickName.length === 0){ return false; }
    putDataLoggedIn(userFromLs.id, jsonData, "/change-nickname", userFromLs.token).then(response => {
        if(response.success)
        {
            userFromLs.nickName = response.user.nickName;
            ulozitDoLocalStorage("user", userFromLs);
            showMainPage();
        }
        else { message("changeNickNameFormMessage",response.message); }
    })
    .catch(error => {
        console.error('Error:', error);
        message("changeNickNameFormMessage",error.message);
    });
}


