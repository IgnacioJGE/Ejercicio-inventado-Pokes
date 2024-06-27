import {Request,Response} from "npm:express@4.18.2";
import { ModeloPokemon } from "../db/pokemons.ts";


export default async function getallPokemons(req:Request,res:Response){
  try {
    const existe= await ModeloPokemon.find()
    if(!existe){
        throw new Error("No hay pokemons")
    }
    return res.status(200).send(existe)
  } catch (error) {
    return res.status(400).send(error.message)
  }

}