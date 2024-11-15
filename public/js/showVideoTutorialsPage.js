function showVideoTutorialsPage() 
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML = "Filter predmetov";
    root.innerHTML = `
        <div class="container mt-5 card">
            <div class="mb-3  d-flex align-items-center" id="filterStatusGroup">      
                <div class="form-check me-3">
                    <input class="form-check-input" type="radio" name="filterStatus" 
                    id="bySubjectClassification" value="bySubjectClassification" checked>
                    <label class="form-check-label" for="bySubjectClassification">Podľa zaradenia</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="filterStatus" id="byTags" value="byTags">
                    <label class="form-check-label" for="byTags">Podľa tagov</label>
                </div>
            </div>  
            <hr>
            <form>
                <div id="classificationFilterContainer" class="row" style="display:none;">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="faculty" class="form-label">Fakulta</label>
                            <select class="form-select" id="faculty"></select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="studyForm" class="form-label">Forma štúdia</label>
                            <select class="form-select" id="studyForm"></select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="year" class="form-label">Ročník</label>
                            <select class="form-select" id="studyYear"></select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="studyProgram" class="form-label">Študijný program</label>
                            <select class="form-select" id="studyProgram"></select>
                        </div>
                    </div>                
                </div> 

                <div id="tagsFilterContainer" style="display:none;">
                    <div class="row">
                        <div class="col-12">
                            <div id="existTagsContainer" class="mb-3"></div> 
                        </div>
                        <div class="col-12">
                        <label for="tagsContainer" class="form-label">Vybraté tagy</label>
                            <div id="tagsContainer" class="mb-3 choosenTags"></div>
                        </div>
                    </div>               
                </div> 
            </form>
            <hr>
            
        </div>

        <div class="container mt-5 card" id="studySubjects"></div>
    `;
    closeMenu();
    enableFooter(true);
    loadFilteredSubjects();
    
    document.querySelectorAll('input[name="filterStatus"]').forEach((radio) => {
        radio.addEventListener('change', ()=>{
            const selectedRadio = document.querySelector('input[name="filterStatus"]:checked');
            ulozitDoLocalStorage("filterStatus", selectedRadio.value);
            getCurrentFilterStatus();
        });
    });
}

var publicObjects = null;
function loadFilteredSubjects() {
    const endpoint_url = "/getObjects";
    getData(endpoint_url).then(response => {
        const filtered = filterDataByVideoTutorials(response);
        publicObjects = { ...filtered };
        getCurrentFilterStatus();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function findFilterAndSetUpObjectsNoAdmin(objects)
{
    const filter = getFilterPublic();
    
    if(filter)
    {
        const {
            facultySelectedIndex,
            studyFormSelectedIndex,
            studyYearSelectedIndex,
            studyProgramSelectedIndex,
        } = filter;

        setUpObjectsNoAdmin(setUpFilterNoAdmin(objects,facultySelectedIndex,studyFormSelectedIndex,
            studyYearSelectedIndex,studyProgramSelectedIndex)); 
        selectObject("faculty", facultySelectedIndex);
        selectObject("studyForm", studyFormSelectedIndex);
        selectObject("studyYear", studyYearSelectedIndex);
        selectObject("studyProgram", studyProgramSelectedIndex);  
    }
    else
    { 
        setUpObjectsNoAdmin(setUpFilterNoAdmin(objects,0,0,0,0));    
    }
    setUpSelectEventListenersPublic();
}

function setUpSelectEventListenersPublic()
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const studyYearSelect = document.getElementById("studyYear");
    const studyProgramSelect = document.getElementById("studyProgram");
    facultySelect.addEventListener("change",(event) => {
        facultyChangedPublic(); 
    });
    studyFormSelect.addEventListener("change",(event) => {
        studyFormChangedPublic();
    });
    studyYearSelect.addEventListener("change",(event) => {
        studyYearChangedPublic();
    });
    studyProgramSelect.addEventListener("change",(event) => {
        studyProgramChangedPublic();
    }); 
}

function facultyChangedPublic()
{
    
    const facultySelect = document.getElementById("faculty");
    const facultySelectedIndex = facultySelect.selectedIndex;
    const filteredNewObjects = setUpFilterNoAdmin(publicObjects,facultySelectedIndex,0,0,0);
    setUpObjectsNoAdmin(filteredNewObjects);
    selectObject("faculty", facultySelectedIndex);
    saveFilterNoAdmin();
}

function studyFormChangedPublic()
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const facultySelectedIndex = facultySelect.selectedIndex;
    const studyFormSelectedIndex = studyFormSelect.selectedIndex;
    const filteredNewObjects = setUpFilterNoAdmin(publicObjects,facultySelectedIndex,studyFormSelectedIndex,0,0);
    setUpObjectsNoAdmin(filteredNewObjects);
    selectObject("faculty", facultySelectedIndex);
    selectObject("studyForm", studyFormSelectedIndex); 
    saveFilterNoAdmin();
}

function studyYearChangedPublic()
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const studyYearSelect = document.getElementById("studyYear");
    const facultySelectedIndex = facultySelect.selectedIndex;
    const studyFormSelectedIndex = studyFormSelect.selectedIndex;
    const studyYearSelectedIndex = studyYearSelect.selectedIndex;
    const filteredNewObjects = setUpFilterNoAdmin(publicObjects,facultySelectedIndex,studyFormSelectedIndex,studyYearSelectedIndex,0);
    setUpObjectsNoAdmin(filteredNewObjects);
    selectObject("faculty", facultySelectedIndex);
    selectObject("studyForm", studyFormSelectedIndex);
    selectObject("studyYear", studyYearSelectedIndex);
    saveFilterNoAdmin();
}

