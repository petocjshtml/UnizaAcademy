function showAdminStudySubjectPage()
{
    const page_info = document.getElementById("page-info");
    const studySubjectMongoId = page_info.getAttribute("study-subject-id");
    const studySubjectName = page_info.getAttribute("study-subject-name");
    const root = document.getElementById("root");

    page_info.innerHTML= studySubjectName;
    root.innerHTML=`
     <div class="container mt-5 card">
       <div class="d-flex mb-3">
        <button type="button" class="btn btn-danger me-3" data-bs-toggle="modal"  
        data-bs-target="#addVideotutorialModal">Pridať videotutoriál</button>
        <button type="button" onclick="showAdminVideoTutorialsPage();" class="btn btn-secondary">Naspäť</button>
     
       </div>
       ${addVideotutorialFormModal(studySubjectMongoId)}
       <hr>
       <h3 class="mb-3">Videotutoriály: <span style="color:red;display:none;" id="noVideotutorialsMessage">none</span></h3>
       <div id="studySubjectVideotutorials" class="row"></div>
    </div>
    `;
    closeMenu();
    enableFooter(false);
    loadTagsModal();
    loadVideotutorials();
}

function loadVideotutorials()
{
    const token = getUserFromLS().token;
    getDataLoggedIn("/getVideotutorials", token).then(response => {
        showStudySubjectVideotutorials(response);
    })
    .catch(error => { console.error('Error:', error); });
}

