import { Component, OnInit, Input } from '@angular/core';
import { RecipesService } from '../../shared/sharedServices/recipes.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag: any;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
  }

  fetchTaggedRecipes() {
    const options = this.tag.tagParams 
        //await this.$store.dispatch('fetchQueriedRecipes', params)
        //this.$router.push({ name: 'render_results' })
        this.recipesService.getRecipesByQuery(options).subscribe((res) => {
          if(res) {
            console.log(res)
          }
          
        }, error => {
          console.log(error.statusText);
        });
     
  }

}
