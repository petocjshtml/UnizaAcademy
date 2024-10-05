function showMainPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Uniza Academy";
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

function getImproveYourSkillsHtml()
{
    return`
    <div class="container my-5 card">
        <div class="row align-items-center text-white">
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
        <h1 class="display-5 fw-bold mb-5 text-center">Poskytujeme videá pre každú fakultu !</h1>
        <div class="row text-center justify-content-center mt-4">
            <div class="col-md-3 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_fakult/doprava_v1.png" alt="Doprava" class="icon-circle">
                <div class="icon-text">Doprava</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_fakult/strojnictvo_v1.png" alt="Strojárstvo" class="icon-circle">
                <div class="icon-text">Strojárstvo</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_fakult/elektro_v1.png" alt="Elektrotechnika" class="icon-circle">
                <div class="icon-text">Elektrotechnika</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_fakult/stavebnictvo_v1.png" alt="Stavebníctvo" class="icon-circle">
                <div class="icon-text">Stavebníctvo</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_fakult/informatika_v1.png" alt="Informatika" class="icon-circle">
                <div class="icon-text">Informatika</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
                <img src="images/mriezka_fakult/multimedia_v1.png" alt="Mediálne a komunikačné štúdiá" class="icon-circle">
                <div class="icon-text">Mediálne a komunikačné štúdiá</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
              <img src="images/mriezka_fakult/geodezia_v1.png" alt="Geodézia a kartografia" class="icon-circle">
              <div class="icon-text">Geodézia a kartografia</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
              <img src="images/mriezka_fakult/ekonomika_v1.png" alt="Ekonómia a manažment" class="icon-circle">
              <div class="icon-text">Ekonómia a manažment</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
              <img src="images/mriezka_fakult/bezpecnost_v1.png" alt="Bezpečnostné vedy" class="icon-circle">
              <div class="icon-text">Bezpečnostné vedy</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
              <img src="images/mriezka_fakult/humanizmus_v1.png" alt="Učiteľstvo a pedagogické vedy" class="icon-circle">
              <div class="icon-text">Učiteľstvo a pedagogické vedy</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
              <img src="images/mriezka_fakult/kybernetika_v1.png" alt="Kybernetika" class="icon-circle">
              <div class="icon-text">Kybernetika</div>
            </div>
            <div class="col-md-3 col-sm-6 col-6 mb-5">
              <img src="images/mriezka_fakult/ochrana_v1.png" alt="Ekologické a environmentálne vedy" class="icon-circle">
              <div class="icon-text">Ekologické a environmentálne vedy</div>
            </div>
        </div>
    </div>
    `;
}

function getYoutubeTeamWorkHtml()
{
    return`
    <div class="container my-5 card">
          <div class="row align-items-center text-white">
              <div class="col-md-6 order-1 order-md-1 text-center">
                  <img src="images/video-icon.svg" alt="Uniza Academy" class="img-fluid mb-4">
              </div>
              <div class="col-md-6 order-2 order-md-2">
                 <h1 class="display-5 fw-bold py-1">Spolupráca s YouTubom</h1>
                  <p class="lead">
                    Uniza Academy je moderná platforma, ktorá študentom poskytuje prístup k širokej škále videotutoriálov.
                    Naša snaha o efektívnu a kvalitnú výučbu nás viedla k využívaniu YouTube ako cloudového úložiska pre
                    naše vzdelávacie materiály. Tento nástroj nám umožňuje nielen rýchle nahrávanie a sprístupnenie obsahu,
                    ale aj zabezpečenie jeho plynulého prehrávania v rôznej kvalite, čo študentom zaručuje bezproblémový prístup
                    k lekciám z akéhokoľvek zariadenia. Vďaka spolupráci s YouTubom môžeme efektívne spravovať a šíriť náš obsah
                    na globálnej úrovni. YouTube nám tak poskytuje robustný základ pre realizáciu našej vízie a neustále zlepšovanie
                    vzdelávacieho procesu pre všetkých našich študentov. Naším cieľom je študentom sprístupniť tie najlepšie 
                    možné nástroje na ich vzdelávanie. Youtube ako steamovacia služba nám ich zaručene poskytuje.
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

