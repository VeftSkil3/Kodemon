install
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt

keyra
source .venv/bin/activate
python manage.py create_db
python manage.py runserver
