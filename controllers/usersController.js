import { postsRepository } from "../repositories/postsRepository.js";
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
        return res.status(500).send("Ocorreu um erro ao buscar os usuários!");
    }
}

export async function getUserPosts(req, res) {
    const { requestedUser } = res.locals;

    try {
        const result = await postsRepository.getUserPosts(requestedUser.id);
        const posts = result.rows;
        return res.send({
            posts,
            name: requestedUser.username
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send("Ocorreu um erro ao buscar os posts do usuário!");
    }
}