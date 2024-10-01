# Backend
Úložisko pre videá - platforma YouTube (kategória - nezaradené (bez reklám) - nesmú byť public)
# Databáza
No Sql - Mongo db
# Backend technológia
Node js, práca s db - mongoose
# Plánované objekty v db
používatel -> id | meno a priezvisko | nickname | email | heslo | isAdmin 

žiadosť stať sa administrátorom -> id žiadosti | id používatela | je potvrdená

login -> id | čas a dátum prihlásenia | token (zakódované user info)

fakulta -> id | názov fakulty

katedra -> id | id fakulty | názov katedry | stupne štúdia, ktoré katedra poskytuje (pole id)

stupeň štúdia -> id | názov stupňa štúdia (bakalárske, inžinierske...)

študijný odbor -> id | stupeň štúdia id | katedra id | názov študijného odboru

študijný predmet -> id | katedra id | názov predmetu | skratka predmetu

kategória -> id | id predmetu | id tvorcu kategórie | názov kategórie

video -> id | id používatela | id predmetu | id kategórie | názov videa | odkaz na video | dostupnosť (public - vidia aj nepríhlasení, protected - vidia iba prihlásení, private - vidí iba používateľ vo svojom profile)

(ak je používatel admin, tak bude sa video)
# Pavučínová technológia zobrazovania
Technológia načítavania dopredu (plus web sockety - volitelné)
1. načítanie stránky
2. načítanie dát na pozadí pre všetky podstránky (ktoré niesú otvorené, ale sú dostupné s danej stránky)
# Endpointy
homepage -> / (get)
login -> /login -> (post) -> nickname or email, password -> response - succesfull -> token | bad credentials -> message | unknown credentials -> registration offer
register -> /register -> (post) -> meno a priezvisko, nickname, email, heslo -> succesfull -> login page redirect | nickname or email exists -> message


