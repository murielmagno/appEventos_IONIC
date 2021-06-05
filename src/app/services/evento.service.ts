import { Evento } from './../interfaces/evento';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private eventosCollection: AngularFirestoreCollection<Evento>;

  constructor(private afs: AngularFirestore) {
    this.eventosCollection = this.afs.collection<Evento>('Eventos');
  }

  getEventos() {
    return this.eventosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addEvento(evento: Evento) {
    return this.eventosCollection.add(evento);
  }

  getEvento(id: string) {
    return this.eventosCollection.doc<Evento>(id).valueChanges();
  }

  updateEvento(id: string, evento: Evento) {
    return this.eventosCollection.doc<Evento>(id).update(evento);
  }

  deleteEvento(id: string) {
    return this.eventosCollection.doc(id).delete();
  }

}
