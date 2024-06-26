const knex = require("../knex");

class Comment {
  constructor({id, program_id, user_id, organization_id, body, date, edited}) {
    this.program_id = program_id;
    this.organization_id = organization_id;
    this.id = id,
    this.user_id = user_id;
    this.body = body;
    this.date = date;
    this.edited = edited
  }

  static async list() {
    const query = "SELECT * FROM comments";
    const { rows } = await knex.raw(query);
    return rows.map((comment) => new Comment(comment));
  }

  static async findById(id) {
    const query = "SELECT * FROM comments WHERE id = ?";
    const { rows } = await knex.raw(query, [id]);
    const comment = rows[0];
    return comment ? new Comment(comment) : null;
  }

  static async findByUser(user_id) {
    const query = "SELECT * FROM comments WHERE user_id = ?";
    const { rows } = await knex.raw(query, [user_id]);
    const comment = rows[0];
    return comment ? new Comment(comment) : null;
  }

  static async create({ program_id, user_id, organization_id, body, date }) {
    // console.log("TeSTING:", {program_id, user_id, organization_id});
    const query = `
    INSERT INTO comments (program_id, user_id, organization_id, body, date, edited)
    VALUES (?, ?, ?, ?, ?, FALSE)
    RETURNING *
    `;
    const { rows } = await knex.raw(query, [
      program_id,
      user_id || null,
      organization_id || null,
      body,
      date,
    ]);
    const comment = rows[0];
    return comment !== null ? new Comment(comment) : null;
  }

  static async update(id, body) {
    const query = `
    UPDATE comments
    SET body = ?, edited = TRUE
    WHERE id = ?
    RETURNING *
    `;
    const { rows } = await knex.raw(query, [body, id]);
    const comment = rows[0];
    return comment ? new Comment(comment) : null;
  }

  static async deleteComment(id) {
    // console.log(id);
    const query = `
    DELETE FROM comments
    WHERE id = ?
    RETURNING *
    `;
    const { rows } = await knex.raw(query, [id]);
    const comment = rows[0];
    return comment ? new Comment(comment) : null;
  }

  static deleteAll() {
    return knex("comments").del();
  }
}

module.exports = Comment;
