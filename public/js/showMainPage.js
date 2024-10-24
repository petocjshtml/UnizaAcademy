function showMainPage()
{
    isUserLoggedIn() ? showHeaderForLoggedInUser(getUserFromLS()) : showHeader();
    //const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    //page_info.innerHTML="Uniza Academy";
    // Uniza Academy
    root.innerHTML=
    `
    ${getImproveYourSkillsHtml()}
    ${getFiveBenefitsOfElectronicLearningVideoHtml()}
    ${getAllStudyFieldsHtml()}
    ${getYoutubeTeamWorkHtml()}
    ${getFiveBenefitsOfVideoLearningHtml()}
    `;
    closeMenu();
    enableFooter(true);
}

function showHeader()
{
    const header = document.getElementById("header");
    header.innerHTML= `
    <nav class="navbar navbar-expand-lg navbar-dark bg-kmikt-blue fs-5 ">
    <div class="container-fluid">
      <a class="navbar-brand" onclick="showMainPage()" href="#"><img src="images/logo.svg" style="width:380px;" alt="uniza logo" ></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active text-white ms-3 " aria-current="page" onclick="showAboutUsPage()" href="#">O nás</a>
          <a class="nav-link active text-white ms-3 " aria-current="page" onclick="showVideoTutorialsPage()" href="#">Videotutoriály</a>

        </div>
        <!-- Položky napravo -->
        <div class="navbar-nav ms-auto">
          <a class="nav-link active text-white ms-3 " href="#" onclick="showLoginFormPage()" tabindex="-1" aria-disabled="true">Prihlásenie</a>
          <a class="nav-link active text-white ms-3 " href="#" onclick="showRegistrationFormPage()" tabindex="-1" aria-disabled="true">Registrácia</a>
        </div>
      </div>
    </div>
  </nav>

  <div id="page-info" class="fs-1 text-center text-white bg-feit-orange">
      Uniza Academy
  </div>
  `;
}

function showHeaderForLoggedInUser(userFromLS)
{
    const header = document.getElementById("header");
    const isAdmin = userFromLS.is_admin;
    const email = userFromLS.email;
    const nickname = isAdmin ? userFromLS.nickname + " (admin)" : userFromLS.nickname;
    // Podmienky pre výber správnych názvov v závislosti od toho, či sa jedná o bežného používateľa alebo o administrátora
    const videoTutorialsOnclick = isAdmin ? "showAdminVideoTutorialsPage()" : "showUserVideoTutorialsPage()";
    header.innerHTML= `
    <nav class="navbar navbar-expand-lg navbar-dark bg-kmikt-blue fs-5 ">
    <div class="container-fluid">
      <a class="navbar-brand" onclick="showMainPage()" href="#"><img src="images/logo.svg" style="width:380px;" alt="uniza logo" ></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link active text-white ms-3 " aria-current="page" onclick="showAboutUsPage()" href="#">O nás</a>
          <a class="nav-link active text-white ms-3 " aria-current="page" onclick="${videoTutorialsOnclick}" href="#">Videotutoriály</a>
        </div>
        <!-- Položky napravo -->
        <div class="navbar-nav ms-auto">
         <!-- Dropdown pre profil -->
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active text-white ms-3" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${nickname}
            </a>
            <ul class="dropdown-menu dropdown-menu-end bg-kmikt-blue" aria-labelledby="profileDropdown">
              <li><a class="dropdown-item text-white no-hover"  href="#" style="background-color: transparent; color: inherit; pointer-events: none;">
              Zmeniť používateľské údaje
              </a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-white" onclick='changeNickNamePage(${JSON.stringify(userFromLS)})' href="#">Zmena prezývky</a></li>
              <li><a class="dropdown-item text-white" onclick='changeEmailPage(${JSON.stringify(userFromLS)})' href="#">Zmena emailu</a></li>
              <li><a class="dropdown-item text-white" onclick='changePasswordPage(${JSON.stringify(userFromLS)})' href="#">Zmena hesla</a></li>
            </ul>
          </div>
          <a class="nav-link active text-white ms-3 " href="#" onclick="logOutUser()" tabindex="-1" aria-disabled="true">Odhlásiť sa</a>
        </div>
      </div>
    </div>
  </nav>

  <div id="page-info" class="fs-1 text-center text-white bg-feit-orange">
    Uniza Academy
  </div>
  `;
}

function logOutUser(){
  vymazatZLocalStorage("user");
  showMainPage();
}


