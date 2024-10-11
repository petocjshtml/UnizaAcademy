function showAdminUsersPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Stránka pre správu používateľov";
    root.innerHTML=`

    `;
    closeMenu();
    enableFooter(false);
}