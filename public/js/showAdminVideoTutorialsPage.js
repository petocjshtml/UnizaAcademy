function showAdminVideoTutorialsPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Filtrované predmety";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                    <label for="faculty" class="form-label">
                    <span id="addFacultyModalActivator" style="color:#bed7ff8f;cursor:pointer"
                    class="text-end">Pridať fakultu</span></label>
                    <select class="form-select" id="faculty" disabled></select>
                    ${addFacultyModal()}
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                    <label for="studyForm" class="form-label">
                    <span id="addStudyFormModalActivator" 
                    style="color:#bed7ff8f;cursor:pointer">Pridať formu štúdia</span></label>
                    <select class="form-select" id="studyForm" disabled></select>
                    ${addStudyFormModal()}
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                    <label for="year" class="form-label">
                    <span id="addStudyYearModalActivator" 
                    style="color:#bed7ff8f;cursor:pointer">Pridať ročník</span></label>
                    <select class="form-select" id="studyYear" disabled></select>
                    ${addStudyYearModal()}
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                    <label for="studyProgram" class="form-label"> 
                    <span id="addStudyProgramModalActivator" 
                    style="color:#bed7ff8f;cursor:pointer">Pridať študijný program</span></label>
                    <select class="form-select" id="studyProgram" disabled></select>
                    ${addStudyProgramModal()}
                    </div>
                </div>
            </div>
            <div class="d-grid gap-2 d-md-block">
               <button class="btn btn-danger" id="addStudySubjectModalActivator" type="button">Pridať predmet</button>
              
                 ${addStudySubjectModal()}        
            </div>              
        </form>
        </div>

        <div class="container mt-5 card" id="studySubjects"></div>
    `;
    closeMenu();
    enableFooter(true);
    enableModalActivator("addFacultyModalActivator");
    loadObjects();
}

function enableSelect(id){
    document.getElementById(id).disabled = false;
}

function disableSelect(id){
    document.getElementById(id).disabled = true;
}

function enableModalActivator(id) {
    const button = document.getElementById(id);
    if (button.tagName.toLowerCase() !== 'button')
    button.style.color="#bed7ff";
    const modalId = "#" + id.replace("Activator", "");
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', modalId);
    button.disabled = false;
}

function disableModalActivator(id) {
    const button = document.getElementById(id);
    if (button.tagName.toLowerCase() !== 'button')
    button.style.color="#bed7ff8f";
    button.removeAttribute('data-bs-toggle');
    button.removeAttribute('data-bs-target');
    button.disabled = true;
}

function addFacultyModal() {
    return `
        <div class="modal fade" id="addFacultyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addFacultyLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-kmikt-blue">
                <div class="modal-header">
                    <h5 class="modal-title" style="color:white;" id="addFacultyLabel">Pridanie fakulty</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="addFacultyForm">
                        <div class="mb-3">
                            <label for="facultyName" class="form-label">Názov fakulty</label>
                            <input type="text" class="form-control" id="facultyName"  required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                    <button type="button" onclick="event.preventDefault();addFaculty();" class="btn btn-danger" data-bs-dismiss="modal">Pridať fakultu</button>
                </div>
            </div>
        </div>
        </div>
    `;
}

function addStudyFormModal() {
    return `
        <div class="modal fade" id="addStudyFormModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addStudyFormLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-kmikt-blue">
                <div class="modal-header">
                    <h5 class="modal-title" style="color:white;" id="addStudyFormLabel">Pridanie formy štúdia</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="addStudyFormForm">
                        <div class="mb-3">
                            <label for="facultyName" class="form-label">Názov fakulty</label>
                            <input type="text" id="studyFormFacultyValue" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyFormName" class="form-label">Názov formy štúdia</label>
                            <input type="text" class="form-control" id="studyFormName" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                    <button type="button" onclick="event.preventDefault();addStudyForm();" class="btn btn-danger" data-bs-dismiss="modal">Pridať formu štúdia</button>
                </div>
            </div>
        </div>
        </div>
    `;
}

function addStudyYearModal() {
    return `
        <div class="modal fade" id="addStudyYearModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addStudyYearLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-kmikt-blue">
                <div class="modal-header">
                    <h5 class="modal-title" style="color:white;" id="addStudyYearLabel">Pridanie ročníka</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="addStudyYearForm">
                        <div class="mb-3">
                            <label for="facultyName" class="form-label">Názov fakulty</label>
                            <input type="text" id="studyYearFacultyValue" class="form-control"  disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyFormName" class="form-label">Názov formy štúdia</label>
                            <input type="text" id="studyYearStudyFormValue" class="form-control"  disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyYear" class="form-label">Názov ročníka</label>
                            <input type="text" class="form-control" id="studyYearName" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                     <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                     <button type="button" onclick="event.preventDefault();addStudyYear();" class="btn btn-danger" data-bs-dismiss="modal">Pridať ročník</button>
                </div>
            </div>
        </div>
        </div>
    `;
}

function addStudyProgramModal() {
    return `
        <div class="modal fade" id="addStudyProgramModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addStudyProgramLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-kmikt-blue">
                <div class="modal-header">
                    <h5 class="modal-title" style="color:white;" id="addStudyProgramLabel">Pridanie študijného programu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="addStudyProgramForm">
                        <div class="mb-3">
                            <label for="facultyName" class="form-label">Názov fakulty</label>
                            <input type="text" id="studyProgramFacultyValue" class="form-control"  disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyFormName" class="form-label">Názov formy štúdia</label>
                            <input type="text" id="studyProgramStudyFormValue" class="form-control"  disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyYear" class="form-label">Názov ročníka</label>
                            <input type="text" id="studyProgramStudyYearValue" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyProgramName" class="form-label">Názov študijného programu</label>
                            <input type="text" class="form-control" id="studyProgramName" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                    <button type="button" onclick="event.preventDefault();addStudyProgram();" class="btn btn-danger" data-bs-dismiss="modal">Pridať študijný program</button>
                </div>
            </div>
        </div>
        </div>
    `;
}

function addStudySubjectModal() {
    return `
        <div class="modal fade" id="addStudySubjectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addStudySubjectLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-kmikt-blue">
                <div class="modal-header">
                    <h5 class="modal-title" style="color:white;" id="addStudySubjectLabel">Pridanie študijného predmetu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="addStudySubjectForm">
                        <div class="mb-3">
                            <label for="facultyName" class="form-label">Názov fakulty</label>
                            <input type="text" id="studySubjectFacultyValue" class="form-control"  disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyFormName" class="form-label">Názov formy štúdia</label>
                            <input type="text" id="studySubjectStudyFormValue" class="form-control"  disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyYear" class="form-label">Názov ročníka</label>
                            <input type="text" id="studySubjectStudyYearValue" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyYear" class="form-label">Názov ročníka</label>
                            <input type="text" id="studySubjectStudyProgramValue" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studySubjectName" class="form-label">Názov študijného predmetu</label>
                            <input type="text" class="form-control" id="studySubjectName" required>
                        </div>
                        <div class="mb-3">
                            <label for="studySubjectAbbreviation" class="form-label">Skratka študijného predmetu</label>
                            <input type="text" class="form-control" id="studySubjectAbbreviation" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                    <button type="button" onclick="event.preventDefault();addStudySubject();" class="btn btn-danger" data-bs-dismiss="modal">Pridať študijný predmet</button>
                </div>
            </div>
        </div>
        </div>
    `;
}

function editStudySubjectModal() {
    return `
        <div class="modal fade" id="editStudySubjectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editStudySubjectLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content bg-kmikt-blue">
                <div class="modal-header">
                    <h5 class="modal-title" style="color:white;" id="editStudySubjectLabel">Editácia študijného predmetu</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="editStudySubjectForm">
                        <div class="mb-3">
                            <label for="studySubjectNameToEdit" class="form-label">Názov študijného predmetu</label>
                            <input type="text" class="form-control" id="studySubjectNameToEdit" required>
                        </div>
                        <div class="mb-3">
                            <label for="studySubjectAbbreviationToEdit" class="form-label">Skratka študijného predmetu</label>
                            <input type="text" class="form-control" id="studySubjectAbbreviationToEdit" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                    <button type="button" 
                    onclick="editStudySubject();" 
                    id = "editStudySubjectModalButton"
                    class="btn btn-danger" data-bs-dismiss="modal">Zmeniť študijný predmet</button>
                </div>
            </div>
        </div>
        </div>
    `;
}

function addFaculty(){
    const facultyName = document.getElementById("facultyName").value.trim(); // Odstránenie medzier na začiatku a na konci
    if (facultyName.length < 1) 
        return alert("Názov fakulty musí obsahovať aspoň jedno písmeno.");
        
    const jsonData = { facultyName };
    const token = getUserFromLS().token;
    const endpoint_url = "/addFaculty";
    postDataLoggedIn(jsonData, endpoint_url, token).then(response => {
        if(response.success)
        {
           showAdminVideoTutorialsPage();
        }
    })
    .catch(error => { console.error('Error:', error); });
}

function addStudyForm(){
    const facultyId = document.getElementById("studyFormFacultyValue").getAttribute("mongo-id");
    const studyFormName = document.getElementById("studyFormName").value.trim(); 
    if (studyFormName.length < 1) 
        return alert("Názov formy štúdia musí obsahovať aspoň jedno písmeno.");
    
    const jsonData = { facultyId, studyFormName };
    const token = getUserFromLS().token;
    const endpoint_url = "/addStudyForm";
    postDataLoggedIn(jsonData, endpoint_url, token).then(response => {
        if(response.success)
        {
           showAdminVideoTutorialsPage();
        }
    })
    .catch(error => { console.error('Error:', error); });
}

function addStudyYear(){
    const facultyId = document.getElementById("studyYearFacultyValue").getAttribute("mongo-id");
    const studyFormId = document.getElementById("studyYearStudyFormValue").getAttribute("mongo-id");
    const studyYearName = document.getElementById("studyYearName").value.trim();
    if (studyYearName.length < 1) 
        return alert("Názov študijného roku musí obsahovať aspoň jedno písmeno.");

    const jsonData = { facultyId, studyFormId, studyYearName };
    const token = getUserFromLS().token;
    const endpoint_url = "/addStudyYear";
    postDataLoggedIn(jsonData, endpoint_url, token).then(response => {
        if(response.success)
        {
           showAdminVideoTutorialsPage();
        }
    })
    .catch(error => { console.error('Error:', error); });
}

function addStudyProgram(){
    const facultyId = document.getElementById("studyProgramFacultyValue").getAttribute("mongo-id");
    const studyFormId = document.getElementById("studyProgramStudyFormValue").getAttribute("mongo-id");
    const studyYearId = document.getElementById("studyProgramStudyYearValue").getAttribute("mongo-id");
    const studyProgramName = document.getElementById("studyProgramName").value.trim();
    if (studyProgramName.length < 1) 
        return alert("Názov študijného programu musí obsahovať aspoň jedno písmeno.");

    const jsonData = { facultyId, studyFormId, studyYearId, studyProgramName };
    const token = getUserFromLS().token;
    const endpoint_url = "/addStudyProgram";
    postDataLoggedIn(jsonData, endpoint_url, token).then(response => {
        if(response.success)
        {
           showAdminVideoTutorialsPage();
        }
    })
    .catch(error => { console.error('Error:', error); });
}

function addStudySubject(){
    const facultyId = document.getElementById("studySubjectFacultyValue").getAttribute("mongo-id");
    const studyFormId = document.getElementById("studySubjectStudyFormValue").getAttribute("mongo-id");
    const studyYearId = document.getElementById("studySubjectStudyYearValue").getAttribute("mongo-id");
    const studyProgramId = document.getElementById("studySubjectStudyProgramValue").getAttribute("mongo-id");
    const studySubjectName = document.getElementById("studySubjectName").value.trim();
    const studySubjectAbbreviation = document.getElementById("studySubjectAbbreviation").value.trim();
    if (studySubjectName.length < 1) 
        return alert("Názov študijného predmetu musí obsahovať aspoň jedno písmeno.");
    if (studySubjectAbbreviation.length < 1) 
        return alert("Skratka študijného predmetu musí obsahovať aspoň jedno písmeno.");
    
    const jsonData = { facultyId, studyFormId, studyYearId, studyProgramId, studySubjectName, studySubjectAbbreviation };
    const token = getUserFromLS().token;
    const endpoint_url = "/addStudySubject";
    postDataLoggedIn(jsonData, endpoint_url, token).then(response => {
        if(response.success)
        {
           showAdminVideoTutorialsPage();
        }
    })
    .catch(error => { console.error('Error:', error); });
}

var filterObjectsGlobal = null;
function loadObjects()
{
    const endpoint_url = "/getObjects";
    getData(endpoint_url).then(response => {
        filterObjectsGlobal = { ...response};
        console.log("objects",response);
        findFilterAndSetUpObjects(response);
        
    })
    .catch(error => { console.error('Error:', error); });
}

function findFilterAndSetUpObjects(objects)
{
    const filter = getFilter();
    if(filter)
    {
        const {
            facultySelectedIndex,
            studyFormSelectedIndex,
            studyYearSelectedIndex,
            studyProgramSelectedIndex,
        } = filter;

        setUpObjects(setUpFilter(objects,facultySelectedIndex,studyFormSelectedIndex,
            studyYearSelectedIndex,studyProgramSelectedIndex)); 
        selectObject("faculty", facultySelectedIndex);
        selectObject("studyForm", studyFormSelectedIndex);
        selectObject("studyYear", studyYearSelectedIndex);
        selectObject("studyProgram", studyProgramSelectedIndex);  
        fillDependencies();
    }
    else
    { 
        setUpObjects(setUpFilter(objects,0,0,0,0));    
    }
    setUpSelectEventListeners();
}

function getSelectedDropdown(dropdownId) 
{
    const dropdown = document.getElementById(dropdownId);
    const selectedValue = dropdown.value;
    const selectedText = dropdown.options[dropdown.selectedIndex].text;
    return { id: selectedValue, name: selectedText };
 }

function fillInfo(id_input_modal,id_dropdown_selected)
{
    const selectedInfo =  getSelectedDropdown(id_dropdown_selected);
    const modalInfoInput = document.getElementById(id_input_modal);
    modalInfoInput.value = selectedInfo.name;
    modalInfoInput.setAttribute("mongo-id",selectedInfo.id);
}

function fillDependencies()
{
    fillInfo("studyFormFacultyValue","faculty");
    fillInfo("studyYearFacultyValue","faculty");
    fillInfo("studyYearStudyFormValue","studyForm");
    fillInfo("studyProgramFacultyValue","faculty");
    fillInfo("studyProgramStudyFormValue","studyForm");
    fillInfo("studyProgramStudyYearValue","studyYear");
    fillInfo("studySubjectFacultyValue","faculty");
    fillInfo("studySubjectStudyFormValue","studyForm");
    fillInfo("studySubjectStudyYearValue","studyYear");
    fillInfo("studySubjectStudyProgramValue","studyProgram");
}

function disabledForDefault()
{
    disableSelect("faculty");
    disableSelect("studyForm");
    disableSelect("studyYear");
    disableSelect("studyProgram");
    disableModalActivator("addStudyFormModalActivator");
    disableModalActivator("addStudyYearModalActivator");
    disableModalActivator("addStudyProgramModalActivator");
    disableModalActivator("addStudySubjectModalActivator");
}

function setUpFilter(objectsAll, facultyIndex, studyFormIndex, studyYearIndex, studyProgramIndex) {
    // Klonovanie pôvodných objektov
    const objects = { ...objectsAll };

    // Ak nie sú žiadne fakulty, nastavíme všetky polia na prázdne
    if (objects.faculties.length === 0) {
        showStudySubjects([]); //schovanie predmetov
        return {
            faculties: [],
            studyForms: [],
            studyYears: [],
            studyPrograms: [],
            studySubjects: []
        };
    }

    // Filtrovanie študijných foriem podľa vybranej fakulty
    objects.studyForms = objects.studyForms.filter(
        (studyForm) => studyForm.facultyId === objects.faculties[facultyIndex]._id
    );

    // Ak nie sú žiadne študijné formy, vynulujeme ďalšie polia
    if (objects.studyForms.length === 0) {
        objects.studyYears = [];
        objects.studyPrograms = [];
        objects.studySubjects = [];
        showStudySubjects([]); 
        return objects;
    }

    // Filtrovanie ročníkov podľa vybranej fakulty a formy štúdia
    objects.studyYears = objects.studyYears.filter(
        (studyYear) =>
            studyYear.facultyId === objects.faculties[facultyIndex]._id &&
            studyYear.studyFormId === objects.studyForms[studyFormIndex]._id
    );

    // Ak nie sú žiadne ročníky, vynulujeme ďalšie polia
    if (objects.studyYears.length === 0) {
        objects.studyPrograms = [];
        objects.studySubjects = [];
        showStudySubjects([]);
        return objects;
    }

    // Filtrovanie študijných programov podľa vybranej fakulty, formy štúdia a ročníka
    objects.studyPrograms = objects.studyPrograms.filter(
        (studyProgram) =>
            studyProgram.facultyId === objects.faculties[facultyIndex]._id &&
            studyProgram.studyFormId === objects.studyForms[studyFormIndex]._id &&
            studyProgram.studyYearId === objects.studyYears[studyYearIndex]._id
    );

    // Ak nie sú žiadne študijné programy, vynulujeme predmety
    if (objects.studyPrograms.length === 0) {
        objects.studySubjects = [];
        showStudySubjects([]);
        return objects;
    }

    // Filtrovanie predmetov podľa vybranej fakulty, formy štúdia, ročníka a študijného programu
    objects.studySubjects = objects.studySubjects.filter(
        (studySubject) =>
            studySubject.facultyId === objects.faculties[facultyIndex]._id &&
            studySubject.studyFormId === objects.studyForms[studyFormIndex]._id &&
            studySubject.studyYearId === objects.studyYears[studyYearIndex]._id &&
            studySubject.studyProgramId === objects.studyPrograms[studyProgramIndex]._id
    );

    showStudySubjects(objects.studySubjects);
    return objects;
}

function facultyChanged()
{
    
    const facultySelect = document.getElementById("faculty");
    const facultySelectedIndex = facultySelect.selectedIndex;
    const filteredNewObjects = setUpFilter(filterObjectsGlobal,facultySelectedIndex,0,0,0);
    setUpObjects(filteredNewObjects);
    selectObject("faculty", facultySelectedIndex);
    fillDependencies(); 
    saveFilter();
}

function studyFormChanged()
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const facultySelectedIndex = facultySelect.selectedIndex;
    const studyFormSelectedIndex = studyFormSelect.selectedIndex;
    const filteredNewObjects = setUpFilter(filterObjectsGlobal,facultySelectedIndex,studyFormSelectedIndex,0,0);
    setUpObjects(filteredNewObjects);
    selectObject("faculty", facultySelectedIndex);
    selectObject("studyForm", studyFormSelectedIndex);
    fillDependencies(); 
    saveFilter();
}

function studyYearChanged()
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const studyYearSelect = document.getElementById("studyYear");
    const facultySelectedIndex = facultySelect.selectedIndex;
    const studyFormSelectedIndex = studyFormSelect.selectedIndex;
    const studyYearSelectedIndex = studyYearSelect.selectedIndex;
    const filteredNewObjects = setUpFilter(filterObjectsGlobal,facultySelectedIndex,studyFormSelectedIndex,studyYearSelectedIndex,0);
    setUpObjects(filteredNewObjects);
    selectObject("faculty", facultySelectedIndex);
    selectObject("studyForm", studyFormSelectedIndex);
    selectObject("studyYear", studyYearSelectedIndex);
    fillDependencies(); 
    saveFilter();
}

function studyProgramChanged()
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const studyYearSelect = document.getElementById("studyYear");
    const studyProgramSelect = document.getElementById("studyProgram");
    const facultySelectedIndex = facultySelect.selectedIndex;
    const studyFormSelectedIndex = studyFormSelect.selectedIndex;
    const studyYearSelectedIndex = studyYearSelect.selectedIndex;
    const studyProgramSelectedIndex = studyProgramSelect.selectedIndex;
    const filteredNewObjects = setUpFilter(filterObjectsGlobal,facultySelectedIndex,
        studyFormSelectedIndex,studyYearSelectedIndex,studyProgramSelectedIndex);
    setUpObjects(filteredNewObjects);
    selectObject("faculty", facultySelectedIndex);
    selectObject("studyForm", studyFormSelectedIndex);
    selectObject("studyYear", studyYearSelectedIndex);
    selectObject("studyProgram", studyProgramSelectedIndex);
    fillDependencies(); 
    saveFilter();
}

function saveFilter()
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const studyYearSelect = document.getElementById("studyYear");
    const studyProgramSelect = document.getElementById("studyProgram");

    const facultySelectedIndex = facultySelect.selectedIndex;
    const studyFormSelectedIndex = studyFormSelect.selectedIndex;
    const studyYearSelectedIndex = studyYearSelect.selectedIndex;
    const studyProgramSelectedIndex = studyProgramSelect.selectedIndex;

    const filter = {
        facultySelectedIndex,
        studyFormSelectedIndex,
        studyYearSelectedIndex,
        studyProgramSelectedIndex,
    };
    ulozitDoLocalStorage("filter", filter); 
}

function getFilter()
{
    return nacitatZLocalStorage("filter");
}

function setUpSelectEventListeners()
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const studyYearSelect = document.getElementById("studyYear");
    const studyProgramSelect = document.getElementById("studyProgram");
    facultySelect.addEventListener("change",(event) => {
        facultyChanged(); 
    });
    studyFormSelect.addEventListener("change",(event) => {
        studyFormChanged();
    });
    studyYearSelect.addEventListener("change",(event) => {
        studyYearChanged();
    });
    studyProgramSelect.addEventListener("change",(event) => {
        studyProgramChanged();
    }); 
}

function selectObject(selectId, index) {
    const selectElement = document.getElementById(selectId);
    if (selectElement) {
        // Skontrolujeme, či je index v platnom rozsahu
        if (index >= 0 && index < selectElement.options.length) {
            selectElement.selectedIndex = index;
        } else {
            console.warn(`Index ${index} je mimo rozsah pre element s ID '${selectId}'.`);
        }
    } else {
        console.error(`Element s ID '${selectId}' neexistuje.`);
    }
}

function setUpObjects(objects)
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const studyYearSelect = document.getElementById("studyYear");
    const studyProgramSelect = document.getElementById("studyProgram");
    facultySelect.innerHTML = "<option selected>none...</option>";
    studyFormSelect.innerHTML = "<option selected>none...</option>";
    studyYearSelect.innerHTML = "<option selected>none...</option>";
    studyProgramSelect.innerHTML = "<option selected>none...</option>";
    disabledForDefault();
    if (objects.faculties.length > 0)
    {
        facultySelect.innerHTML = "";
        objects.faculties.forEach(obj => {
            const option = document.createElement("option");
            option.value = obj._id;
            option.textContent = obj.facultyName; 
            facultySelect.appendChild(option);
        }); 
        enableSelect("faculty");
        enableModalActivator("addStudyFormModalActivator");
    }

    if (objects.studyForms.length > 0)
    {
        studyFormSelect.innerHTML = "";
        objects.studyForms.forEach(obj => {
            const option = document.createElement("option");
            option.value = obj._id;
            option.textContent = obj.studyFormName; 
            option.setAttribute("facultyId",obj.facultyId);
            studyFormSelect.appendChild(option); 
        });
        enableSelect("studyForm");
        if(objects.faculties.length > 0)
        {
            enableModalActivator("addStudyYearModalActivator");
        }
    } 

    if (objects.studyYears.length > 0)
    {
        studyYearSelect.innerHTML = "";
        objects.studyYears.forEach(obj => {
            const option = document.createElement("option");
            option.value = obj._id;
            option.textContent = obj.studyYearName; 
            option.setAttribute("facultyId",obj.facultyId);
            option.setAttribute("studyFormId",obj.studyFormId);
            studyYearSelect.appendChild(option); 
        });
        enableSelect("studyYear");
        if(objects.faculties.length > 0 && objects.studyForms.length > 0)
        {
            enableModalActivator("addStudyProgramModalActivator");
        }

    } 

    if (objects.studyPrograms.length > 0)
    {
        studyProgramSelect.innerHTML = "";
        objects.studyPrograms.forEach(obj => {
            const option = document.createElement("option");
            option.value = obj._id;
            option.textContent = obj.studyProgramName; 
            option.setAttribute("facultyId",obj.facultyId);
            option.setAttribute("studyFormId",obj.studyFormId);
            option.setAttribute("studyYearId",obj.studyYearId);
            studyProgramSelect.appendChild(option); 
        });
        enableSelect("studyProgram");
        if(objects.faculties.length > 0 && objects.studyForms.length > 0 && objects.studyYears.length > 0)
        {
            enableModalActivator("addStudySubjectModalActivator");
        }  
    } 
    fillDependencies();
}

function selectOptionByIdAndValue(selectId, value) {
    const selectElement = document.getElementById(selectId);
    if (selectElement) {
        for (let i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].value === value) {
                selectElement.selectedIndex = i;
                break;
            }
        }
    } else {
        console.error(`Element s ID '${selectId}' neexistuje.`);
    }
}

function focusModalInput(modalId) {
    // Mapovanie modalu na príslušný input element
    const inputMap = {
        "addFacultyModal": "facultyName",
        "addStudyFormModal": "studyFormName",
        "addStudyYearModal": "studyYearName",
        "addStudyProgramModal": "studyProgramName",
        "addStudySubjectModal": "studySubjectName",
        "addVideotutorialModal": "videoTutorialLink",
    };

    // Získanie ID vstupného elementu podľa otvoreného modalu
    const inputId = inputMap[modalId];
    const inputElement = document.getElementById(inputId);

    // Ak existuje input element, nastavíme naň focus
    if (inputElement) {
        inputElement.focus();
    }
}

// input modal autofocus
document.addEventListener("shown.bs.modal", (event) => {
    const modalId = event.target.id;
    focusModalInput(modalId);
});

function showStudySubjects(studySubjects) 
{
     const subjects = [...studySubjects];
     const subjectsContainer = document.getElementById("studySubjects");
     if(subjects.length === 0)
     {
        return subjectsContainer.style.display = "none";
     }
     subjectsContainer.style.display = "block";
    
     let html = `<div class="row"> ${editStudySubjectModal()}`;
     subjects.forEach((subject) => {
        html += `
        <!-- Karta študijného predmetu s kruhovým dizajnom -->
        <div class="col-md-6 col-sm-12 col-lg-3 mb-2 study-subject"   
        title="${subject.studySubjectName}">
           
            <div class="d-flex justify-content-center mb-3">
                <button class="btn btn-sm btn-primary me-2" title="Edit" 
                onclick="setUpEditSubjectModal(event)"
                subject-name="${subject.studySubjectName}"
                subject-abbrevation="${subject.studySubjectAbbreviation}"
                mongo-id="${subject._id}" 
                data-bs-toggle="modal" 
                data-bs-target="#editStudySubjectModal">
                
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger" mongo-id="${subject._id}" onclick="deleteSubject(event);" title="Delete">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
            <div 
            onclick="setUpStudySubjectPageInfo('${subject.studySubjectName}', '${subject._id}');" 
            mongo-id="${subject._id}"
            subject-name="${subject.studySubjectName}"
            subject-abbrevation="${subject.studySubjectAbbreviation}">
            <h2 class="subject-title">${subject.studySubjectAbbreviation}</h2>
            <img src="images/book.png" alt="Study Item" class="book-icon">
            </div>
        </div>`;
     });
     html += "</div>";
     subjectsContainer.innerHTML = html; 
}

function setUpStudySubjectPageInfo(studySubjectName,studySubjectId)
{
    const page_info = document.getElementById("page-info");
    page_info.setAttribute("study-subject-name",studySubjectName);
    page_info.setAttribute("study-subject-id",studySubjectId);
    showAdminStudySubjectPage();
}

function setUpEditSubjectModal(event)
{
    const editButton = event.currentTarget;
    const mongoId = editButton.getAttribute("mongo-id");
    const subjectName = editButton.getAttribute("subject-name");
    const subjectAbbrevation = editButton.getAttribute("subject-abbrevation");
    const modalButton = document.getElementById("editStudySubjectModalButton");
    modalButton.setAttribute("mongo-id",mongoId);
    document.getElementById("studySubjectNameToEdit").value = subjectName;
    document.getElementById("studySubjectAbbreviationToEdit").value = subjectAbbrevation;
}

function editStudySubject() {
    const modalButton = document.getElementById("editStudySubjectModalButton");
    const mongoId = modalButton.getAttribute("mongo-id");
    const studySubjectName = document.getElementById("studySubjectNameToEdit").value.trim();
    const studySubjectAbbreviation = document.getElementById("studySubjectAbbreviationToEdit").value.trim();
    const userFromLs = getUserFromLS();
    const jsonData = { studySubjectName, studySubjectAbbreviation };

    if (studySubjectName.length < 1) 
        return alert("Názov študijného predmetu musí obsahovať aspoň jedno písmeno.");
    if (studySubjectAbbreviation.length < 1) 
        return alert("Skratka študijného predmetu musí obsahovať aspoň jedno písmeno.");

    putDataLoggedIn(mongoId, jsonData, "/editStudySubject", userFromLs.token).then(response => {
        if(response.success) { showAdminVideoTutorialsPage(); } })
    .catch(error => { console.error('Error:', error); });
}

function deleteSubject(event)
{
    const deleteButton = event.currentTarget;
    const mongoId = deleteButton.getAttribute("mongo-id");
    const userFromLs = getUserFromLS();
    deleteDataLoggedIn(mongoId,"/deleteStudySubject", userFromLs.token).then(response => {
        if(response.success) { showAdminVideoTutorialsPage(); } })
    .catch(error => { console.error('Error:', error); });
}



