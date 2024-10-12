function showRegistrationFormPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Registračný formulár";
    root.innerHTML=`
        <div class="container mt-5 card">
        <div id="registrationFormMessage" style="color:red;"></div>
        <form id="registrationForm" onsubmit="registerUser(event)">
            <div class="mb-3">
                <label for="email" class="form-label">Študenský email</label>
                <input type="email" value="branomrkvicka@stud.uniza.sk" name="email" class="form-control" minlength="3" maxlength="50" placeholder="Zadajte študenský email" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Prezývka</label>
                <input type="text" value="branoMrkva" name="nickName" class="form-control" minlength="4" maxlength="12"  placeholder="Zadajte prezývku" required>
            </div>
            <div class="mb-3">
                <label for="heslo" class="form-label">Heslo</label>
                <input type="password" value="MrkvaBrano123" name="password" class="form-control" minlength="8" maxlength="20"  placeholder="Zadajte heslo" required>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" required>
                ${getUserAgreementModalCode()}
            </div>
            <button type="submit" class="btn btn-danger">Odoslať</button>
            <img id="registrationLoadingElement" src="images/loading.gif" alt="Loading" style="width: 30px; margin-left: 10px; display:none;">
        </form>
        </div>
    `;
    closeMenu();
    enableFooter(false);
}

function registerUser(event){
    event.preventDefault();
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData);
    dataObject.isAdmin = false;
    if(isDataCorrect(dataObject))
    {
        showRegistrationLoadingIcon();
        postData(dataObject, "/registerUser").then(response => {
            console.log('response:', response);
            if(response.success)
            {
                showLoginFormPage();
            }
            else
            {
                registrationFormMessage(response.message);
                hideRegistrationLoadingIcon();
            }
        })
        .catch(error => {console.error("There was problem:", error);}); 
    }
    console.log('Form Data as Object:', dataObject);
}

function registrationFormMessage(message)
{
    document.getElementById("registrationFormMessage").innerHTML=message;
}

function isDataCorrect(dataObject){
    if(!isEmailInUnizaFormat(dataObject.email))
    {
        registrationFormMessage("You need to use Uniza registered email !");
        return false;
    }
    
    return true;
}

function isEmailInUnizaFormat(email) {
    let stringArray = ["@stud.uniza.sk","@fel.uniza.sk"];
    for (let str of stringArray) {
       if (email.includes(str)) {
          return true;
       }
    }
    return false;
}
 

function showRegistrationLoadingIcon() {
    document.getElementById("registrationLoadingElement").style.display="revert";    
}

function hideRegistrationLoadingIcon() {
    document.getElementById("registrationLoadingElement").style.display="none";    
}

function getUserAgreementModalCode() {
    return `
        <!-- Modal -->
        <label class="form-check-label" for="zapamataj">Súhlasím s 
        <a href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">podmienkami používania</a> 
        webstránky <b>Uniza Academy.</b></label>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-kmikt-blue">
            <div class="modal-header">
                <h5 class="modal-title" style="color:white;" id="staticBackdropLabel">Podmienky používania Uniza Academy</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="color:white;">
                1. Ak máte návrh na zdielanie nového videa na stránke, kontaktujte správcu. <br>
                2. Neprihlásení používatelia nevidia všetky videá, iba tie verejné. <br>
                3. Vytvorenie konta je možné iba študentom Žilinskej Univerzity. <br>
                4. Vedlajšie informácie o videu (počet zhliadnutí, počet likov) 
                nemusia byť vždy aktuálne, dáta sa ukladajú spolu s dátumom vloženia videa na stránku. <br>
                5. V prípade nejasnosti a ďalšej potreby kontaktujte administrátora stránky.

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Rozumiem</button>
            </div>
            </div>
        </div>
        </div>
    `;
}