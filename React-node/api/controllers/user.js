import connection from './db.js';

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  connection.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const { nome, email, telefone, data_nascimento } = req.body;
  const q = "INSERT INTO usuarios (`nome`, `email`, `telefone`, `endereco`, `numero`, `bairro`, `complemento`, `data_nascimento`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [nome, email, telefone, endereco, numero, bairro, complemento, data_nascimento];

  connection.query(q, values, (err, result) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json({ message: "Usuário criado com sucesso", id: result.insertId });
  });
};

export const updateUser = (req, res) => {
  const { nome, email, telefone, endereco, numero, bairro, complemento, data_nascimento } = req.body;
  const { id } = req.params;
  const q = "UPDATE usuarios SET `nome` = ?, `email` = ?, `telefone` = ?,`endereco` = ?,`numero` = ?,`bairro` = ?`,complemento` = ? `data_nascimento` = ? WHERE `id` = ?";
  const values = [nome, email, telefone, endereco, numero, bairro, complemento, data_nascimento, id];

  connection.query(q, values, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM usuarios WHERE `id` = ?";
  
  connection.query(q, [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  });
};
