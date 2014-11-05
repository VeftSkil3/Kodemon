Kodemon
=======

Skilaverkefni 3 í VEFT

Margrét Harðardóttir
Óðinn Baldursson 

UDP-Server 
Sér um að taka við eventum frá Kodemon og skrá i mongose gagnagrunn.

Til að keyra upp browsa í folder og keyra: nodejs app.js

WebService 
Sér um að gera fyrirspurnir í mongose grunn og skila gögnum um keyrslutíma falla. 

Til að keyra upp browsa í folder og keyra: nodejs app.js

Interface
Er viðmótið ofan á gögnin, hér er hægt að skoða keyrslutíma og einnig fá upp lifandi graf yfir keyrslutíma falls

Til að keyra upp browsa í folder og keyra: nodejs ./bin/www


-- TEST
Measure -- test forrit sem hægt er að nota til að prófa þessa lausn
Til að keyra upp browsa í folder og keyra:

source .venv/bin/activate
python manage.py create_db
python manage.py runserver
