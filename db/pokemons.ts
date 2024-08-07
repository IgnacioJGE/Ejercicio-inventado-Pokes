import mongoose from "npm:mongoose@7.6.3"
import { Pokemon } from "../types.ts"


const Schema= mongoose.Schema;



const schemapokemon= new Schema({
    nombre:{type:String,required:true},
    id:{type:Number,required:true},
    url:{type:String,required:true},
    types:{type:[String],required:true}
},)

export type tipopokemon= mongoose.Document & (Pokemon)

schemapokemon.pre("save",async function(next){
    const existe= await mongoose.models.Pokemons.findOne({nombre:this.nombre})
    if(existe){
        return next(new Error(
            `nombre:${this.nombre},
            id:${this.id},
            url:${this.url},
            types:${this.types}`))
    }
    next()
})

export const ModeloPokemon= mongoose.model<tipopokemon>("Pokemons",schemapokemon)