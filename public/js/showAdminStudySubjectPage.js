function showAdminStudySubjectPage(event)
{
    const studySubjectElement = event.currentTarget;
    const studySubjectMongoId = studySubjectElement.getAttribute("mongo-id");
    const studySubjectName = studySubjectElement.getAttribute("subject-name");
    const studyAbbrevation = studySubjectElement.getAttribute("subject-abbrevation");
}