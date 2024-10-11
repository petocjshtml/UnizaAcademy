function isUserLoggedIn()
{
    return false;
}

function getUserFromLS() 
{
    const user = nacitatZLocalStorage("user");
    // return user;
    // simulované:
    return {
        id:"mongo id of user here",
        nickname: "Terminator44",
        email: "jozkomrkvicka@stud.uniza.sk",
        jwt_token:"store jwt token here",
        is_admin: false,
    };
}