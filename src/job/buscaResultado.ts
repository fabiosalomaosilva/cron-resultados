import cron from "node-cron";
import { Sorteio } from "../models/sorteio";
import sorteioRepository from "../repositories/sorteioRepository";
import buscaResultadoService from "../services/buscaResultadoService";
import { addHours, isAfter, isEqual, parse, addDays } from "date-fns";

class BuscaResultado {
  async buscaTodaNoite() {
    cron.schedule("*/15 0,23 * * *", () => {
      console.log("Job foi iniciado as " + new Date().toTimeString() + "...");
      this.saveResult();
    });
  }

  private async saveResult() {
    const sorteioBancoDados = await sorteioRepository.getLastSorteio();
    const sorteioApi = await buscaResultadoService.getResultado(
      "megasena",
      sorteioBancoDados.numero_concurso + 1
    );
    console.log("Pegou dados no banco de dados e na API...");

    if (sorteioApi as Sorteio) {
      const sorteioValido = sorteioApi as Sorteio;
      if (sorteioBancoDados.numero_concurso < sorteioValido.numero_concurso) {
        const result = await sorteioRepository.addSorteio(sorteioApi);
        if (result.rateio_processamento) {
          console.log("Sorteio n° " + result.numero_concurso + " foi parcialmente incluído no BD!");
        } else {
          console.log("Sorteio n° " + result.numero_concurso + " foi incluído no BD!");
        }
      }else{
        console.log("Sorteio n° " + sorteioBancoDados.numero_concurso + " já havia sido incluído no BD!");
      }


      if (
        sorteioBancoDados.numero_concurso === sorteioValido.numero_concurso &&
        sorteioBancoDados.rateio_processamento
      ) {
        const result = await sorteioRepository.editSorteio(sorteioValido);
        if (result) {
          console.log("Sorteio n° " + sorteioValido.numero_concurso + " foi totalente incluído no BD!");
        }
      } else {
        console.log("Não vai processar nada; Rateio já processado....");
      }
    }
    await sorteioRepository.removeDuplicados();
    console.log("Job finalizado...");
  }
}

export default new BuscaResultado();
