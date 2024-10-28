function showUserVideoTutorialsPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");

    page_info.innerHTML="Náučné videá prihlásení";
    root.innerHTML=`

    `;
    closeMenu();
    enableFooter(false);
}