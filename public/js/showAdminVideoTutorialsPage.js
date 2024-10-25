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
                    <label for="dropdown1" class="form-label">
                    <span style="color:#bed7ff;cursor:pointer" class="text-end" data-bs-toggle="modal" data-bs-target="#addFacultyModal">Pridať fakultu</span></label>
                    <select class="form-select" id="dropdown1" disabled>
                        <option selected>none...</option>
                        <option value="1">Možnosť 1</option>
                        <option value="2">Možnosť 2</option>
                        <option value="3">Možnosť 3</option>
                    </select>
                    ${addFacultyModal()}
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                    <label for="dropdown2" class="form-label">
                    <span style="color:#bed7ff8f;cursor:pointer" data-bs-toggle="modal" data-bs-target="#addStudyFormModal">Pridať formu štúdia</span></label>
                    <select class="form-select" id="dropdown2" disabled>
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
                    <label for="dropdown3" class="form-label">
                    <span style="color:#bed7ff8f;cursor:pointer" data-bs-toggle="modal" data-bs-target="#addStudyYearModal">Pridať ročník</span></label>
                    <select class="form-select" id="dropdown3" disabled>
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
                    <label for="dropdown4" class="form-label"> 
                    <span style="color:#bed7ff8f;cursor:pointer" data-bs-toggle="modal" data-bs-target="#addStudyProgramModal">Pridať študijný program</span></label>
                    <select class="form-select" id="dropdown4" disabled>
                        <option selected>none...</option>
                        <option value="1">Možnosť 1</option>
                        <option value="2">Možnosť 2</option>
                        <option value="3">Možnosť 3</option>
                    </select>
                    ${addStudyProgramModal()}
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-danger" disabled>Pridať predmet</button>
        </form>
        <br><br>
        <table class="table table-hover table-transparent text-center">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Zobraziť nie ako tabuľku ale ako orámované karty
                 bielym rámom s border radius, a padding, v každej karte nech
                 je skratka predmetu s title celým menom predmetu</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Ing. Uhrina Miroslav, PhD.</td>
            </tr>
            </tbody>
            <tr>
                <th scope="row">1</th>
                <td>Ing. Radilová Martina, PhD.</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>doc. Ing. Počta Peter, PhD.</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>doc. Ing. Vaculík Martin, PhD.</td>
            </tr>
        </table>
        </div>
    `;
    closeMenu();
    enableFooter(false);
}

function createStudyField(event) {

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
                    <h5 class="modal-title" style="color:white;" id="addStudyFormLabel">Pridať formu štúdia</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="addStudyFormForm">
                        <div class="mb-3">
                            <label for="facultyName" class="form-label">Fakulta</label>
                            <input type="text" class="form-control"  disabled>
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
                    <h5 class="modal-title" style="color:white;" id="addStudyYearLabel">Pridať ročník</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="addStudyYearForm">
                        <div class="mb-3">
                            <label for="studyYearNumber" class="form-label">Číslo ročníka</label>
                            <input type="number" class="form-control" id="studyYearNumber" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Pridať ročník</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Zrušiť</button>
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
                    <h5 class="modal-title" style="color:white;" id="addStudyProgramLabel">Pridať študijný program</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="color:white;">
                    <form id="addStudyProgramForm">
                        <div class="mb-3">
                            <label for="studyProgramName" class="form-label">Názov študijného programu</label>
                            <input type="text" class="form-control" id="studyProgramName" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Pridať študijný program</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Zrušiť</button>
                </div>
            </div>
        </div>
        </div>
    `;
}

function addFaculty(){
    const jwtToken = getUserFromLS().jwt_token;
    const facultyName = document.getElementById("facultyName").value;
    const jsonData = {
        facultyName:facultyName,
    }
    postDataLoggedIn(jsonData, "/faculties", jwtToken).then(response => {
        console.log(response);
        if(response.success)
        {
            
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loadFaculties()
{
    const jwtToken = getUserFromLS().jwt_token;
    getDataLoggedIn("/faculties",jwtToken).then(response => {
        showFaculties(response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getChoosenFaculty() {
    const dropdown = document.getElementById("dropdown1");
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const facultyId = selectedOption.getAttribute("mongo-id");
    alert(facultyId); // Tu vidíš zvolený 'mongo-id'
}


function addStudyForm() {

}

function loadStudyForms() {
    
}

function showFaculties(faculties) {
    console.log("faculties", faculties);
    const facultiesDropdown = document.getElementById("dropdown1");
    if (faculties.length > 0) {
        facultiesDropdown.disabled = false;
        let facultyOptionsHtml = faculties.map(faculty => 
            `<option mongo-id="${faculty._id}" value="${faculty._id}">${faculty.facultyName}</option>`
        ).join('');
        facultiesDropdown.innerHTML = facultyOptionsHtml;
    }
}


