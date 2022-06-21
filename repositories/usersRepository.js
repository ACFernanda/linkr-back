import db from "../config/db.js";

async function selectAllUsers() {
    const query = `
        SELECT id, username AS name, "pictureURL" FROM users;
    `;

    return db.query(query);
};

async function selectUsersByName(username) {
    const formatedName = `${username}%`;
    const query = `
        SELECT id, username AS name, "pictureURL"
        FROM users
        WHERE username ILIKE $1;
    `;

    const values = [formatedName];

    return db.query(query, values);
};

async function selectUserById(userId) {
    const query = `
        SELECT * 
        FROM users
        WHERE id = $1 
    `;

    const values = [userId];

    return db.query(query, values);
};

async function selectUserByEmail(email) {
    const query = `
        SELECT * 
        FROM users
        WHERE email = $1
    `;

    const values = [email];
    return db.query(query, values);
}

async function insertNewUser(user) {
    const {username, email, passwordHash, imageURL} = user;
    const query = `
        INSERT INTO users (email, password, username, "pictureURL") 
        VALUES ($1, $2, $3, $4);
    `;

    const values = [email, passwordHash, username, imageURL];
    return db.query(query, values);
}

export const usersRepository = {
    selectAllUsers,
    selectUsersByName,
    selectUserById,
    selectUserByEmail,
    insertNewUser
};