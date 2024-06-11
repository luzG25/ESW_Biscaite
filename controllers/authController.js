
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


//registar usuario em auth
const registrarUser = async (req, res) => {
  const { id_cliente, email, password } = req.body; 

  try {
      let user = await User.findOne({ email });
      if (user) {
          return res.status(400).json({ msg: 'Usuário já existe' });
      }

      user = new User({ id: id_cliente, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
          user: {
              id: user.id,
          },
      };

      jwt.sign(payload, 'secreto', { expiresIn: '1000h' }, (err, token) => {
          if (err) throw err;
          res.json({ token });
      });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Erro no servidor');
  }
};

//fazer login no sistema
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Credenciais inválidas' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Credenciais inválidas' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(payload, 'secreto', { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Erro no servidor');
    }
}

//modificar dados de acesso
const modUser = async (req, res, next) => {
  try {
    const id = req.body.id;
    let {email, password, oldpassword} = req.body

    let user = await User.findOne({ id });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciais inválidas' });
    }
  
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Palavra-passe antiga nao corresponde' });
    }
    
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    await User.updateOne({ id: id }, { email: email, password: password });

  
    res.json({ message: 'Dados atualizados com sucesso' });

  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Erro no servidor: ' + error.message);
  }
}

module.exports = {registrarUser, login, modUser}