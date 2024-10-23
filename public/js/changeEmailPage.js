function changeEmailPage(userFromLS)
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    const userEmail = userFromLS.email;
    const userJwtToken = userFromLS.jwt_token;
    
    page_info.innerHTML="Zmena emailu";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form id="loginForm" onsubmit="changeEmail(event,'${userJwtToken}')">
            <div class="mb-3">
                <label for="email" class="form-label">Zadajte nový email &nbsp;&nbsp;&nbsp; <span id="changeEmailFormMessage" style="color:#f37429;"></span></label>
                <input type="email" name="email" value="${userEmail}" id="email" minlength="3" maxlength="50" placeholder="${userEmail}" class="form-control">
            </div>
            <button type="submit" class="btn btn-danger">Zmeniť email</button>
            <img id="emailLoadingElement" src="images/loading.gif" alt="Loading" style="width: 30px; margin-left: 10px; display:none;">
        </form>
        </div>
    `;
    closeMenu();
    enableFooter(false);
}

function changeEmail(event,jwtToken) {
    event.preventDefault();
    const email = document.getElementById("email").value;

    if(isNewEmailCorrect(email))
    {
        const jsonData = {
            newEmail:email,
        }
 
        postDataLoggedIn(jsonData, "/change-email", jwtToken).then(response => {
            if(response.success)
            {
                alert("Email bol úspešne zmenený!");
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
                changeEmailMessage(response.message);
            } 
        })
        .catch(error => {
            console.error('Error:', error);
            changeEmailMessage(error.message);
        });
    }
}

function changeEmailMessage(message)
{
    document.getElementById("changeEmailFormMessage").innerHTML=message;
}

function isNewEmailCorrect(newEmail){
    if(!isEmailInUnizaFormat(newEmail))
    {
        changeEmailMessage("Zadaný email nieje registrovaný na Žilinskej Univerzite !");
        return false;
    }
    return true;
}

