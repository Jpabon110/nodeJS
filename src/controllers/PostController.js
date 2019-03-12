const pool = require('../database');
const model = require('../models/post');


module.exports = {
    
    getAll,
    remove,
    editById,
    getById,
    create,
}


async function getAll(req, res){
    
    const post = await model.getAllPost()
    console.log(post);
    res.status(200).json(post);
}

async function getById(req, res){
    const { post_id } = req.params;
    const post = await model.findByIdPost(post_id);
    res.json(post);
}

async function remove(req, res){
    const { post_id } = req.params;
    let saber = await model.removeIt(post_id);

    console.log(saber);

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

    const savIt = await model.editByIdPost(newPost,post_id);

    if(savIt.affectedRows == 0){
        const info = {
            code: 'PostNotFound'
        };
        res.status(404).json(info);
    }else{
        res.sendStatus(204);         
    }  

}

//pruebas viejas (mala practica corregir)
async function create(req, res){
    
    const { title,author,description } = req.body;
    const newLink = {
        title,
        author,
        description
    };
    
    let post = await model.createIt(newLink);

    const insertPost = model.findByIdPost(post.insertPost);

    if(!insertPost){
        throw new Error('error al ingresar');
    }else{
        res.status(201).json(insertPost[0]);
   }

}
