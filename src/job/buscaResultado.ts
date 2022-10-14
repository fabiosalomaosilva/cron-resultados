import cron from "node-cron";
import { Sorteio } from "../models/sorteio";
import sorteioRepository from "../repositories/sorteioRepository";
import buscaResultadoService from "../services/buscaResultadoService";
import { addHours, isAfter, isEqual, parse } from "date-fns";

class BuscaResultado {
  async buscaTodaNoite() {
    cron.schedule("*/15 0,23 * * *", () => {
      console.log('Job foi iniciado as ' + new Date().toTimeString() + '...');
        this.saveResult();
    });
  }

  private async saveResult() {
    const last = await sorteioRepository.getLastSorteio();
    console.log("Pegou dados na API");
    console.log(last);

    const today = new Date().toLocaleDateString();
    const currentDate = parse(today, "MM/dd/yyyy", new Date());
    const nextDt = parse(
      addHours(last.data_proximo_concurso, 2).toLocaleDateString(),
      "MM/dd/yyyy",
      new Date()
    );

    if (isEqual(nextDt, currentDate)) {
      const sorteio = await buscaResultadoService.getResultado("megasena", last.numero_concurso);

      if (sorteio as Sorteio) {
        const sorteioValido = sorteio as Sorteio;
        if (sorteioValido.numero_concurso !== last.numero_concurso) {
            const result = await sorteioRepository.addSorteio(sorteio);
            console.log("Sorteio n° " + result.numero_concurso + " foi parcialmente incluído no BD!");
          }      }
    }    

    if (isAfter(nextDt, currentDate) && !last.rateio_processamento) {
        const sorteio = await buscaResultadoService.getResultado("megasena", last.numero_concurso);
        if (sorteio as Sorteio) {
            const sorteioValido = sorteio as Sorteio;    
            if (sorteioValido.rateio_processamento) {
                const result = await sorteioRepository.editSorteio(sorteioValido);
                if(result){
                    console.log("Sorteio n° " + sorteioValido.numero_concurso + " foi totalente incluído no BD!");
                }
            }
        }
    } else {
        console.log('Não vai processar nada; Rateio já processado....')
    }  
    console.log("Job finalizado...");
  }
}

export default new BuscaResultado();
