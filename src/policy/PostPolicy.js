const pool = require('../database');


module.exports = {
    validateFields,
    validateId,
}

async function validateFields(req, res, next){

    const { title, author, description } = req.body;

    if(title && author && description){
        console.log("DATA OK");
        next();
    }else{
        const info = {
            status: 'error 400 Bad request',
            response: 'problemas con la información',
        };
        res.status(400).json(info);
    }

}

async function validateId(req, res, next){

    const { post_id } = req.params;

    // console.log(req.params);
    // console.log(post_id);

    const post = await pool.query('SELECT * FROM post WHERE post_id ='+post_id+' ORDER BY date_added DESC');

    if(post){
        console.log("DATA OK");
        next();
    }else{
        const info = {
            status: 'error 400 Bad request',
            response: 'no se encontro el registro'
        }
        res.status(400).json(info);
    }

}