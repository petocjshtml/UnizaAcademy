function showLoginFormPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Prihlasovací formulár";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form id="loginForm" onsubmit="loginUser(event)">
            <div class="mb-3">
                <label for="email" class="form-label">Študenský email &nbsp;&nbsp;&nbsp; <span id="loginFormEmailMessage" style="color:#f37429;"></span></label>
                <input type="email" name="email" value="branomrkvicka123@stud.uniza.sk" class="form-control" id="email" minlength="3" maxlength="50" placeholder="Zadajte študenský email">
            </div>
            <div class="mb-3">
                <label for="heslo" class="form-label">Heslo &nbsp;&nbsp;&nbsp; <span id="loginFormPasswordMessage" style="color:#f37429;"></span></label>
                <input type="password" name="password" value="MrkvaBrano123" class="form-control" minlength="8" maxlength="20" id="heslo" placeholder="Zadajte heslo">
            </div>
             <h5 class="mb-4">
             Nemáte u nás konto?  
             <a class="navbar-brand" href="#" onclick="showRegistrationFormPage()">Zaregistrujte sa ! </a>
             </h5>
            <button type="submit" class="btn btn-danger">Prihlásiť sa</button>
            <img id="loginLoadingElement" src="images/loading.gif" alt="Loading" style="width: 30px; margin-left: 10px; display:none;">
        </form>
        </div>
    `;
    closeMenu();
    enableFooter(false);
}

function loginUser(event) {
    event.preventDefault();
    loginFormEmailMessage("");
    loginFormPasswordMessage("");
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData);
    if(!isEmailInUnizaFormat(dataObject.email))
    {
      return loginFormEmailMessage("Email neexistuje !");
    }
    //fetch api
    showLoginLoadingIcon();
    postData(dataObject, "/loginUser").then(response => {
        
        if(response.success)
        {
            //tuna zahrnúť logiku úspešného prihlásenia
            console.log('response:', response);
            const userInfo = {
                id: response.user.id,
                nickname: response.user.nickName,
                email: response.user.email,
                jwt_token: response.token,
                is_admin: response.user.isAdmin,
            };
            ulozitDoLocalStorage("user", userInfo);
            showMainPage();
        }
        else
        {
            if(response.message.includes("mail"))
            {
                loginFormEmailMessage(response.message);
                hideLoginLoadingIcon();
            }
            else
            {
                loginFormPasswordMessage(response.message);
                hideLoginLoadingIcon();  
            }
        }
    })
    .catch(error => {console.error("There was problem:", error);}); 
   // console.log("logindata", dataObject);
}

function showLoginLoadingIcon() {
    document.getElementById("loginLoadingElement").style.display="revert";    
}

function hideLoginLoadingIcon() {
    document.getElementById("loginLoadingElement").style.display="none";    
}

function loginFormEmailMessage(message)
{
    document.getElementById("loginFormEmailMessage").innerHTML=message;
}

function loginFormPasswordMessage(message)
{
    document.getElementById("loginFormPasswordMessage").innerHTML=message;
}