function studyProgramChangedPublic()
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const studyYearSelect = document.getElementById("studyYear");
    const studyProgramSelect = document.getElementById("studyProgram");
    const facultySelectedIndex = facultySelect.selectedIndex;
    const studyFormSelectedIndex = studyFormSelect.selectedIndex;
    const studyYearSelectedIndex = studyYearSelect.selectedIndex;
    const studyProgramSelectedIndex = studyProgramSelect.selectedIndex;
    const filteredNewObjects = setUpFilterNoAdmin(publicObjects,facultySelectedIndex,
        studyFormSelectedIndex,studyYearSelectedIndex,studyProgramSelectedIndex);
    setUpObjectsNoAdmin(filteredNewObjects);
    selectObject("faculty", facultySelectedIndex);
    selectObject("studyForm", studyFormSelectedIndex);
    selectObject("studyYear", studyYearSelectedIndex);
    selectObject("studyProgram", studyProgramSelectedIndex);
    saveFilterNoAdmin();
}

function saveFilterNoAdmin()
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
    ulozitDoLocalStorage("filterNoAdmin", filter); 
}

function getFilterPublic()
{
    return nacitatZLocalStorage("filterNoAdmin");
}

function filterDataByVideoTutorials(data) {
    const subjectsWithVideos = new Set(data.videoTutorials.map(video => video.studySubjectId));
    const filteredSubjects = data.studySubjects.filter(subject =>
        subjectsWithVideos.has(subject._id)
    );

    const relevantFacultyIds = new Set(filteredSubjects.map(subject => subject.facultyId));
    const relevantStudyFormIds = new Set(filteredSubjects.map(subject => subject.studyFormId));
    const relevantStudyProgramIds = new Set(filteredSubjects.map(subject => subject.studyProgramId));
    const relevantStudyYearIds = new Set(filteredSubjects.map(subject => subject.studyYearId));

    const filteredFaculties = data.faculties.filter(faculty =>
        relevantFacultyIds.has(faculty._id)
    );

    const filteredStudyForms = data.studyForms.filter(studyForm =>
        relevantStudyFormIds.has(studyForm._id)
    );

    const filteredStudyPrograms = data.studyPrograms.filter(studyProgram =>
        relevantStudyProgramIds.has(studyProgram._id)
    );

    const filteredStudyYears = data.studyYears.filter(studyYear =>
        relevantStudyYearIds.has(studyYear._id)
    );

    const relevantTags = new Set();
    data.videoTutorials.forEach(video => {
        video.tags.forEach(tag => relevantTags.add(tag.tagName));
    });

    const filteredTags = data.tags.filter(tag =>
        relevantTags.has(tag.tagName)
    );

    const result = {
        faculties: filteredFaculties,
        studyForms: filteredStudyForms,
        studyPrograms: filteredStudyPrograms,
        studyYears: filteredStudyYears,
        studySubjects: filteredSubjects,
        videoTutorials: data.videoTutorials,
        tags: filteredTags,
    };

    return result;
}

