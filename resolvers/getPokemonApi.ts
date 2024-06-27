import {Request,Response} from "npm:express@4.18.2";
import axios from "npm:axios"
import { ModeloPokemon } from "../db/pokemons.ts";


export default async function getPokemonsApi( req:Request,res:Response){

try {
    const name= req.params.nombre;
    const pokemonsito= await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if(!pokemonsito){
        throw new Error("Error nombre de pokemon incorrecto prueba a escibiro todo en minusculas")
    }
    const idpoke= pokemonsito.data.id;
    const urlpoke= pokemonsito.data.sprites.front_default
    const tipos=pokemonsito.data.types;
    const tiposdelpokemon:string[]=[]
    for (let index = 0; index < tipos.length; index++) {
        tiposdelpokemon.push(pokemonsito.data.types.at(index).type.name)

    }
    const newpokimon= new ModeloPokemon({
        nombre:name,
        id:idpoke,
        url:urlpoke,
        types:tiposdelpokemon
    })
    await newpokimon.save();
    return res.status(200).send({
        nombre:name,
        id:idpoke,
        url:urlpoke,
        types:tiposdelpokemon
    })
} catch (error) {
    if (error.message.startsWith("nombre:")) {
        const data = error.message.split(",");
        const nombre = data[0].split(":")[1];
        const id = parseInt(data[1].split(":")[1]);
        const url = `${data[2].split(":")[1]}${data[2].split(":")[2]}` ;
        const types:string[] =[]
        types.push( data[3].split(":")[1])
        if(data[4]){
            types.push(data[4])
        }
        return res.status(200).json({
            nombre,
            id,
            url,
            types
        });
    }
    return res.status(400).send(error.message)
}
}