import { outputAst } from "@angular/compiler";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit {
  categories = ["shoes", "sports"];
  @Output() showCategory = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onShowCategory(category: string) {
    this.showCategory.emit(category);
  }
}
