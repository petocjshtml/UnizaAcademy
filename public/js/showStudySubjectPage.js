function showStudySubjectPage()
{
    const page_info = document.getElementById("page-info");
    const studySubjectName = page_info.getAttribute("study-subject-name");
    const root = document.getElementById("root");
    page_info.innerHTML= studySubjectName;
    root.innerHTML=`
    <div class="container mt-5 card">
       <div class="d-flex mb-3">
        <button type="button" onclick="showVideoTutorialsPage();" class="btn btn-secondary">Naspäť</button>
       </div>
       <hr>
       <h3 class="mb-3">Videotutoriály: <span style="color:red;display:none;" id="noVideotutorialsMessage">none</span></h3>
       <div id="studySubjectVideotutorials" class="row"></div>
    </div>
    `;
    closeMenu();
    enableFooter(false);
    showStudySubjectVideotutorialsPublic(publicObjects.videoTutorials);
}

function showStudySubjectVideotutorialsPublic(videotutorialsAll) 
{
    
    const videotutorialsContainer = document.getElementById("studySubjectVideotutorials");
    const subjectId = document.getElementById('page-info').getAttribute("study-subject-id");
    var filteredVideotutorialsBySubject = videotutorialsAll.filter((videotutorial) => {
        return videotutorial.studySubjectId === subjectId;
    });

    if(filteredVideotutorialsBySubject.length === 0)
    {
        document.getElementById("noVideotutorialsMessage").style.display = "revert";
    }

    //tags filter for videos if is choosen
    const filterStatus = nacitatZLocalStorage("filterStatus");
    if(filterStatus ==="byTags")
    {
        if(publicObjects.selectedTags)
        {
            if(publicObjects.selectedTags.length > 0)
            {
                filteredVideotutorialsBySubject = filteredVideotutorialsBySubject.filter((video) => {
                    return video.tags.filter((tag) => publicObjects.selectedTags.includes(tag.tagName)).length > 0;
                });
            }
        }  
    }

    filteredVideotutorialsBySubject.forEach((videotutorial) => {
        videotutorialsContainer.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" 
        onclick="showVideoPlayer('${encodeURIComponent(videotutorial.title)}','${videotutorial.link}','${videotutorial.duration}');">
            <div class="video-card">
                <div class="thumbnail-link">
                    <img src="${videotutorial.thumbnail}" alt="Video Thumbnail" class="thumbnail">
                    <span class="video-duration">${videotutorial.duration}</span>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${videotutorial.title}</h3>
                    <p class="video-stats">${videotutorial.views} views • ${videotutorial.likes} likes</p>
                    <div class="tags">
                        ${videotutorial.tags.map(tag => `
                            <span class="tag" style="background-color: ${tag.color};color:${getTextColorBasedOnBackground(rgbStringToHex(tag.color))}">${tag.tagName}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}





