function setUpObjectsNoAdmin(objects)
{
    const facultySelect = document.getElementById("faculty");
    const studyFormSelect = document.getElementById("studyForm");
    const studyYearSelect = document.getElementById("studyYear");
    const studyProgramSelect = document.getElementById("studyProgram");

    facultySelect.innerHTML = "";
    objects.faculties.forEach(obj => {
        const option = document.createElement("option");
        option.value = obj._id;
        option.textContent = obj.facultyName; 
        facultySelect.appendChild(option);
    }); 

    studyFormSelect.innerHTML = "";
    objects.studyForms.forEach(obj => {
        const option = document.createElement("option");
        option.value = obj._id;
        option.textContent = obj.studyFormName; 
        option.setAttribute("facultyId",obj.facultyId);
        studyFormSelect.appendChild(option); 
    });

    studyYearSelect.innerHTML = "";
        objects.studyYears.forEach(obj => {
            const option = document.createElement("option");
            option.value = obj._id;
            option.textContent = obj.studyYearName; 
            option.setAttribute("facultyId",obj.facultyId);
            option.setAttribute("studyFormId",obj.studyFormId);
            studyYearSelect.appendChild(option); 
        });

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
}

function setUpFilterNoAdmin(objectsAll, facultyIndex, studyFormIndex, studyYearIndex, studyProgramIndex) 
{
    const objects = { ...objectsAll };
    if (objects.faculties.length === 0) {
        showStudySubjectsNoAdmin([]); 
        return {
            faculties: [],
            studyForms: [],
            studyYears: [],
            studyPrograms: [],
            studySubjects: []
        };
    }

    objects.studyForms = objects.studyForms.filter(
        (studyForm) => studyForm.facultyId === objects.faculties[facultyIndex]._id
    );

    if (objects.studyForms.length === 0) {
        objects.studyYears = [];
        objects.studyPrograms = [];
        objects.studySubjects = [];
        showStudySubjectsNoAdmin([]); 
        return objects;
    }


    objects.studyYears = objects.studyYears.filter(
        (studyYear) =>
            studyYear.facultyId === objects.faculties[facultyIndex]._id &&
            studyYear.studyFormId === objects.studyForms[studyFormIndex]._id
    );

    if (objects.studyYears.length === 0) {
        objects.studyPrograms = [];
        objects.studySubjects = [];
        showStudySubjectsNoAdmin([]);
        return objects;
    }

    objects.studyPrograms = objects.studyPrograms.filter(
        (studyProgram) =>
            studyProgram.facultyId === objects.faculties[facultyIndex]._id &&
            studyProgram.studyFormId === objects.studyForms[studyFormIndex]._id &&
            studyProgram.studyYearId === objects.studyYears[studyYearIndex]._id
    );

    if (objects.studyPrograms.length === 0) {
        objects.studySubjects = [];
        showStudySubjectsNoAdmin([]);
        return objects;
    }

    objects.studySubjects = objects.studySubjects.filter(
        (studySubject) =>
            studySubject.facultyId === objects.faculties[facultyIndex]._id &&
            studySubject.studyFormId === objects.studyForms[studyFormIndex]._id &&
            studySubject.studyYearId === objects.studyYears[studyYearIndex]._id &&
            studySubject.studyProgramId === objects.studyPrograms[studyProgramIndex]._id
    );

    showStudySubjectsNoAdmin(objects.studySubjects);
    return objects;
}

