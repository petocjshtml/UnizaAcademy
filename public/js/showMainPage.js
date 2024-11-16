function showMainPage()
{
    isUserLoggedIn() ? showHeaderForLoggedInUser(getUserFromLS()) : showHeader();
    const root = document.getElementById("root");
    root.innerHTML=
    `
    ${getImproveYourSkillsHtml()}
    ${eLearningHtml()}
    ${getAllStudyFieldsHtml()} 
    ${getYoutubeTeamWorkHtml()}
    ${getFiveBenefitsOfVideoLearningHtml()}
    `;
    closeMenu();
    enableFooter(true);
    loadStudySubjects();
}

function setUpStudySubjectsToContainer(studySubjects){
  const container = document.getElementById("studyFieldsContainer");
  var html = "";
  studySubjects.forEach(studySubject => {
    html += `
    <div class="col-md-4 col-sm-6 col-6 mb-5">
        <img src="images/mt_subject_videotutorial.png" alt="${studySubject}" class="icon-circle">
        <div class="icon-text fs-4">${studySubject}</div>
    </div>
    `;
  });
  if(container)
  {
    container.innerHTML = html;
  }
}

function loadStudySubjects()
{
    const endpoint_url = "/getObjects";
    getData(endpoint_url).then(response => {
        const studySubjects = response.studySubjects.map((subject) => subject.studySubjectName);
        setUpStudySubjectsToContainer(studySubjects);
    })
    .catch(error => { console.error('Error:', error); });
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
    const isAdmin = userFromLS.isAdmin;
    const nickName = userFromLS.nickName;
    const videoTutorialsOnclick = isAdmin ? "showAdminVideoTutorialsPage()" : "showVideoTutorialsPage()";
    const menuItemName = isAdmin ? "Správa videotutoriálov" : "Videotutoriály";
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
          <a class="nav-link active text-white ms-3 " aria-current="page" onclick="${videoTutorialsOnclick}" href="#">${menuItemName}</a>
        </div>
        <!-- Položky napravo -->
        <div class="navbar-nav ms-auto">
         <!-- Dropdown pre profil -->
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle active text-white ms-3" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              ${nickName}
            </a>
            <ul class="dropdown-menu dropdown-menu-end bg-kmikt-blue" aria-labelledby="profileDropdown">
              <li><a class="dropdown-item text-white" onclick='changeNickNamePage(${JSON.stringify(userFromLS)})' href="#">Zmena prezývky</a></li>
              <li><a class="dropdown-item text-white" onclick='changePasswordPage()' href="#">Zmena hesla</a></li>
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

function eLearningHtml()
{
    return `
    <div class="container my-5 card">
        <video id="eLearning" style="width:100%;aspect-ratio:16/9;" controls>
            <source src="videos/eLearning.mp4" type="video/mp4">
            Váš prehliadač nepodporuje prehrávanie videa.
        </video>
    </div>
    `;
}

function setUpVideoStartTime(id,time)
{
    const video = document.getElementById(id);
    video.currentTime = time; 
}

function getAllStudyFieldsHtml()
{
    return`
    <div class="container my-5 card">
        <h1 class="display-5 fw-bold mb-5 text-center">Výukové predmety</h1>
        <div class="row text-center mt-4" id="studyFieldsContainer"></div>
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
    return `
    <div class="container my-5 card">
        <video style="width:100%;aspect-ratio:16/9;" controls>
            <source src="videos/fiveBenefits.mp4" type="video/mp4">
            Váš prehliadač nepodporuje prehrávanie videa.
        </video>
    </div>
    `;
}

function closeMenu() {
  if (window.matchMedia("(max-width: 991.98px)").matches) {
    var navbarCollapse = document.getElementById('navbarNavAltMarkup');
    if (navbarCollapse.classList.contains('show')) {
      var bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }
  }
}

function logOutUser(){
  vymazatZLocalStorage("user");
  vymazatZLocalStorage("filterNoAdmin");
  vymazatZLocalStorage("filterStatus");
  vymazatZLocalStorage("filter");
  showMainPage();
}