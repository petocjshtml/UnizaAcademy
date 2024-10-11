function showLoginFormPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Prihlasovací formulár";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">Študenský email</label>
                <input type="email" class="form-control" id="email" placeholder="Zadajte študenský email">
            </div>
            <div class="mb-3">
                <label for="heslo" class="form-label">Heslo</label>
                <input type="password" class="form-control" id="heslo" placeholder="Zadajte heslo">
            </div>
             <h5 class="mb-4">
             Nemáte u nás konto?  
             <a class="navbar-brand" href="#" onclick="showRegistrationFormPage()">Zaregistrujte sa ! </a>
             </h5>
            <button type="submit" onclick="showLoginLoadingIcon()" class="btn btn-danger">Prihlásiť sa</button>
            <img id="loginLoadingElement" src="images/loading.gif" alt="Loading" style="width: 30px; margin-left: 10px; display:none;">
        </form>
        </div>
    `;
    closeMenu();
    enableFooter(false);
}

function showLoginLoadingIcon() {
    document.getElementById("loginLoadingElement").style.display="revert";    
}

function hideLoginLoadingIcon() {
    document.getElementById("loginLoadingElement").style.display="none";    
}