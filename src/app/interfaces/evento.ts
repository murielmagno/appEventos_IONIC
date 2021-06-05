import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface Evento {
  id?: string,
  nome?: string,
  descricao?: string,
  criadoPor?: string,
  dataEvento?: Date,
  createdAt?: number,
  picture?: string;
}
