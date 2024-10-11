function showVideoTutorialsPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Náučné videá";
    root.innerHTML=`
    `;
    closeMenu();
    enableFooter(false);
}