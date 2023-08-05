import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

  categories:any;
  constructor(private category:CategoryService, ){}
  ngOnInit(): void {
    
    this.category.getCategories().subscribe(
      (data:any)=>{

        console.log('Success !!')
        this.categories = data;
      },

      (error)=>{

        console.log("Error !!");
        console.log(error);

        Swal.fire('Error !!','Error in loading data.','error');
      }
    )
  }

}
