import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from "./components/Pages/Home/Home";
import ProductDetail from "./components/Pages/ProductDetail/ProductDetail";
import Cart from "./components/Pages/Cart/Cart";
import Checkout from "./components/Pages/Checkout/Checkout";
import CheckoutComplete from "./components/Pages/Checkout/CheckoutComplete";

import Footer from "./components/Footer/Footer";
import NavMenu from "./components/NavMenu/NavMenu";

import { CartProvider } from "./contexts/CartContext";
import { ApiProvider } from "./contexts/ApiContext";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const stripePromise = loadStripe(
    "pk_test_51ISJV9JbP5kYqOPtlSYCWM6016g6nuDnpTPouQdFXLc2pU1bOc5Kh6dr3UvUFkT9oxtWRvvADzqKwoeg64ndZ67R00clEPR6r2"
);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={baseUrl}>
            <Elements stripe={stripePromise}>
                <ApiProvider>
                    <CartProvider>
                        <NavMenu />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/Product/:productId/:variantId" component={ProductDetail} />
                            <Route path="/Cart" component={Cart} />
                            <Route exact path="/Checkout" component={Checkout} />
                            <Route path="/Checkout/Complete" component={CheckoutComplete} />
                        </Switch>
                        <Footer />
                    </CartProvider>
                </ApiProvider>
            </Elements>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
