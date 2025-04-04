import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeDetailsRoutingModule } from './recipe-details-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPlus, faStar, faWeight, faClock, faCheck, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { RatingComponent } from './rating/rating.component';
import { CommentsComponent } from '../comments/comments/comments.component';
import { CommentComponent } from '../comments/comment/comment.component';
import { PostCommentComponent } from '../comments/post-comment/post-comment.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        RecipeDetailsRoutingModule,
        SharedModule,
        FontAwesomeModule,
        FormsModule,
        RecipeComponent,
        RatingComponent,
        CommentsComponent,
        CommentComponent,
        PostCommentComponent
    ],
})
export class RecipeDetailsModule { 
  constructor(){
    const library = inject(FaIconLibrary);

    library.addIcons(faPlus, faStar, faWeight, faClock, faCheck, faTimes, faUsers);
  }
 }
