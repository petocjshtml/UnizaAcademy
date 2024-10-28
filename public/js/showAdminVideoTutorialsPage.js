function showAdminVideoTutorialsPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Stránka pre správu videí";
    root.innerHTML=`
        <div class="container mt-5 card">
        <form>
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                    <label for="faculty" class="form-label">
                    <span id="addFacultyModalActivator" style="color:#bed7ff8f;cursor:pointer"
                    class="text-end">Pridať fakultu</span></label>
                    <select class="form-select" id="faculty" disabled>
                        <option selected>none...</option>
                    </select>
                    ${addFacultyModal()}
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                    <label for="studyForm" class="form-label">
                    <span id="addStudyFormModalActivator" 
                    style="color:#bed7ff8f;cursor:pointer">Pridať formu štúdia</span></label>
                    <select class="form-select" id="studyForm" disabled>
                        <option selected>none...</option>
                        <option value="1">Možnosť 1</option>
                        <option value="2">Možnosť 2</option>
                        <option value="3">Možnosť 3</option>
                    </select>
                    ${addStudyFormModal()}
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                    <label for="year" class="form-label">
                    <span id="addStudyYearModalActivator" 
                    style="color:#bed7ff8f;cursor:pointer">Pridať ročník</span></label>
                    <select class="form-select" id="year" disabled>
                        <option selected>none...</option>
                        <option value="1">Možnosť 1</option>
                        <option value="2">Možnosť 2</option>
                        <option value="3">Možnosť 3</option>
                    </select>
                    ${addStudyYearModal()}
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                    <label for="studyProgram" class="form-label"> 
                    <span id="addStudyProgramModalActivator" 
                    style="color:#bed7ff8f;cursor:pointer">Pridať študijný program</span></label>
                    <select class="form-select" id="studyProgram" disabled>
                        <option selected>none...</option>
                        <option value="1">Možnosť 1</option>
                        <option value="2">Možnosť 2</option>
                        <option value="3">Možnosť 3</option>
                    </select>
                    ${addStudyProgramModal()}
                    </div>
                </div>
            </div>
            <div class="d-grid gap-2 d-md-block">
               <button class="btn btn-danger" type="button" disabled>Pridať predmet</button>
            </div>              
        </form>
        <br><br>
        </div>
    `;
    closeMenu();
    enableFooter(false);
    enableModalActivator("addFacultyModalActivator");
   // enableModalActivator("addStudyYearModalActivator");
   // enableModalActivator("addStudyProgramModalActivator");

    document.getElementById('addStudyFormModalActivator').addEventListener('click', function() {
        const selectedDropdown = getSelectedDropdown("faculty");
        const facultyNameInput = document.getElementById("studyFormFacultyValue");
        facultyNameInput.value = selectedDropdown.text;
        facultyNameInput.setAttribute("mongo-id",selectedDropdown.value);
    });

    document.getElementById('addStudyYearModalActivator').addEventListener('click', function() {
        const facultyText = getSelectedDropdown("faculty");
        const studyFormText = getSelectedDropdown("studyForm");
        document.getElementById("studyYearFacultyValue").value = facultyText;
        document.getElementById("studyYearStudyFormValue").value = studyFormText;
    });

    document.getElementById('addStudyProgramModalActivator').addEventListener('click', function() {
        const facultyText = getSelectedDropdown("faculty");
        const studyFormText = getSelectedDropdown("studyForm");
        const yearText = getSelectedDropdown("year");
        document.getElementById("studyProgramFacultyValue").value = facultyText;
        document.getElementById("studyProgramStudyFormValue").value = studyFormText;
        document.getElementById("studyProgramYearValue").value = yearText;
    });

    loadFaculties();
}

function disableModalActivator(id) {
    const button = document.getElementById(id);
    button.style.color="#bed7ff8f";
    button.removeAttribute('data-bs-toggle');
    button.removeAttribute('data-bs-target');
}

function enableModalActivator(id) {
    const button = document.getElementById(id);
    button.style.color="#bed7ff";
    const modalId = "#" + id.replace("Activator", "");
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', modalId);
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
                            <input type="text" class="form-control" id="facultyName" required>
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
                            <input type="text" class="form-control" id="studyYear" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                     <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                     <button type="button" onclick="event.preventDefault();" class="btn btn-danger" data-bs-dismiss="modal">Pridať ročník</button>
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
                            <input type="text" id="studyProgramYearValue" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="studyProgramName" class="form-label">Názov študijného programu</label>
                            <input type="text" class="form-control" id="studyProgramName" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zavrieť</button>
                    <button type="button" onclick="event.preventDefault();" class="btn btn-danger" data-bs-dismiss="modal">Pridať študijný program</button>
                </div>
            </div>
        </div>
        </div>
    `;
}

function getSelectedDropdown(dropdownId) {
   const dropdown = document.getElementById(dropdownId);
   const selectedValue = dropdown.value;
   const selectedText = dropdown.options[dropdown.selectedIndex].text;
   return { value: selectedValue, text: selectedText };
}

function addFaculty(){
    const facultyName = document.getElementById("facultyName").value;
    const jsonData = {
        facultyName:facultyName,
    };
    const token = getUserFromLS().jwt_token;
    const endpoint_url = "/faculties";
    postDataLoggedIn(jsonData, endpoint_url, token).then(response => {
        if(response.success)
        {
            showAdminVideoTutorialsPage();
        }
    })
    .catch(error => { console.error('Error:', error); });
}

function addStudyForm() {
    const facultyNameInput = document.getElementById("studyFormFacultyValue");
    const facultyId = facultyNameInput.getAttribute("mongo-id");
    const studyFormName = document.getElementById("studyFormName").value;
    const jsonData = { facultyId, studyFormName };
    const token = getUserFromLS().jwt_token;
    const endpoint_url = "/study-forms";
    postDataLoggedIn(jsonData, endpoint_url, token).then(response => {
        if(response.success)
        {
            showAdminVideoTutorialsPage();
        }
    })
    .catch(error => { console.error('Error:', error); });
}

function loadFaculties()
{
    const token = getUserFromLS().jwt_token;
    const endpoint_url = "/faculties";
    getDataLoggedIn(endpoint_url, token).then(response => {
        console.log(response);
        const facultySelect = document.getElementById("faculty");
        if(response.length > 0)
        {
            facultySelect.options[0].remove();
            response.forEach(faculty => {
                const option = document.createElement("option");
                option.value = faculty._id;
                option.textContent = faculty.facultyName;
                facultySelect.appendChild(option);
            });
            facultySelect.disabled = false;
            enableModalActivator("addStudyFormModalActivator");
        }
    })
    .catch(error => { console.error('Error:', error); });
}

function loadStudyForms()
{
  /*   const token = getUserFromLS().jwt_token;
    const endpoint_url = "/study-forms";
    getDataLoggedIn(endpoint_url, token).then(response => {
        console.log(response);
        const studyFormSelect = document.getElementById("studyForm");
        if(response.length > 0)
        {

            studyFormSelect.options[0].remove();
            response.forEach(studyForm => {
                const option = document.createElement("option");
                option.value = studyForm._id;
                option.textContent = studyForm.studyFormName;
                studyFormSelect.appendChild(option);
            });
            studyFormSelect.disabled = false;
            enableModalActivator("addStudyYearModalActivator");
        }
    })
    .catch(error => { console.error('Error:', error); }); */
}


