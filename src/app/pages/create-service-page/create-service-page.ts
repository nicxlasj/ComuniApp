import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-service-page',
  imports: [],
  templateUrl: './create-service-page.html',
  styleUrl: './create-service-page.css',
})
export class CreateServicePage {
  showModal = signal(false);
  private authService = inject(AuthService);
  email = '';
  async onSubmit(event: Event) {
    event.preventDefault();
    this.showModal.set(true);
    this.email = this.authService.getCurrentEmail();
    const sendObj = {
      'data-raw': {
        subject: 'Notificacion nuevo servicio creado',
        description: 'Usted ha agregado un nuevo servicio a ComuniApp.',
        mails: [this.email, 'automatizacionn8ncorreo@gmail.com']
      }
    };
    console.log(sendObj);
    const url = 'https://n8nautomatizacionibero.app.n8n.cloud/webhook/notifaction-services-comuniapp';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendObj)
    });
    console.log(response);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
