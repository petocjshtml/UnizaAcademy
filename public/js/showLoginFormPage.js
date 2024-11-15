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
                <input type="email" name="email" class="form-control" id="email" minlength="3" maxlength="50" placeholder="Zadajte študenský email">
            </div>
            <div class="mb-3">
                <label for="heslo" class="form-label">Heslo &nbsp;&nbsp;&nbsp; <span id="loginFormPasswordMessage" style="color:#f37429;"></span></label>
                <input type="password" name="password" class="form-control" minlength="8" maxlength="20" id="heslo" placeholder="Zadajte heslo">
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
    message("loginFormEmailMessage", "") ;
    message("loginFormPasswordMessage", "") ;
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData);
    if(!isEmailInUnizaFormat(dataObject.email))
    {
      return message("loginFormEmailMessage", "Email neexistuje !");
    }
    showLoading("loginLoadingElement");
    postData(dataObject, "/loginUser").then(response => {
        if(response.success)
        {
            ulozitDoLocalStorage("user", response.user);
            vymazatZLocalStorage("filterNoAdmin");
            vymazatZLocalStorage("filterStatus");
            vymazatZLocalStorage("filter");
            showMainPage();
        }
        else
        {
            response.message.includes("mail") 
                ? message("loginFormEmailMessage", response.message) 
                : message("loginFormPasswordMessage", response.message);
            hideLoading("loginLoadingElement");
        }
    })
    .catch(error => {console.error("There was problem:", error);}); 
}


