function isUserLoggedIn()
{
    const user = getUserFromLS();
    if(user)
    {
        return true;
    }
    return false;
}

function getUserFromLS() 
{
    return nacitatZLocalStorage("user");
}

function getLoginStatus()
{
    const user = getUserFromLS(); 
    if(user)
    {
        if(user.isAdmin)
            return "admin";
        else
        return "user";
    }
    return "unlogged";
}