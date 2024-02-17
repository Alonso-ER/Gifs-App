import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent{
  //! Inyectar el servicio en el sidebar
  //! Duplicar el elemeto del html dependiendo de cuantas entradas tenga
  //! gifservice
  //? Propiedad publica ue el html pueda ver
  // private

  constructor(private gifsService: GifsService) {}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
    // console.log(tagList)
  }
  searchTag(tag: string): void{
    this.gifsService.searchTag(tag);
  }

}
