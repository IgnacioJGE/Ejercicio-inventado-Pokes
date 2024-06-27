import express,{Request,Response} from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3"
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import getPokemonsApi from "./resolvers/getPokemonApi.ts";
import getPokemon from "./resolvers/getPokemon.ts";
import getallPokemons from "./resolvers/getPokemons.ts";
import deletePokemon from "./resolvers/deletePokemon.ts"


const env=await load()
const MONGO_URL=Deno.env.get("MONGO_URL")||env.MONGO_URL
const PORT=env.PORT||Deno.env.get("PORT")||8000

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);

}

try {
  await mongoose.connect(MONGO_URL);
  console.info("Mongo Concectado")
  const app= express();
  app.use(express.json())
  app.post("/getPokemonApi/:nombre",getPokemonsApi)
  app.get("/getPokemon/:id",getPokemon)
  app.get("/getPokemons",getallPokemons)
  app.delete("/deletePokemon/:id",deletePokemon)



  app.listen(PORT,()=> console.info ((`Te estoy escuchando desde ${PORT}`)));

} catch (error) {
  console.error(error)

}