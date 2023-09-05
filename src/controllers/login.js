const transporter = require("../mail");
const compiladorHTML = require("../utils/compiladorHTML");

const user = {
  nome: "Fernando Carvalho",
  email: "fernando_scarvalho@hotmail.com",
  senha: "123abc",
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (user.email !== email)
    return res.status(404).json({ message: "Email ou senha invalidos!" });
  if (user.senha !== senha)
    return res.status(404).json({ message: "Email ou senha invalidos!" });

  const html = await compiladorHTML("./src/templates/mail_template.html", {
    nomeusuario: user.nome,
  });

  transporter.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${user.nome} <${user.email}>`,
    subject: "Verificão de integração",
    html,
  });

  return res.status(200).json({ message: "Login efetuado com sucesso!" });
};
module.exports = login;
