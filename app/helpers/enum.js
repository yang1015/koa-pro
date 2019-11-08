
function checkLoginType(val) {
    for (let key in this) {
        if (this[key] === val) return true
    }
    return false
}

const LoginType = {
    WECHAT_LOGIN: 101,
    MOBILE_LOGIN: 102,
    ACCPWD_LOGIN: 103,
    checkLoginType
}

module.exports = { LoginType }