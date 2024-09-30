# Backend
Úložisko pre videá - platforma YouTube (kategória - nezaradené (bez reklám) - nesmú byť public)
# Databáza
No Sql - Mongo db
# Backend technológia
Node js, práca s db - mongoose
# Hierarchia objektov
používatel -> id | meno a priezvisko | email | heslo | isAdmin 

login -> id | čas a dátum prihlásenia | token (zakódované user info)

fakulta -> id | názov fakulty

katedra -> id | id fakulty | názov katedry | stupne štúdia, ktoré katedra poskytuje (pole id)

stupeň štúdia -> id | názov stupňa štúdia (bakalárske, inžinierske...)

študijný odbor -> id | názov študijného odboru

študijný predmet -> id | používateľ id | študijný odbor id

používateľský predmet -> id | používateľ id

user_video (verejné na stránke iba pod používateľským profilom)  -> id | id používateľa (tvorcu videa) | id používateľského predmetu | videolink | názov videa | dĺžka videa 

admin_video (verejné na stránke pod predmetmi a hlavnými kategóriami) -> id | id používateľa (tvorcu videa) | id používateľského predmetu | videolink | názov videa | dĺžka videa
# Pavučínová technológia zobrazovania
Technológia načítavania dopredu plus web sockety
