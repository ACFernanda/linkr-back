import db from "./../config/db.js";

export async function ownerCheck(req, res, next) {
    
    const {userId}=res.locals
    const {id}=req.params
    const idInteger=parseInt(id)
   try{
    const result=await db.query(`
        SELECT "userId" FROM posts 
        WHERE id=$1
    ;`,[idInteger])
    if(result.rowCount!=1){return res.status(404).send("Post não encontrado!")}
    if(result.rows[0].userId===userId){next()}
    else{ res.status(402).send("O usuário não é dono do post!")}
   }
   catch (e) {
    console.log(e);
    res.status(500).send("Ocorreu um erro ao autorizar!");
  }
}
