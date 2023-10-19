INSERT INTO Categories (name) VALUES ('Categoría 1');
INSERT INTO Categories (name) VALUES ('Categoría 2');

INSERT INTO notes (title, content, note_Creation_Day, last_edit, archived) VALUES ('Título de la nota 1', 'Contenido de la nota 1', '2023-09-06', '2023-09-06', false);
INSERT INTO notes (title, content, note_Creation_Day, last_edit, archived) VALUES ('Título de la nota 2', 'Contenido de la nota 2', '2023-09-07', '2023-09-07', true);

INSERT INTO `note_category` (note_id,category_id) VALUES (1,1); 
INSERT INTO `note_category` (note_id,category_id) VALUES (2,2); 

INSERT INTO `users` (username,password,enabled) VALUES ('andres','$2a$10$t44DsQpS8EOM46vb0BBQG.i1OLqoYylgwWAnHMV375tsI40MoHTym',1); 
INSERT INTO `users` (username,password,enabled) VALUES ('admin','$2a$10$u/jHNfFqdOoKjRp1JTH2pej/D4OJv3FL.COlfMJhVE5rNhjyiv5i2',1); 

INSERT INTO `roles` (name) VALUES ('ROLE_USER');
INSERT INTO `roles` (name) VALUES ('ROLE_ADMIN'); 

INSERT INTO `users_roles` (user_id,role_id) VALUES (1,1); 
INSERT INTO `users_roles` (user_id,role_id) VALUES (2,2); 
INSERT INTO `users_roles` (user_id,role_id) VALUES (2,1); 