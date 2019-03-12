const pool = require('../database');

module.exports = {
    
    getAllPost,
    findByIdPost,
    removeIt,
    editByIdPost,
    createIt
}

async function getAllPost(res){


    const post = await pool.query('SELECT * FROM post ORDER BY date_added DESC');
    // res.json(post);

    return post;

}

async function findByIdPost(post_id){


    
    const post = await pool.query('SELECT * FROM post WHERE post_id ='+post_id+' ORDER BY date_added DESC');

    return post;

}

async function removeIt(post_id){

    let saber = await pool.query('DELETE FROM post WHERE post_id = ?',[post_id]);

    return saber;

}

async function editByIdPost(newPost,post_id){

    const savIt = await pool.query('UPDATE post set ? WHERE post_id =?',[newPost,post_id]);

    return savIt;

}

async function createIt(newLink){

    let create = await pool.query( ` 
                                INSERT INTO post 
                                set date_added = NOW(),  ?
                                `, [newLink]);

    return create;

}


