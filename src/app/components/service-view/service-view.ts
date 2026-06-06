import { Component, Input, OnInit } from '@angular/core';
import { ServiceModel } from '../../models/ServiceModel';

@Component({
  selector: 'app-service-view',
  imports: [],
  templateUrl: './service-view.html',
  styleUrl: './service-view.css',
})
export class ServiceView implements OnInit{
  serviceObject: ServiceModel = {serviceName: '', categoryName: '', serviceDescription: '', serviceImage: ''};

  ngOnInit(): void {
    this.serviceObject.serviceName = "Paseador de perros";
    this.serviceObject.categoryName = "Generales";
    this.serviceObject.serviceDescription = "Se pasean perros en el barrio gran granada Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim aperiam assumenda autem quas cupiditate, perferendis accusamus, optio dolores magnam incidunt expedita repellat quasi debitis totam error porro molestiae? Rem, quis."  
    this.serviceObject.serviceImage = "https://radionacional-v3.s3.amazonaws.com/s3fs-public/styles/portadas_relaciona_4_3/public/node/article/field_image/Fotografía%20del%20IDPYBA.jpg?h=042dbf4a&itok=gwvJGEe_";
  }

}
