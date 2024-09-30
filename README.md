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

študijný odbor -> id | stupeň štúdia id | katedra id | názov študijného odboru

študijný predmet -> id | katedra id | názov predmetu | skratka predmetu

kategória -> id | id tvorcu kategórie | názov kategórie

video -> id | 
# Pavučínová technológia zobrazovania
Technológia načítavania dopredu plus web sockety
