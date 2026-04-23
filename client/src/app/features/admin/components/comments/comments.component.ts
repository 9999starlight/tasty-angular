import { Component, inject } from '@angular/core';
import { RecipeComment } from '../../../recipes/models/comment.model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { COMMENTS_OPTIONS } from '../../../../core/constants/recipes/recipe-options';
import { AdminFacade } from '../../facade/admin.facade';
import { Icons } from '../../../../shared/ui/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { SortingButtonsComponent } from '../../../../shared/components/sorting-buttons/sorting-buttons.component';
import { TooltipComponent } from '../../../../shared/components/tooltip/tooltip.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { sortByDate, sortByText, SortDirection } from '../../../../shared/utils/sorting.utils';

@Component({
  selector: 'app-comments',
  imports: [
    FontAwesomeModule,
    LoaderComponent,
    SortingButtonsComponent,
    TooltipComponent,
    RouterLink,
    DatePipe,
    AsyncPipe,
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  private adminFacade = inject(AdminFacade);
  readonly icons = Icons;
  loading$: Observable<boolean>;
  readonly commentsOptions = COMMENTS_OPTIONS;
  selectedOption$ = new BehaviorSubject<'author' | 'comment id' | 'recipe id'>('author');
  searchValue$ = new BehaviorSubject<string>('');
  commentsCount$: Observable<number>;
  filteredComments$: Observable<RecipeComment[]>;
  private commentsSort$ = new BehaviorSubject<{
    field: 'title' | 'date' | null;
    direction: SortDirection;
  }>({
    field: null,
    direction: 'asc',
  });
  constructor() {
    this.loading$ = this.adminFacade.loading$;
    this.commentsCount$ = this.adminFacade.commentsCount$;
    this.filteredComments$ = combineLatest([
      this.adminFacade.comments$,
      this.searchValue$,
      this.selectedOption$,
      this.commentsSort$,
    ]).pipe(
      map(([comments, searchValue, selectedOption, commentsSort]) => {
        const query = searchValue.trim().toLowerCase();
        const filteredComments = !query
          ? comments
          : comments.filter((comment) =>
              selectedOption === 'comment id'
                ? comment._id.toLowerCase().includes(query)
                : selectedOption === 'recipe id'
                  ? comment.commentedRecipeId.toLowerCase().includes(query)
                  : comment.author.username.toLowerCase().includes(query),
            );
        if (!commentsSort.field) {
          return filteredComments;
        }
        if (commentsSort.field === 'title') {
          return sortByText(
            filteredComments,
            (comment) => comment.author.username,
            commentsSort.direction,
          );
        }
        return sortByDate(filteredComments, (comment) => comment.createdAt, commentsSort.direction);
      }),
    );
  }

  onChangeSelect(e: any) {
    this.searchValue$.next('');
    this.selectedOption$.next(e.target.value);
  }

  filterComments(e: any) {
    this.searchValue$.next(e.target.value);
  }

  onSortChange(sortConfig: { field: 'title' | 'rating' | 'date'; direction: 'asc' | 'desc' }) {
    if (sortConfig.field === 'rating') {
      return;
    }
    this.commentsSort$.next({
      field: sortConfig.field,
      direction: sortConfig.direction,
    });
  }

  deleteComment(id: string) {
    if (window.confirm('Remove this comment?')) {
      this.adminFacade.deleteComment$(id);
    }
  }
}
