const expres = require("express");
const servidor = expres();
const {leerColores,crearColores,borrarColor} = require("./db");
const {json} = require("body-parser");
const cors = require("cors");

servidor.use(expres.static("./estatico"));

servidor.use(cors());
servidor.use(json());

servidor.get("/colores",async (peticion,respuesta) => {
    try{
        let colores = await leerColores();        
        respuesta.json(colores);

    }catch(error){
        respuesta.status(500);
        respuesta.json(error);
    }
});

//crear middleware con Post en la url "/nuevo" que responda con cualquier cosa
servidor.post("/nuevo", async (peticion,respuesta) => {
    try{
        let id = await crearColores(peticion.body);
        respuesta.json({id});
    }catch(error){
        respuesta.status(500);
        respuesta.json(error);
    }
});

servidor.delete("/colores/borrar/:id([0-9abcdef]24)", async (peticion,respuesta) => {
    try{
        let count = await borrarColor(peticion.params.id);
        console.log(peticion.params.id);
        respuesta.status(200);
        respuesta.json({resultado : count ? "ok" : "ko"});

    }catch(error){
        respuesta.status(500);
        respuesta.json(error);
    }
});

servidor.listen(3000);