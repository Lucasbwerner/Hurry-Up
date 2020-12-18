import { Cadastro } from 'Cadastro';
import { database } from 'sqlite3';

export function Cadastro(app: Cadastro, db: database) {
    app.get("/Cadastro", async (req, res) => {
        const result = await db.all("select * from usuario");
        res.json(result);
    });

    app.post("/Cadastro", async (req, res) => {
        try {
            const result = await db.run(`INSERT INTO usuario(nome,email,CPF,senha,repitasenha) 
                                      VALUES (:nome,:email,:CPF,:senha,:repitasenha)`,
                {
                    ':nome': req.body.nome,
                    ':email': req.body.email,
                    ':CPF': req.body.CPF,
                    ':senha': req.body.senha,
                    ':repitasenha:': req.body.repitasenha
                });
            res.json({ mensagem: "deu certo" });
        } catch (e) {
            res.status(500);
            res.json({
                mensagem: "Erro no bd",
                detalhe: e
            })
        }
    });

    app.put("/Cadastro/:id", async (req, res) => {
        try {
            const result = await db.run(`UPDATE usuario set nome= :nome,email= :email, CPF= :CPF,
                                          senha= :senha, repitasenha= :repitasenha WHERE id= :id`,
                {
                    ':id': req.params.id,
                    ':nome': req.body.nome,
                    ':email': req.body.email,
                    ':CPF': req.body.CPF,
                    ':senha': req.body.senha,
                    ':repitasenha': req.body.repitasenha
                });
            res.json({ mensagem: "deu certo" });

        } catch (e) {
            res.status(500);
            res.json({
                mensagem: "Erro no bd",
                detalhe: e
            })
        }
    });
    app.delete("/Cadastro/:id", async (req, res) => {
        try {
            const result: any = await db.run(`DELETE FROM usuario WHERE id= ?`, req.params.id);
            if (result.changes > 0) {
                res.json({
                    mensagem: "deu certo"
                });
            } else {
                res.status(202); 
                res.json({ mensagem: "Registro não encontrado!" });
            }
        } catch (e) {
            res.status(500);
            res.json({
                mensagem: "Erro no bd",
                detalhe: e
            })
        }
    });
}
