import { EventoService } from './../../services/evento.service';
import { Evento } from './../../interfaces/evento';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private eventos = new Array<Evento>();
  private eventosSubscription: Subscription;
  private loading: any;

  constructor(private eventosService: EventoService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    this.eventosSubscription = this.eventosService.getEventos().subscribe(data =>{
      this.eventos =data;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    // this.eventosSubscription.unsubscribe();
  }
  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingCtrl.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteEvento(id: string) {
    try {
      await this.eventosService.deleteEvento(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
