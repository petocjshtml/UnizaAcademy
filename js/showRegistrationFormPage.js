function showRegistrationFormPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Registračný formulár";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">Študenský email</label>
                <input type="email" class="form-control" id="email" placeholder="Zadajte študenský email">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Prezývka</label>
                <input type="email" class="form-control" id="email" placeholder="Zadajte prezývku">
            </div>
            <div class="mb-3">
                <label for="heslo" class="form-label">Heslo</label>
                <input type="password" class="form-control" id="heslo" placeholder="Zadajte heslo">
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="zapamataj">
                <label class="form-check-label" for="zapamataj">Súhlasím s <a href="#">podmienkami používania</a> webstránky <b>Uniza Academy.</b></label>
            </div>
            <button type="submit" class="btn btn-danger">Odoslať</button>
        </form>
        </div>
    `;
    closeMenu();
}