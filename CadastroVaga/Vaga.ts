import { Vaga } from 'Vaga';
import { database } from 'sqlite3';

export function Vaga(app: Vaga, db: database) {
    app.get("/Vaga", async (req, res) => {
        const result = await db.all("select * from usuario");
        res.json(result);
    });

    app.post("/Vaga", async (req, res) => {
        try {
            const result = await db.run(`INSERT INTO usuario(quantVaga) 
                                      VALUES (:quantVaga)`,
                {
                    ':quantVaga': req.body.quantVaga,
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

    app.put("/Vaga/:id", async (req, res) => {
        try {
            const result = await db.run(`UPDATE usuario set quantVaga= :quantVaga,email= :email WHERE id= :id`,
                {
                    ':id': req.params.id,
                    ':quantVaga': req.body.quantVaga,
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
    app.delete("/Vaga/:id", async (req, res) => {
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
