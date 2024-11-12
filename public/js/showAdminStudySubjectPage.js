function showAdminStudySubjectPage()
{
   /*  
    const studySubjectElement = event.currentTarget;
    const studySubjectMongoId = studySubjectElement.getAttribute("mongo-id");
    const studySubjectName = studySubjectElement.getAttribute("subject-name");
    const studyAbbrevation = studySubjectElement.getAttribute("subject-abbrevation"); 
    */

    //simulácia zatiaľ
    const studySubjectMongoId = "673258c693c54d921f9d083f";

    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Štúdiová technika";
    root.innerHTML=`
     <div class="container mt-5 card">
       <div class="d-flex mb-3">
        <button type="button" class="btn btn-danger" data-bs-toggle="modal"  
        data-bs-target="#addVideotutorialModal">Pridať videotutoriál</button>
       </div>
       <hr>
       predmety
       ${addVideotutorialFormModal()}
    </div>
    `;
    closeMenu();
    enableFooter(false);
}


function addVideotutorialFormModal()
{
    return `
        <div class="modal fade" id="addVideotutorialModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addVideotutorialLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-kmikt-blue">
                <div class="modal-header">
                    <h5 class="modal-title" style="color:white;" id="addVideotutorialLabel">Pridanie videotutoriálu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="addVideotutorialForm">
                        <div class="mb-3">
                            <label for="videoTutorialLink" class="form-label">Youtube odkaz</label>
                            <input type="text" oninput="loadVideotutorialModal(event)" 
                            class="form-control" id="videoTutorialLink">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                    <button type="button" onclick="event.preventDefault();addVideotutorial();"
                    class="btn btn-danger" data-bs-dismiss="modal">Pridať videotutoriál</button>
                </div>
            </div>
        </div>
        </div>
    `;
}

function loadVideotutorialModal(event)
{
alert(event.target.value);
}

function addVideotutorial()
{

}

