import { Carro } from 'Carro';
import { database } from 'sqlite3';

export function Carro(app: Carro, db: database) {
    app.get("/Carro", async (req, res) => {
        const result = await db.all("select * from usuario");
        res.json(result);
    });

    app.post("/Carro", async (req, res) => {
        try {
            const result = await db.run(`INSERT INTO usuario(Placa,Modelo,Ano) 
                                      VALUES (:Placa,:Modelo,:Ano)`,
                {
                    ':Placa': req.body.Placa,
                    ':Modelo': req.body.Modelo,
                    ':Ano': req.body.Ano,
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

    app.put("/Carro/:id", async (req, res) => {
        try {
            const result = await db.run(`UPDATE usuario set Placa= :Placa,Modelo= :Modelo, Ano= :Ano,
                                          WHERE id= :id`,
                {
                    ':id': req.params.id,
                    ':Placa': req.body.Placa,
                    ':Modelo': req.body.Modelo,
                    ':Ano': req.body.Ano,
                    
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
    app.delete("/Carro/:id", async (req, res) => {
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
