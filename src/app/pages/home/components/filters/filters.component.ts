import { Subscription } from "rxjs";
import { StoreService } from "./../../../../services/store.service";
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit, OnDestroy {
  categories: Array<string> | undefined;
  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription: Subscription | undefined;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  onShowCategory(category: string) {
    this.showCategory.emit(category);
  }

  getCategories(): void {
    this.categoriesSubscription = this.storeService
      .getCategories()
      .subscribe((_categories) => {
        this.categories = _categories;
      });
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
