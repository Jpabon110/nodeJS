const pool = require('../database');


module.exports = {
    create,
    getAll,
    remove,
    editById,
    getById,
}

async function create(req, res){
    
    const { title,author,description } = req.body;
    const newLink = {
        title,
        author,
        description
    };

    let post = await pool.query( ` 
    INSERT INTO post 
    set date_added = NOW(),  ?
    `, [newLink]);
    const insertPost = await pool.query('SELECT * FROM post WHERE post_id = '+ post.insertId);

    if(!insertPost){
        throw new Error('error al ingresar');
    }else{
        res.status(201).json(insertPost[0]);
   }

}

async function getAll(req, res){
    const post = await pool.query('SELECT * FROM post ORDER BY date_added DESC');
    res.json(post);
}

async function getById(req, res){
    const { post_id } = req.params;
    const post = await pool.query('SELECT * FROM post WHERE post_id ='+post_id+' ORDER BY date_added DESC');
    res.json(post);
}

async function remove(req, res){
    const { post_id } = req.params;
    let saber = await pool.query('DELETE FROM post WHERE post_id = ?',[post_id]);

     if(saber.affectedRows == 0){
        const info = {
            code: 'PostNotFound',
        };
        res.status(404).json(info);
    }else{
        res.sendStatus(204);         
    }     
    
} 

async function editById(req, res){
    const { post_id } = req.params;
    const { title,author ,description } = req.body;
    const newPost = {
        title,
        author,
        description
    };

    const savIt = await pool.query('UPDATE post set ? WHERE post_id =?',[newPost,post_id]);

    if(savIt.affectedRows == 0){
        const info = {
            code: 'PostNotFound'
        };
        res.status(404).json(info);
    }else{
        res.sendStatus(204);         
    }  

}