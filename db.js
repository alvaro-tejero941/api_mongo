const {MongoClient,ObjectId}=  require ("mongodb");

function conectar(){
    return  MongoClient.connect("mongodb+srv://alvaro:lo3a0tv8GFHsYKRk@prueba.1opc55w.mongodb.net/");
}

function leerColores(){
    return new Promise(async (ok,ko) =>{
        try{ 
            let conexion = await conectar();
            let colores = await conexion.db("colores").collection("colores").find({}).toArray()
                ok(colores.map(({_id,r,g,b}) =>{
                    return {id:_id, r, g, b}
                }));
                console.log(colores);
                conexion.close();

        }catch(error){
            ko(console.log(error));
        }

    })
}

function crearColores(r,g,b){
    return new Promise(async (ok,ko) =>{
    try{
        let conexion = await conectar();
        let {insertedId} = await conexion.db("colores").collection("colores").insertOne({r,g,b});
            
        conexion.close();
        ok(insertedId);

    }catch(error){
        ko(console.log(error));
    }
    })
}

function borrarColor(id){
    return new Promise(async (ok,ko) =>{
        try{
            let conexion = await conectar();
            let {deletedCount} = await conexion.db("colores").collection("colores").deleteOne({_id : new ObjectId(id)});
        conexion.close();
        ko({deletedCount});

        }catch(error){
            ko(console.log(error));
        }
    })
}
module.exports = {leerColores,crearColores,borrarColor};