function getImproveYourSkillsHtml()
{
    return`
    <div class="container my-5 card">
        <div class="row align-items-center">
            <div class="col-md-6 order-1 order-md-2 text-center">
              <img src="images/programming.svg" alt="Uniza Academy" class="img-fluid mb-4">
            </div>
            <div class="col-md-6 order-2 order-md-1">
              <h1 class="display-5 fw-bold py-1">Zlepši svoje zručnosti prezeraním videotutoriálov !</h1>
              <p class="lead">V dnešnom svete digitálnych technológií je dôležité neustále rozširovať
                svoje znalosti a zručnosti. Na Uniza Academy ti prinášame kvalitné videotutoriály,
                  ktoré ti pomôžu ľahko a efektívne sa naučiť nové veci.
                  Či už si začiatočník alebo pokročilý študent, naše tutoriály ti 
                  umožnia získať praktické vedomosti v rôznych oblastiach. Sleduj ich 
                  vlastným tempom, v pohodlí svojho domova a posuň sa bližšie k svojim študijným cieľom!
              </p>
            </div>
        </div>
    </div>
    `;
}

function getFiveBenefitsOfElectronicLearningVideoHtml()
{
    return`
    <div class="container my-5 card">
        <iframe style="width:100%;aspect-ratio:16/9;" src="https://www.youtube.com/embed/1SZle1skb84?si=AKNJSCWu0YUer98a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>    
    </div>
    `;
}

function getAllStudyFieldsHtml()
{
    return`
    <div class="container my-5 card">
        <h1 class="display-5 fw-bold mb-5 text-center">Túto sekciu nahradiť niečim iným probably</h1>
        <div class="row text-center justify-content-center mt-4">
            <div class="col-md-4 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_odborov/feit/web_automatizacia@4x.png" alt="Automatizácia" class="icon-circle">
                <div class="icon-text fs-4">Automatizácia</div>
            </div>
            <div class="col-md-4 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_odborov/feit/web_biomedicineske_inzinierstvo@4x.png" alt="Biomedicínske inžinierstvo" class="icon-circle">
                <div class="icon-text fs-4">Biomedicínske inžinierstvo</div>
            </div>
            <div class="col-md-4 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_odborov/feit/web_elektrotechnika@4x.png" alt="Elektrotechnika" class="icon-circle">
                <div class="icon-text fs-4">Elektrotechnika</div>
            </div>
            <div class="col-md-4 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_odborov/feit/web_multimedialne_technologie@4x.png" alt="Multimediálne technológie" class="icon-circle">
                <div class="icon-text fs-4">Multimediálne technológie</div>
            </div>
            <div class="col-md-4 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_odborov/feit/web_optoelektronika@4x.png" alt="Elektrooptika" class="icon-circle">
                <div class="icon-text fs-4">Elektrooptika</div>
            </div>
            <div class="col-md-4 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_odborov/feit/web_telekomunikacie@4x.png" alt="Komunikačné a informačné technológie" class="icon-circle">
                <div class="icon-text fs-4">Komunikačné a informačné technológie</div>
            </div>
        </div>
    </div>
    `;
}

function getYoutubeTeamWorkHtml()
{
    return`
    <div class="container my-5 card">
          <div class="row align-items-center">
              <div class="col-md-6 order-1 order-md-1 text-center">
                  <img src="images/video-icon.svg" alt="Uniza Academy" class="img-fluid mb-4">
              </div>
              <div class="col-md-6 order-2 order-md-2">
                 <h1 class="display-5 fw-bold py-1">YouTube ako úložisko pre naše videá</h1>
                  <p class="lead">
                    Uniza Academy využíva YouTube ako spoľahlivé cloudové úložisko pre naše videotutoriály,
                    ktoré nám poskytuje výhodu rýchleho a efektívneho prenosu dát a zaručuje plynulé prehrávanie
                    videí pre študentov bez ohľadu na ich polohu či zariadenie. Vďaka jeho distribuovanej
                    infraštruktúre môžeme zabezpečiť okamžitú dostupnosť obsahu s vysokou kvalitou, k čomu
                    taktiež prispieva zabudovaná funkcionalita adaptívneho streamingu. Tento prístup nám 
                    umožňuje plne sa sústrediť na tvorbu vzdelávacieho obsahu, zatiaľ čo YouTube sa stará 
                    o jeho efektívne zdielanie.
                  </p>
              </div>
          </div>
    </div>
    `;
}

function getFiveBenefitsOfVideoLearningHtml()
{
    return`
    <div class="container my-5 card">
         <iframe style="width:100%;aspect-ratio:16/9;" src="https://www.youtube.com/embed/Y1zCYzmvQmI?si=Jyj67PKZJHgw8KeK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    `;
}

//pri rozbalenom navbare pri malom rozlíšení rozbalené menu opäť zavrie
function closeMenu() {
  if (window.matchMedia("(max-width: 991.98px)").matches) {
    var navbarCollapse = document.getElementById('navbarNavAltMarkup');
    
    // Skontroluj, či je menu otvorené (má triedu 'show')
    if (navbarCollapse.classList.contains('show')) {
      var bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  }
}