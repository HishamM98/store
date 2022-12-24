import { HttpClient } from "@angular/common/http";
import { CartService } from "./../../services/cart.service";
import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "src/app/models/cart.model";
import { loadStripe } from "@stripe/stripe-js";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "sneakers",
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: "https://via.placeholder.com/150",
        name: "sneakers",
        price: 150,
        quantity: 3,
        id: 2,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  displayColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(
    private cartService: CartService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.httpClient
      .post("http://localhost:4242/checkout", {
        items: this.cart.items,
      })
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          "pk_test_51MIGYsALUBQDIwXthR6tCimVBhJI3ZGkshjrc1Zn4W7QVGx8n6O21v42RW0iskAV3MQ7dG3nxzI70Jwd1e4O4QWG006itEhtvO"
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
