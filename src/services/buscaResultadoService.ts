import { AxiosInstance } from "axios";
import Api from "../data/Api";
import { Sorteio } from "../models/sorteio";
import sorteioRepository from "../repositories/sorteioRepository";
import * as dotenv from "dotenv";

class BuscaResultadoService {
  private api: AxiosInstance;
  
  constructor() {
    dotenv.config();
    this.api = Api.ApiInstance;
  }

  async getResultado(nomeLoteria: string, numeroSorteio: number = 0): Promise<Sorteio | null> {
    let url;
    const pathMegaSena = process.env.RESULTADOS_API_PATH_MEGASENA;
    const token = process.env.TOKEN_API;
    if (numeroSorteio === 0) {
      url = `${pathMegaSena}&token=${token}`;
    } else {
      url = `${pathMegaSena}&concurso=${numeroSorteio}&token=${token}`;
    }
    let resposta: Sorteio | null = null;

    try{
        const response = await this.api.get<Sorteio>(url);
        resposta = response.data;
        await sorteioRepository.addSorteio(resposta)
    } catch(error){
        console.log(error);
    }

    return resposta;
  }
}

export default new BuscaResultadoService();
