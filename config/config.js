const cookieOptions = (days,token="refresh") => {
    return {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: token==="access"?1000 * 15 : 1000 * 60 * 60 * 24 * days
    }
} 

module.exports=cookieOptions