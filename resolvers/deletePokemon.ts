import {Request,Response} from "npm:express@4.18.2";
import { ModeloPokemon } from "../db/pokemons.ts";


export default async function deletePokemon(req:Request,res:Response){
  try {
    const id= req.params.id
console.log(id)
    const existe= await ModeloPokemon.findByIdAndDelete(id)
    if(!existe){
        throw new Error("No existe nigún pokemon con ese id")
    }
    return res.status(200).send(existe)
  } catch (error) {
    return res.status(400).send(error.message)
  }

}