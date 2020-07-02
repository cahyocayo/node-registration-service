let getUser = `select * from t_user where username = ? and password = ?`

let saveUser = `INSERT INTO t_user (username, password, full_name, gender) VALUES (?, ?, ?, ?)`

let getAllUser = `select * from t_user`

let deleteUser = `delete from t_user where username = ?`

let getUserById = `select * from t_user where username = ?`

let updateUser = `update t_user
SET full_name = ?,
gender = ?
where username = ?`

module.exports = {
    getUser,
    saveUser,
    getAllUser,
    deleteUser,
    getUserById,
    updateUser
}