function showStudySubjectVideotutorials(videotutorialsAll) {
    const videotutorialsContainer = document.getElementById("studySubjectVideotutorials");
    const subjectId = document.getElementById('addVideotutorialForm').getAttribute("study-subject-id");
    const filteredVideotutorialsBySubject = videotutorialsAll.filter((videotutorial) => {
        return videotutorial.studySubjectId === subjectId;
    });

    if(filteredVideotutorialsBySubject.length === 0)
    {
        document.getElementById("noVideotutorialsMessage").style.display = "revert";
    }
    
    filteredVideotutorialsBySubject.forEach((videotutorial) => {
        videotutorialsContainer.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" 
        onclick="showVideoPlayer('${videotutorial.title}','${videotutorial.link}','${videotutorial.duration}');">
            <div class="video-card">
                <div class="thumbnail-link">
                    <img src="${videotutorial.thumbnail}" alt="Video Thumbnail" class="thumbnail">
                    <span class="video-duration">${videotutorial.duration}</span>
                    <button type="button" class="btn btn-danger btn-sm delete-video-btn position-absolute top-0 end-0 m-2" 
                        onclick="deleteVideo('${videotutorial._id}')">
                        <i class="bi bi-trash"></i>
                    </button>
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

function addVideotutorialFormModal(studySubjectMongoId)
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
                    <form id="addVideotutorialForm" study-subject-id="${studySubjectMongoId}">
                        <div class="mb-3">
                            <label for="videoTutorialLink" class="form-label">
                            Youtube odkaz : &nbsp; &nbsp; &nbsp; <span id="studySubjectModalMessage" style="color:#f37429;"></span></label>
                            <input type="text" oninput="loadVideotutorialModal(event)"
                            class="form-control" id="videoTutorialLink">
                            <img id="studySubjectModalLoadingElement" src="images/loading.gif" alt="Loading" style="width: 20px; display:none;">
                        </div>
                        <div id="videoInfoSection" style="display: none; margin-top: 20px;">
                            <div class="d-flex align-items-start">
                                <img id="videoThumbnail" src="" alt="Thumbnail" style="width: 250px;
                                height: auto; border-radius: 8px; margin-right: 15px;">
                                <div>
                                    <h5 id="videoTitle" style="margin-bottom: 10px;"></h5>
                                    <p style="margin: 0;">
                                        <strong>Trvanie:</strong> <span id="videoDuration"></span><br>
                                        <strong>Zhliadnutia:</strong> <span id="videoViews"></span><br>
                                        <strong>Počet likov:</strong> <span id="videoLikes"></span>
                                    </p>
                                </div>
                            </div>
                            <hr style="border-top: 10px solid #d8641b;">
                            <div class="mb-3 d-flex align-items-end">                             
                                <div class="flex-grow-1 me-2" style="flex-basis: 50%;">
                                   <label for="tagName" class="form-label">Pridanie tagu</label>
                                    <input type="text" class="form-control" id="tagName" placeholder="Názov tagu">
                                </div>
                                <div class="me-2" style="flex-basis: 20%;">
                                 <label for="tagColor" class="form-label">Farba tagu</label> 
                                    <input type="color" class="form-control w-100" id="tagColor" value="#ff0000" title="Vyberte farbu" style="height: 38px;">
                                </div>
                                <div style="flex-basis: 30%;">
                                    <label class="form-label d-block">&nbsp;</label> <!-- Prázdny label pre zarovnanie -->
                                    <button type="button" class="btn btn-success w-100" onclick="addTag()">
                                        Pridať tag
                                    </button>
                                </div>
                            </div>
                            <div id="existTagsContainer" class="mb-3 d-flex flex-wrap"></div>
                            <hr>                    
                            <div id="tagsContainer" class="mb-3 d-flex flex-wrap"></div>
                            <hr>
                            <div class="mb-3  d-flex align-items-center">
                            
                                <div class="form-check me-3">
                                    <input class="form-check-input" type="radio" name="videoStatus" id="videoPublic" value="public" checked>
                                    <label class="form-check-label" for="videoPublic">Verejné</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="videoStatus" id="videoUniverzity" value="univerzity">
                                    <label class="form-check-label" for="videoUniverzity">Univerzitné</label>
                                </div>
                            </div>
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

function loadTagsModal()
{
    const token = getUserFromLS().token;
    getDataLoggedIn("/getTags", token).then(response => {
        setUpTagsToModal(response);   
    })
    .catch(error => { console.error('Error:', error); });
}

function setUpTagsToModal(tags) 
{
    tags.forEach(tag => {
        addExistTag(tag);
    });
}

function isValidYouTubeUrl(url) 
{
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([a-zA-Z0-9_-]{11})(\S*)?$/;
    return regex.test(url);
}

function loadVideotutorialModal(event)
{
    hideLoading("studySubjectModalLoadingElement");
    message("studySubjectModalMessage", "");
    document.getElementById("videoInfoSection").style.display = "none";
    if(isValidYouTubeUrl(event.target.value))
    {
        showLoading("studySubjectModalLoadingElement");
        const userFromLs = getUserFromLS();
        const jsonData = { youtubeUrl: event.target.value };
        postDataLoggedIn(jsonData, "/checkVideotutorial", userFromLs.token).then(response => {
            hideLoading("studySubjectModalLoadingElement");
            setUpVideoModalInfo(response)
        })
        .catch(error => { console.error('Error:', error); });
    }
}

function setUpVideoModalInfo(videoInfo)
{
    if (videoInfo.exists === false) {
        message("studySubjectModalMessage", "Neplatný odkaz na video !");
        document.getElementById("videoInfoSection").style.display = "none";
    } else {
        document.getElementById("videoThumbnail").src = videoInfo.thumbnail;
        document.getElementById("videoTitle").textContent = videoInfo.title;
        document.getElementById("videoDuration").textContent = videoInfo.duration;
        document.getElementById("videoViews").textContent = videoInfo.views.toLocaleString();
        document.getElementById("videoLikes").textContent = videoInfo.likes.toLocaleString();
        document.getElementById("videoInfoSection").style.display = "block";
    }  
}

function getTextColorBasedOnBackground(backgroundColor) {
    const color = backgroundColor.substring(1);
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
    return brightness > 150 ? '#000000' : '#FFFFFF';
}

function addExistTag(tag)
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
        document.getElementById('tagName').value = tagName;
        document.getElementById('tagColor').value = rgbStringToHex(tagColor);
        addTag();
    };
    tagsContainer.appendChild(tagElement);
}

function rgbStringToHex(rgb) 
{
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

function addTag() {
    var tagName = document.getElementById('tagName').value;
    var tagColor = document.getElementById('tagColor').value;
    const tagsContainer = document.getElementById('tagsContainer');
    
    if (!tagName) {
        alert('Zadajte názov tagu!');
        return;
    }

    const nameIsInExistTags = disableIfNameIsInExistTags(tagName);
    if(nameIsInExistTags)
    {
        tagColor = rgbStringToHex(getTagColorFromExistTags(tagName));
    }
    const textColor = getTextColorBasedOnBackground(tagColor);
    const tagElement = document.createElement('span');
    tagElement.className = 'badge rounded-pill me-2 mb-2';
    tagElement.style.backgroundColor = tagColor;
    tagElement.style.color = textColor;
    tagElement.style.padding = '10px 15px';
    tagElement.style.fontSize = '14px';
    tagElement.style.cursor = 'pointer';
    tagElement.textContent = tagName;
    tagElement.onclick = () => {
        enableIfNameIsInExistTags(tagName);
        tagsContainer.removeChild(tagElement);
    };
    tagsContainer.appendChild(tagElement);
    document.getElementById('tagName').value = '';
    document.getElementById('tagColor').value = '#ff0000';
}

function addVideotutorial() {
    const is_video_data_correct = document.getElementById("videoInfoSection").style.display !== "none";
    if(!is_video_data_correct)
    {
        return alert("Video link is incorrect");
    }
    const subjectId = document.getElementById('addVideotutorialForm').getAttribute("study-subject-id");
    const videoLink = document.getElementById('videoTutorialLink').value;
    const videoTitle = document.getElementById('videoTitle').textContent;
    const videoDuration = document.getElementById('videoDuration').textContent;
    const videoViews = document.getElementById('videoViews').textContent;
    const videoLikes = document.getElementById('videoLikes').textContent;
    const videoThumbnail = document.getElementById('videoThumbnail').src;
    const isPublic = document.getElementById('videoPublic').checked ? 'public' : 'univerzity';
    const tagsContainer = document.getElementById('tagsContainer');
    const tags = Array.from(tagsContainer.children).map(tagElement => {
        return {
            tagName: tagElement.textContent.trim(),
            color: tagElement.style.backgroundColor
        };
    });

    const videoTutorialData = {
        studySubjectId: subjectId,
        link: videoLink,
        title: videoTitle,
        duration: videoDuration,
        views: videoViews,
        likes: videoLikes,
        thumbnail: videoThumbnail,
        status: isPublic,
        tags: tags
    };

    const token = getUserFromLS().token;
    postDataLoggedIn(videoTutorialData, "/addVideotutorial", token).then(response => {
            showAdminStudySubjectPage();
    })
    .catch(error => { console.error('Error:', error); });
}

function disableIfNameIsInExistTags(tagName)
{
    const existTagsHtmlCollection = document.getElementById("existTagsContainer").children;
    var nameIsInExistTags = false
    if(existTagsHtmlCollection.length > 0)
    {
        Array.from(existTagsHtmlCollection).forEach((element)=>{
            if(element.textContent.trim() === tagName.trim())
            {
                nameIsInExistTags = true;
                element.style.display = "none";
            }
        });
    }
    return nameIsInExistTags;
}

function enableIfNameIsInExistTags(tagName)
{
    const existTagsHtmlCollection = document.getElementById("existTagsContainer").children;
    if(existTagsHtmlCollection.length > 0)
    {
        Array.from(existTagsHtmlCollection).forEach((element)=>{
            if(element.textContent.trim() === tagName.trim())
            {
                element.style.display = "block";
            }
        });
    }
}

function getTagColorFromExistTags(tagName)
{
    const existTagsHtmlCollection = document.getElementById("existTagsContainer").children;
    var color = "yellow";
    if(existTagsHtmlCollection.length > 0)
    {
        Array.from(existTagsHtmlCollection).forEach((element)=>{
            if(element.textContent.trim() === tagName.trim())
            {
                color = element.style.backgroundColor;
            }
        });
    }
    return color;
}

function deleteVideo(videotutorialId) {
    const userFromLs = getUserFromLS();
    deleteDataLoggedIn(videotutorialId,"/deleteVideotutorial", userFromLs.token).then(response => {
        if(response.success) { showAdminStudySubjectPage(); } })
    .catch(error => { console.error('Error:', error); });
}


