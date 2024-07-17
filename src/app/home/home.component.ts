import { Component } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  allPostes:any;
  poste:any;
  constructor(private postes: PostsService, private toast : ToastService){

}

  async ngOnInit(){

    this.allPost()

  }

async allPost(){
  this.postes.getPostes().subscribe((data:any)=>{
    this.allPostes = data;
    console.log('todos os postes', this.allPostes);

  });

}
  message = new FormGroup({
    title: new FormControl(null),
    body: new FormControl(null),
    userId: new FormControl(10),

  });
  sendMessage(){
    console.log('valores', this.message.value);
    this.postes.newPoste(this.message.value).subscribe((data:any)=>{
      if(data){
        this.message.reset();
        this.toast.showSuccess('Mensagem Salva', 'Sucess');


      }else{

      }
      console.log('data do post', data);
      this.allPost();

    })

  }

  async deleteMessage(id:any){
    console.log('id a excluir', id);
    const params = {id:id}
    console.log(params);
    this.postes.deletePoste(params).subscribe((data:any)=>{
      this.toast.showSuccess('Mensagem Excluida', 'Sucess');
      console.log('delete', data)
      this.allPost();

    })


  }

  editPoste(id:any){
    console.log('id a ser editado', id)
    this.postes.getPosteId(id).subscribe((data:any)=>{
      this.poste = data;
      console.log('poste buscado', this.poste);
      this.message = new FormGroup({
        title: this.poste.title,
        body: this.poste.body,
        userId: this.poste.userId,

      });
    })


  }

}
