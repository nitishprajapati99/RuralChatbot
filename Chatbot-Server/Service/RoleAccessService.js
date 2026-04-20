class RoleAccess{
    AdminAccess(role){
        if(!role){
            throw new Error("The user role is not provided to serivce")
        }
        if(role!=="admin"){
            throw new Error("Admin access required")
        }
        return
    }
}

module.exports = RoleAccess