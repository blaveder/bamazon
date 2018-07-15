CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE listItems
(
  id INT NOT NULL
  AUTO_INCREMENT,
    item_name VARCHAR
  (50) NOT NULL,
    item_department VARCHAR
  (50) NOT NULL,
    item_cost INT
  (100) NOT NULL,
    item_quantity INT
  (100) NOT NULL,
    PRIMARY KEY
  (id)
);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("pots", "Home Goods", 45, 1);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("tuna", "Food", 45, 5);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("eggs", "Food", 1, 45);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("wheels", "Automotive", 34, 15);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("slippers", "Apparel", 24, 4);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("beans", "Food", 5, 7);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("tire", "Automotive", 15, 4);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("dvd", "Home Goods", 2, 7);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("underwear", "Apparel", 4, 9);

  INSERT INTO listItems
    (item_name, item_department, item_cost, item_quantity)
  VALUES("tshirt", "Apparel", 10, 5);


  SELECT *
  FROM listItems;