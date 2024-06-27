import {Request,Response} from "npm:express@4.18.2";
import axios from "npm:axios"
import { ModeloPokemon } from "../db/pokemons.ts";


export default async function(req:Request,res:Response){
  try {
    const id= req.params.id

    const existe= await ModeloPokemon.findById(id)
    if(!existe){
        throw new Error("No existe nigún pokemon con ese id")
    }
    return res.status(200).send(existe)
  } catch (error) {
    return res.status(400).send(error.message)
  }

}