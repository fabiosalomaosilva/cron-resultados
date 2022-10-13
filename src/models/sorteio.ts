import { Premiacao } from "./premiacao";

export interface Sorteio {
    nome: string;
    numero_concurso: number;
    data_concurso: Date;
    data_concurso_milliseconds: number;
    local_realizacao: string;
    rateio_processamento: boolean;
    acumulou: boolean;
    valor_acumulado: number;
    dezenas: string[];
    premiacao: Premiacao[];
    local_ganhadores: any[];
    arrecadacao_total: number;
    concurso_proximo: number;
    data_proximo_concurso: Date;
    data_proximo_concurso_milliseconds: number;
    valor_estimado_proximo_concurso: number;
    valor_final_concurso_acumulado: number;
    numero_final_concurso_acumulado: number;
    valor_acumulado_especial: number;
    nome_acumulado_especial: string;
    concurso_especial: boolean;
}
