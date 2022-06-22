import { followsRepository } from "../repositories/followsRepository.js";
import { postsRepository } from "../repositories/postsRepository.js";
import { usersRepository } from "../repositories/usersRepository.js";

export async function getUsers(req, res) {
  const { name } = req.query;
  try {
    let users = null;
    if (!name) {
      const result = await usersRepository.selectAllUsers();
      users = result.rows;
    } else {
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
  const { userId } = res.locals;

  try {
    const postResult = await postsRepository.getUserPosts(requestedUser.id);
    const posts = postResult.rows;

    const followResult = await followsRepository.getIfUserFollows(
      userId,
      requestedUser.id
    );
    let follow;
    if (followResult.rows.length) {
      follow = true;
    } else {
      follow = false;
    }

    return res.send({
      posts,
      name: requestedUser.username,
      follow,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send("Ocorreu um erro ao buscar os posts do usuário!");
  }
}