function showStudySubjectsNoAdmin(studySubjects) 
{
     const subjects = [...studySubjects];
     const subjectsContainer = document.getElementById("studySubjects");
     if(subjects.length === 0)
     {
        return subjectsContainer.style.display = "none";
     }
     subjectsContainer.style.display = "block";
    
     let html = `<div class="row">`;
     subjects.forEach((subject) => {
        html += `
        <!-- Karta študijného predmetu s kruhovým dizajnom -->
        <div class="col-md-6 col-sm-12 col-lg-3 mb-2 study-subject"   
        title="${subject.studySubjectName}">
            <div 
            onclick="setUpStudySubjectPageInfoNoAdmin('${subject.studySubjectName}', '${subject._id}');" 
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

function setUpStudySubjectPageInfoNoAdmin(studySubjectName,studySubjectId)
{
    const page_info = document.getElementById("page-info");
    page_info.setAttribute("study-subject-name",studySubjectName);
    page_info.setAttribute("study-subject-id",studySubjectId);
    showStudySubjectPage();
}

function setUpTagsFilter(tags)
{
    tags.forEach(tag => {
        addTagToFilter(tag);
    });
}

function getCurrentFilterStatus() {
    const selectRadioFromLs = nacitatZLocalStorage("filterStatus");
    if(selectRadioFromLs)
    {
        selectRadioByValue(selectRadioFromLs);
    }
    const selectedRadio = document.querySelector('input[name="filterStatus"]:checked');
    if (selectedRadio) {
        if (selectedRadio.value === "bySubjectClassification") {
            document.getElementById("tagsFilterContainer").style.display = "none";
            document.getElementById("classificationFilterContainer").style.display = "flex";
            findFilterAndSetUpObjectsNoAdmin(publicObjects);
        } else {
            document.getElementById("classificationFilterContainer").style.display = "none";
            document.getElementById("tagsFilterContainer").style.display = "block";
            const selectedTagsLs = nacitatZLocalStorage("selectedTags") || [];
            setUpTagsFilter(publicObjects.tags);
            if (selectedTagsLs.length > 0) {
                selectedTagsLs.forEach(tagName => {
                    const tagElement = Array.from(document.querySelectorAll('#existTagsContainer span')).find(
                        el => el.textContent === tagName
                    );
                    if (tagElement) {
                        chooseTag(tagElement);
                    }
                });
                logSelectedTags();
            } else {
                showStudySubjectsNoAdmin(publicObjects.studySubjects);
            }
        }
    }
}

function selectRadioByValue(value) {
    const radioToSelect = document.querySelector(`input[name="filterStatus"][value="${value}"]`);
    if (radioToSelect) {
        radioToSelect.checked = true;
    } else {
        console.warn(`Rádio tlačidlo s hodnotou "${value}" neexistuje.`);
    }
}

function addTagToFilter(tag)
{
    const tagName = tag.tagName;
    const tagColor = tag.color;
    const tagsContainer = document.getElementById('existTagsContainer');
    const textColor = getTextColorBasedOnBackground(rgbStringToHex(tagColor));
    const tagElement = document.createElement('span');
    tagElement.className = 'badge rounded-pill me-2 mb-2';
    tagElement.style.backgroundColor = tagColor;
    tagElement.style.color = textColor;
    tagElement.style.padding = '10px 15px';
    tagElement.style.fontSize = '14px';
    tagElement.style.cursor = 'pointer';
    tagElement.textContent = tagName;
    tagElement.onclick = () => {
        chooseTag(tagElement);
    };
    tagsContainer.appendChild(tagElement);
}

function chooseTag(tagElement) {
    const existTagsContainer = document.getElementById('existTagsContainer');
    const tagsContainer = document.getElementById('tagsContainer');
    if (tagElement.parentElement === existTagsContainer) {
        tagsContainer.appendChild(tagElement);
    } else {
        existTagsContainer.appendChild(tagElement);
    }
    logSelectedTags();
}

function logSelectedTags() {
    const tagsContainer = document.getElementById('tagsContainer');
    const selectedTags = Array.from(tagsContainer.children).map(tagElement => tagElement.textContent);
    const filtered = filterSubjectsByTags(selectedTags, publicObjects.studySubjects, publicObjects.videoTutorials);
    showStudySubjectsNoAdmin(filtered);
    publicObjects.selectedTags = selectedTags;
    if(selectedTags.length === 0)
    {
        showStudySubjectsNoAdmin(publicObjects.studySubjects);
    }
}

function filterSubjectsByTags(selectedTags, subjects, videoTutorials) {
    const tagSet = new Set(selectedTags);
    const filteredSubjects = subjects.map(subject => {
        const filteredVideos = videoTutorials.filter(video => {
            return video.studySubjectId === subject._id &&
                   video.tags.some(tag => tagSet.has(tag.tagName));
        });

        if (filteredVideos.length === 0) {
            return null;
        }

        return {
            ...subject,
            videoTutorials: filteredVideos
        };
    }).filter(subject => subject !== null);

    return filteredSubjects;
}














