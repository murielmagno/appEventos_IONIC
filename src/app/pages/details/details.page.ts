import { Evento } from './../../interfaces/evento';
import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private eventoId: string = null;
  public evento: Evento = {};
  private loading: any;
  private eventoSubscription: Subscription;

  constructor(
    private eventoService: EventoService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.eventoId = this.activatedRoute.snapshot.params['id'];

    if (this.eventoId) this.loadEvento();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.eventoSubscription) this.eventoSubscription.unsubscribe();
  }

  loadEvento() {
    this.eventoSubscription = this.eventoService.getEvento(this.eventoId).subscribe(data => {
      this.evento = data;
    });
  }

  async saveEvento() {
    await this.presentLoading();

    this.evento.criadoPor = this.authService.getAuth().name;

    if (this.eventoId) {
      try {
        await this.eventoService.updateEvento(this.eventoId, this.evento);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.evento.createdAt = new Date().getTime();

      try {
        await this.eventoService.addEvento(this.evento);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvare');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
