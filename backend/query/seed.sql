INSERT INTO "role" ("id", "type")
VALUES ('1', 'Admin'),
  ('2', 'Project Manager'),
  ('3', 'Team Lead'),
  ('4', 'Engineer');
INSERT INTO "permission" ("role_id", "user", "project", "task", "comment")
VALUES (1, 'CRUD', 'CRUD', 'CRUD', 'CRUD'),
  (2, 'R', 'RU', 'CRUD', 'CRUD'),
  (3, 'R', 'R', 'CRUD', 'CRUD'),
  (4, 'R', 'R', 'RU', 'CRUD');
INSERT INTO "user" (
    "id",
    "username",
    "password",
    "role_id",
    "active",
    "created_at",
    "updated_at"
  )
VALUES (
    1,
    'albus',
    '$2b$10$r.AT2QcEfBL6gDav4etgau.bf.xNlWS.zg0B5Js6yL0LDbrIbqpEC',
    1,
    true,
    '2020-08-26 23:17:21.581000',
    '2020-08-26 23:17:21.581000'
  ),
  (
    2,
    'severus',
    '$2b$10$X4RYrh0N3HJpRCT/kypz/.PZKree2MnIND4IiYTde2Ex.V373MXGW',
    2,
    true,
    '2020-08-26 23:22:12.897000',
    '2020-08-26 23:22:12.897000'
  ),
  (
    3,
    'sirius',
    '$2b$10$1VcVWy2XcxkOxqqLscXlQ.a6MJ9w2svJgLX5rqk1UCix6UbIYkiFS',
    2,
    true,
    '2020-08-26 23:22:43.947000',
    '2020-08-26 23:22:43.947000'
  ),
  (
    4,
    'harry',
    '$2b$10$Kp8gzPRt8v2hLodcQnmiEeWOUw1DaX/ESA.TsO.zJBBNSMy3OYzcy',
    3,
    true,
    '2020-08-26 23:23:33.666000',
    '2020-08-26 23:23:33.666000'
  ),
  (
    5,
    'ron',
    '$2b$10$Bj5gAetALcwoOsUSmTF1heQ//BHqMH7RwqDpwN2/W.bPaVm9SdjP.',
    3,
    true,
    '2020-08-26 23:24:02.704000',
    '2020-08-26 23:24:02.704000'
  ),
  (
    6,
    'hermoine',
    '$2b$10$8rnJfKW7fA81hNJVrYDAeeUxo9pZOULYwpdpRaoKm0fCZTgIGlYRm',
    3,
    true,
    '2020-08-26 23:24:50.160000',
    '2020-08-26 23:24:50.160000'
  ),
  (
    7,
    'luna',
    '$2b$10$zXs0qNHQbf32VcyVta9Wru3GszSi/GxFD6tsNNlsNcFvaG7go4/b6',
    4,
    true,
    '2020-08-26 23:25:15.385000',
    '2020-08-26 23:25:15.385000'
  ),
  (
    8,
    'draco',
    '$2b$10$xEGlIFtg.4NfAP5GcLh5GudtZuLO9zLX.IXL.TCvOAFNyGAINRnXC',
    4,
    true,
    '2020-08-26 23:25:53.569000',
    '2020-08-26 23:25:53.569000'
  );
INSERT INTO "project" (
    "id",
    "name",
    "description",
    "project_manager_id",
    "created_at",
    "updated_at"
  )
VALUES (
    1,
    'Project Philosopher''s Stone',
    'Late one night, Albus Dumbledore and Minerva McGonagall, professors at the Hogwarts School of Witchcraft and Wizardry, along with the school''s groundskeeper Rubeus Hagrid, deliver a recently orphaned infant named Harry Potter to his only remaining relatives, the Dursleys.',
    2,
    '2020-08-26 23:30:20.396000',
    '2020-08-26 23:30:20.396000'
  ),
  (
    2,
    'Project Chamber of Secrets',
    'Harry Potter spends the summer with the Dursleys without receiving letters from his Hogwarts friends. In his room, Harry meets Dobby, a house-elf who warns him of a peril that will take shape if he returns to Hogwarts. Dobby reveals that he intercepted his friends'' letters, and ruins an important dinner for the Dursleys, who lock Harry up and prevent his return to Hogwarts.',
    3,
    '2020-08-26 23:31:46.561000',
    '2020-08-26 23:31:46.561000'
  ),
  (
    3,
    'Project Prisoner of Azkaban',
    'Harry Potter has been spending another dissatisfying summer with the Dursleys. When Aunt Marge Dursley insults his parents, he loses his temper and accidentally causes her to inflate like a balloon and float away. Fed up, Harry then flees the Dursleys with his luggage. The Knight Bus arrives and takes Harry to the Leaky Cauldron, where he is pardoned by Minister of Magic Cornelius Fudge for using magic outside of Hogwarts.',
    3,
    '2020-08-26 23:33:18.041000',
    '2020-08-26 23:33:18.041000'
  );