# E-Commerce Back End

### By Mackenzie Gray

## Technologies Used

- Express.js
- Sequelize
- MySQL

## Description 

The motivation for this project  was to build the back end for an e-commerce site by taking a working Express.js API and configuring it to use Sequelize to interact with a MySQL database. Dotenv is utilized to use environment variables and store sensitive data. 

## Usage

Installation of npm packages required are invoked with the following command:

`npm i`

Data is seeded by invoking the following command:

`node seeds/index.js`

The application server will be invoked with the following command:

`node server.js`

## Outline of codebase writing

Models:
- Writing of database models for Category.js, Product.js, ProductTag.js, Tag.js to include columns with Sequelize requirements.
- Writing of association methods in index.js to define relationships between models.

Routes:
- Writing of code in product-routes.js, tag-routes.js, and category-routes.js to perform create, read, update, and delete operations using the Sequelize models.

Sequelize:
- Writing of code in server.js to sync the Sequelize models to the MySQL database on server start. 

## Demonstration video

To see the functionality of the e-commerce back end with Insomnia, click on the link below.

[Demonstration Video](https://drive.google.com/file/d/1_i54mf57U_600QAt-5Rv_RnfMSpO-BT0/view?usp=sharing)