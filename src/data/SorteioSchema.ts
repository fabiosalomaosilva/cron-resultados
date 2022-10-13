import mongoose, { Schema } from 'mongoose';
import { Sorteio } from '../models/sorteio';

const sorteioSchema = new Schema<Sorteio>(
    {
        nome: {
          type: String
        },
        numero_concurso: {
          type: Number
        },
        data_concurso: {
          type: Date
        },
        data_concurso_milliseconds: {
          type: Number
        },
        local_realizacao: {
          type: String
        },
        rateio_processamento: {
          type: Boolean
        },
        acumulou: {
          type: Boolean
        },
        valor_acumulado: {
          type: Number
        },
        dezenas: {
          type: [
            String
          ]
        },
        premiacao: {
          type: [ {
            nome:String,
            quantidade_ganhadores: Number,
            valor_total: Number,
            acertos: Number,
          } ]
        },
        local_ganhadores: {
          type: [{
            local:String,
            cidade:String,
            uf:String,
            quantidade_ganhadores:Number,
            canal_eletronico:Boolean,
        }]
        },
        arrecadacao_total: {
          type: Number
        },
        concurso_proximo: {
          type: Number
        },
        data_proximo_concurso: {
          type: Date
        },
        data_proximo_concurso_milliseconds: {
          type: Number
        },
        valor_estimado_proximo_concurso: {
          type: Number
        },
        valor_final_concurso_acumulado: {
          type: Number
        },
        numero_final_concurso_acumulado: {
          type: Number
        },
        valor_acumulado_especial: {
          type: Number
        },
        nome_acumulado_especial: {
          type: String
        },
        concurso_especial: {
          type: Boolean
        }
      }
  );

  export const SorteioModel = mongoose.model('Sorteio', sorteioSchema);

