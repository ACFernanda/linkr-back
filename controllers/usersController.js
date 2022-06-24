import { followsRepository } from "../repositories/followsRepository.js";
import { likesRepository } from "../repositories/likesRepository.js";
import { postsRepository } from "../repositories/postsRepository.js";
import { usersRepository } from "../repositories/usersRepository.js";

export async function getUsers(req, res) {
  const { userId } = res.locals;
  const { name } = req.query;
  try {
    let users = null;
    if (!name) {
      const result = await usersRepository.selectAllUsers(userId);
      users = result.rows;
    } else {
      const result = await usersRepository.selectUsersByName(name, userId);
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
  let offset = req.query.offset;
  offset = offset || 0;

  try {
    const postResult = await postsRepository.getUserPosts(requestedUser.id, offset);
    const posts = postResult.rows;

    const completePosts = [];
    for (let post of posts) {
      const resultLikes = await likesRepository.getLikes(post.postId);
      const likes = resultLikes.rows.map((like) => like.username);
      const likedByUser = resultLikes.rows
        .map((like) => like.userId)
        .includes(parseInt(userId));
      completePosts.push({ ...post, likes, likedByUser });
    }

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
      posts: completePosts,
      name: requestedUser.username,
      userPhoto: requestedUser.pictureURL,
      follow,
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send("Ocorreu um erro ao buscar os posts do usuário!");
  }
}
