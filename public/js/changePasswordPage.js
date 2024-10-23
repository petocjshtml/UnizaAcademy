function changePasswordPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Zmena hesla";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form id="loginForm" onsubmit="changeEmail(event)">
            <div class="mb-3">
                <label for="current_password" class="form-label">Zadajte aktuálne heslo &nbsp;&nbsp;&nbsp; <span id="changePasswordFormMessage" style="color:#f37429;"></span></label>
                <input type="password" name="current_password" class="form-control">
            </div>
            <div class="mb-3">
                <label for="new_password" class="form-label">Zadajte nové heslo</label>
                <input type="password" name="new_password" class="form-control">
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
}