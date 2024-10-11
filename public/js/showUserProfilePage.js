function showUserProfilePage(userFromLS)
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");

    const userId = userFromLS.id;
    const userNick = userFromLS.nickname;
    const userEmail = userFromLS.email;
    const userJwtToken = userFromLS.jwt_token;
    const isUserAdmin = userFromLS.is_admin;
    
    page_info.innerHTML="Profil";
    root.innerHTML=`

    `;
    closeMenu();
    enableFooter(false);
}