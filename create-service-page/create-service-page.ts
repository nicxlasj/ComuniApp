import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-create-service-page',
  imports: [],
  templateUrl: './create-service-page.html',
  styleUrl: './create-service-page.css',
})
export class CreateServicePage {
  showModal = signal(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
