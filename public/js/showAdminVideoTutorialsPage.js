function showAdminVideoTutorialsPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Stránka pre správu videí";
    root.innerHTML=`

    `;
    closeMenu();
    enableFooter(false);
}