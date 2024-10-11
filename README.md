# Backend
Úložisko pre videá - platforma YouTube (kategória - nezaradené (bez reklám) - nesmú byť public)
# Databáza
No Sql - Mongo db
# Backend technológia
Node js, práca s db - mongoose
# Proces prihlásenia a autentifikácia
frontend endpoint overí platnosť emailu a hesla s údajmi v databáze, ak sú platné, vytvorí tzv. jwt token, na ktorého vytvorenie použije tzv. "bezpečnostný kľúč", ktorý je čitatelný iba na backende a údaje používatela (json objekt), token má samostatnú expiračnú hodnotu a odhlásením sa token zničí, token sa má posielať následne pri každej neverejnej požiadávke a backend overuje pri požiadávke jeho platnosť,
ak je platný, vykoná požiadávku, inák odhlasí používatela (v prípade expirácie)
# Plánované objekty v db
používatel -> id | nickname | email | heslo | isAdmin 

fakulta -> id | názov fakulty

katedra -> id | id fakulty | názov katedry

stupeň štúdia -> id | názov stupňa štúdia (bakalárske, inžinierske...)

študijný odbor -> id | stupeň štúdia id | katedra id | názov študijného odboru

študijný predmet -> id | katedra id | názov predmetu | skratka predmetu

priečinok -> id | id predmetu | id tvorcu priečinku | názov priečinku

videotutoriál -> id | id tvorcu videotutoriálu | id predmetu | id priečinku | názov videotutoriálu | odkaz na videotutoriál(YouTube) | dostupnosť (public - vidí verejnosť, protected - vidí iba fakulta) | odkaz na obrázok videotutoriálu (thumbnail), čas (dĺžka) videotutoriálu, počet zhliadnutí videotutoriálu (na YouTube), počet likov videotutoriálu (na YouTube)

_____ Pridať redis cloud cache vrstvu !!!! ____

(ak je používatel admin, tak bude sa video)
# Pavučínová technológia zobrazovania
Technológia načítavania dopredu (plus web sockety - volitelné)
1. načítanie stránky
2. načítanie dát na pozadí pre všetky podstránky (ktoré niesú otvorené, ale sú dostupné s danej stránky)
# Endpointy



