import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private api: ApiService) {

  }

  getPostes() {
    return this.api.get('posts', false);
  }
  newPoste(data:any) {
    return this.api.post('posts', data);
  }
  deletePoste(id:any) {
    return this.api.delete('posts', id);
  }
}
