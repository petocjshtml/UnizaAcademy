async function checkAdmin(req, res, userController){
    const isAdmin = await userController.isAdmin(req.userId);
    if(!isAdmin)
    {
        res.status(400).send( { success: false, message: "User has no admin privilegies!" });     
        return isAdmin;
    }
    return isAdmin;
}

module.exports = checkAdmin;