CREATE TABLE réalisateur (
    id_realisateur      NUMBER(4, 0) PRIMARY KEY, 
    nom            VARCHAR2(60 BYTE), 
    biographie     VARCHAR2(4000 BYTE), 
    date_naissance DATE, 
    date_deces     DATE
);

CREATE TABLE genres (
    id_genre  NUMBER(4, 0) PRIMARY KEY, 
    nom       VARCHAR2(60 BYTE), 
    description VARCHAR2(4000 BYTE)
);

CREATE TABLE abonnés (
    id_abonne         NUMBER(4, 0) PRIMARY KEY, 
    nom                VARCHAR2(60 BYTE), 
    adresse            VARCHAR2(100 BYTE), 
    email              VARCHAR2(60 BYTE), 
    numero_telephone   VARCHAR2(20 BYTE), 
    date_inscription   DATE
);

CREATE TABLE films (
    id_film                     NUMBER(4, 0) PRIMARY KEY, 
    titre                       VARCHAR2(60 BYTE), 
    annee_de_sortie             NUMBER(4, 0),
    realisateur_id              NUMBER(4, 0), 
    genre_id                    NUMBER(4, 0),
    CONSTRAINT films_realisateur_fk FOREIGN KEY (realisateur_id) REFERENCES réalisateur (id_realisateur),
    CONSTRAINT films_genres_fk FOREIGN KEY (genres_id) REFERENCES genres (id_genre)
);

CREATE TABLE visionnements (
    id_visionnement          NUMBER(4, 0) PRIMARY KEY, 
    date_visionnement        DATE,  
    abonne_id                NUMBER(4, 0), 
    id_film                  NUMBER(4, 0),
    CONSTRAINT visionnements_abonnes_fk FOREIGN KEY (abonne_id) REFERENCES abonnés (id_abonne),
    CONSTRAINT visionnements_films_fk FOREIGN KEY (id_film) REFERENCES films (id_film)
);
INSERT INTO réalisateur (id_realisateur, nom, biographie, date_naissance, date_deces) VALUES
(201, 'Christopher Nolan', 'Réalisateur, scénariste et producteur britannique-américain', TO_DATE('1970-07-30', 'YYYY-MM-DD'), NULL),
(202, 'Steven Spielberg', 'Réalisateur, scénariste et producteur américain', TO_DATE('1946-12-18', 'YYYY-MM-DD'), NULL),
(203, 'Martin Scorsese', 'Réalisateur, scénariste et producteur américain', TO_DATE('1942-11-17', 'YYYY-MM-DD'), NULL),
(204, 'Quentin Tarantino', 'Réalisateur, scénariste et producteur américain', TO_DATE('1963-03-27', 'YYYY-MM-DD'), NULL),
(205, 'James Cameron', 'Réalisateur, scénariste et producteur canadien', TO_DATE('1954-08-16', 'YYYY-MM-DD'), NULL),
(206, 'Sofia Coppola', 'Réalisatrice, scénariste et productrice américaine', TO_DATE('1971-05-14', 'YYYY-MM-DD'), NULL);

INSERT INTO genres (id_genre, nom, description) VALUES
(301, 'Action', 'Films d\',action'),
(302, 'Science Fiction', 'Films de science-fiction'),
(303, 'Comédie', 'Films comiques'),
(304, 'Drame', 'Films dramatiques'),
(305, 'Horreur', 'Films d\'horreur'),
(306, 'Animation', 'Films d\'animation');

INSERT INTO abonnés (id_abonne, nom, adresse, email, numero_telephone, date_inscription) VALUES
(401, 'Alice Dupré', '123 Rue de la Paix, Montréal, Canada', 'alice.dupré@gmail.com', '5142455356', TO_DATE('2024-01-15', 'YYYY-MM-DD')),
(402, 'Bob Marley', '456 Avenue des Champs, Laval, Canada', 'bob.marley@hotmail.com', '4382416573', TO_DATE('2024-02-20', 'YYYY-MM-DD')),
(403, 'Jimmy Tremblay', '789 Boulevard de Marseille, Longueuil, Canada', 'jimmy.tremblay@outlook.com', '5142581053', TO_DATE('2024-03-10', 'YYYY-MM-DD')),
(404, 'David Dupont', '321 Rue de Nille, Brossard, Canada', 'david.dupont@yahoo.com', '4385269159', TO_DATE('2024-04-05', 'YYYY-MM-DD')),
(405, 'Eva Moreau', '654 Rue du Soleil, Montréal, Canada', 'eva.moreau@gmail.com', '4385490022', TO_DATE('2024-05-01', 'YYYY-MM-DD')),
(406, 'Gutta Laribi', '987 Avenue de la Concorde, Laval, Canada', 'guttaEGK192@outlook.com', '5144128692', TO_DATE('2024-06-15', 'YYYY-MM-DD'));

INSERT INTO films (id_film, titre, annee_sortie, realisateur_id, genre_id) VALUES
(501, 'Inception', 2010, 201, 302),
(502, 'Jurassic Park', 1993, 202, 301),
(503, 'The Irishman', 2019, 203, 304),
(504, 'Pulp Fiction', 1994, 204, 303),
(505, 'Avatar', 2009, 205, 302),
(506, 'Lost in Translation', 2003, 206, 304);

INSERT INTO visionnements (id_visionnement, date_visionnement, abonne_id, id_film) VALUES
(601, TO_DATE('2024-05-01', 'YYYY-MM-DD'), 401, 501),
(602, TO_DATE('2024-05-10', 'YYYY-MM-DD'), 402, 502),
(603, TO_DATE('2024-05-12', 'YYYY-MM-DD'), 403, 503),
(604, TO_DATE('2024-05-14', 'YYYY-MM-DD'), 404, 504),
(605, TO_DATE('2024-05-16', 'YYYY-MM-DD'), 405, 505),
(606, TO_DATE('2024-05-18', 'YYYY-MM-DD'), 406, 506);






-- Activer le schéma pour l'accès REST
BEGIN
  ORDS.enable_schema(
    p_enabled             => TRUE,
    p_schema              => 'RESTSCOTT',
    p_url_mapping_type    => 'BASE_PATH',
    p_url_mapping_pattern => 'streaming',
    p_auto_rest_auth      => FALSE
  );
  COMMIT;
END;
/

-- Activer l'accès REST pour les tables
BEGIN
  ORDS.enable_object (
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'RÉALISATEUR',
    p_object_type  => 'TABLE',
    p_object_alias => 'realisateur'
  );
  ORDS.enable_object (
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'GENRES',
    p_object_type  => 'TABLE',
    p_object_alias => 'genres'
  );
  ORDS.enable_object (
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'FILMS',
    p_object_type  => 'TABLE',
    p_object_alias => 'films'
  );
  ORDS.enable_object (
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'ABONNÉS',
    p_object_type  => 'TABLE',
    p_object_alias => 'abonnes'
  );
  ORDS.enable_object (à
    p_enabled      => TRUE,
    p_schema       => 'RESTSCOTT',
    p_object       => 'VISIONNEMENTS',
    p_object_type  => 'TABLE',
    p_object_alias => 'visionnements'
  );
 
  COMMIT;
END;
/

-- Confirmation de l'activation du schéma
SELECT *
FROM user_ords_schemas;

-- Confirmation de l'activation des tables pour l'accès REST
SELECT *
FROM user_ords_enabled_objects;
