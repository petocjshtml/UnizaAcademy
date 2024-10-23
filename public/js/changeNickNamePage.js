function changeNickNamePage(userFromLS)
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    const userNick = userFromLS.nickname;
    const userJwtToken = userFromLS.jwt_token;

    page_info.innerHTML="Zmena prezývky";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form id="loginForm" onsubmit="changeNickName(event,'${userJwtToken}')">
            <div class="mb-3">
                <label for="prezyvka" class="form-label">Zadajte novú prezývku &nbsp;&nbsp;&nbsp; <span id="changeNickNameFormMessage" style="color:#f37429;"></span></label>
                <input type="text" id="prezyvka" name="prezyvka" placeholder="${userNick}" minlength="4" maxlength="12"  class="form-control">
            </div>
            <button type="submit" class="btn btn-danger">Zmeniť prezývku</button>
            <img id="prezyvkaLoadingElement" src="images/loading.gif" alt="Loading" style="width: 30px; margin-left: 10px; display:none;">
        </form>
        </div>
    `;
    closeMenu();
    enableFooter(false);
}

function changeNickName(event,jwtToken) {
    event.preventDefault();
    const newName = document.getElementById("prezyvka").value;
    const jsonData = {
        newNickName:newName,
    }
    postDataLoggedIn(jsonData, "/change-nickname", jwtToken).then(response => {
        console.log(response);
        if(response.success)
        {
            alert("Prezývka bola úspešne zmenená!");
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
            changeNickNameMessage(response.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        changeNickNameMessage(error.message);
    });
}

function changeNickNameMessage(message)
{
    document.getElementById("changeNickNameFormMessage").innerHTML=message;
}