import { Estacionamento } from 'Estacionamento';
import { database } from 'sqlite3';

export function Estacionamento(app: Estacionamento, db: database) {
    app.get("/Estacionamento", async (req, res) => {
        const result = await db.all("select * from usuario");
        res.json(result);
    });

    app.post("/Estacionamento", async (req, res) => {
        try {
            const result = await db.run(`INSERT INTO usuario(Nome,Email,Endereço, CNPJ, senha) 
                                      VALUES (:Nome,:Email,:Endereço, CNPJ, senha)`,
                {
                    ':Nome': req.body.Nome,
                    ':Email': req.body.Email,
                    ':Endereço': req.body.Endereço,
                    ':CNPJ': req.body.CNPJ,
                    ':senha': req.body.senha
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

    app.put("/Estacionamento/:id", async (req, res) => {
        try {
            const result = await db.run(`UPDATE usuario set Nome= :Nome,Email= :Email, Endereço= :Endereço,
                                          CNPJ= :CNPJ, senha= :senha, WHERE id= :id`,
                {
                    ':id': req.params.id,
                    ':Nome': req.body.Nome,
                    ':Email': req.body.Email,
                    ':Endereço': req.body.Endereço,
                    ':CNPJ': req.body.CNPJ,
                    ':senha': req.body.senha
                    
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
    app.delete("/Estacionamento/:id", async (req, res) => {
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
