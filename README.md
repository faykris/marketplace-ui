![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*poaGV4iICp06Q-yTlA2g_g.png)
# MagicMarketplace Overview

MagicMarketplace name was inspired by MagicLog and brings together sellers, buyers, and admins in one place where you can discover and manage a wide variety of products.


## For Sellers

Sellers can create an account and log in to add products to the marketplace. They can also search products in the marketplace in case they want to buy.

## For Buyers

Buyers don’t need to log in. They can search and filter products by name, SKU, or price range, add items to their shopping cart, and buy them. _(Note: "Buying" in this project means decrementing the product quantity in the database, there is no integrated payment system)_

## For Administrators

-   **Admin Access:** Currently, there’s just one admin account (`cristian-admin@gmail.com` with password `password`). Admin accounts aren't created via the app, they’re set up externally (e.g., via Postman). Please use these credentials if you want to see the admin view.
-   **Product Management:** Admins can view all products registered on the platform, filter them by seller, and search as needed.

## Routes in the App

-   **`/`**  
    The homepage where buyers can view the list of products available for purchase.
-   **`/seller-dashboard`**  
    A dashboard for sellers to see, search, and remove their own products. _(Editing products isn’t implemented yet because of time and because it was not required, but is a future improvement.)_
-   **`/admin-dashboard`**  
    A dashboard for admins to view all products and filter them by seller.

## Features & Requirements

### 1. Create account as a seller.

#### Cases
1. Email, password and password validation were included.
2. If passwords don't match, an error is displayed.
3. If user already exists, an error is displayed
4. If the account creation is successful, the modal is closed and user is redirected to their products screen.

### 2. Add products with price.

#### Cases
1. The seller can create products with name, sku, quantity, and price. If any of these attributes are missing, an error is displayed in each input indicating which attribute is missing.
2. Only authenticated users can add products.

### 3. Sellers can see the full list of products they have registered.

#### Cases
1. Each seller can only view the products they have registered.
2. The screen is only accessible to authenticated users.

### 4. Buyers can search for products and add them to their shopping cart

#### Cases
1. The buyer can search for products by filtering based on name, SKU, or price range.

### 5. Administrators can see all the products that have been registered on the marketplace.

#### Cases
1. The administrator can view all products on the platform and filter them by seller.
2. Only authenticated users can access this screen.

## Previous Requirements
- Node JS installed, is necessary execute commands such as packages installation and make run the project.
- Visual Studio Code or any other code editor to see easily the code and use of the terminal.

## Installation
- Clone this repository to a specific location in your PC.
- Execute command to packages installation:
```bash
npm install
```
- Now, it's time to run the project with this command:
```bash
npm run dev
```
- Open the project in generated url (in my case is below here):
```bash
http://localhost:5173/
```


## Author
- Cristian Pinzón - faykris28@gmail.com