function changeEmailPage(userFromLS)
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    const userEmail = userFromLS.email;
    const userJwtToken = userFromLS.jwt_token;
    
    page_info.innerHTML="Zmena emailu";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form id="loginForm" onsubmit="changeEmail(event)">
            <div class="mb-3">
                <label for="email" class="form-label">Zadajte nový email &nbsp;&nbsp;&nbsp; <span id="changeEmailFormMessage" style="color:#f37429;"></span></label>
                <input type="email" name="email" placeholder="${userEmail}"  class="form-control">
            </div>
            <button type="submit" class="btn btn-danger">Zmeniť email</button>
            <img id="emailLoadingElement" src="images/loading.gif" alt="Loading" style="width: 30px; margin-left: 10px; display:none;">
        </form>
        </div>
    `;
    closeMenu();
    enableFooter(false);
}

function changeEmail(event) {
    event.preventDefault();
}