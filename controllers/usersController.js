import { usersRepository } from "../repositories/usersRepository.js";

export async function getUsers(req, res) {
    const { name } = req.query;
    try {
        let users = null;
        if (!name) {
            const result = await usersRepository.selectAllUsers();
            users = result.rows;
        }
        else {
            const result = await usersRepository.selectUsersByName(name);
            users = result.rows;
        }

        return res.send(users);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao buscar os usuários!");
    }
}

export async function getUserPosts(req, res) {
    const {requestedUser} = res.locals;
    res.send(`Buscando o usuário ${requestedUser.username}`);
}