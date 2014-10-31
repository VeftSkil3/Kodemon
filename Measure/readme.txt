install
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install git+https://github.com/hlysig/kodemon-python
pip install Flask-Script
pip install SQLAlchemy

keyra
source .venv/bin/activate
python manage.py create_db
python manage.py runserver
