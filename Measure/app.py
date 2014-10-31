from flask import Flask, render_template, request, redirect
from db import Session
from model import Movie
from kodemon import kodemon

app = Flask(__name__)


@app.route('/')
@kodemon()
def list_movies():
    print 'start'
    year = request.args.get('year')
    id=request.args.get('id')
    session = Session()
    print year
    if not year:
        movies = session.query(Movie).all()
    else:
        movies = session.query(Movie).filter(Movie.year == year).all()
    return render_template('list-movies.html', movies=movies)


@app.route('/add', methods=['GET'])
@kodemon()
def addGet():
    return render_template('add-movie.html')


@app.route('/add', methods=['POST'])
@kodemon()
def addPost():
    title = request.form.get('title')
    year = request.form.get('year')
    session = Session()
    m = Movie(title=title, year=year)
    session.add(m)
    session.commit()
    return redirect('/')
        
       
@app.route('/delete', methods=['GET'])
@kodemon()
def deleteGet():
    id=request.args.get('id')
    print 'Method=deleteGet'
    session = Session()
    movies = session.query(Movie).filter(Movie.id == id).all()
    return render_template('delete-movie.html', movies=movies)
        

@app.route('/delete', methods=['POST', 'DELETE'])
@kodemon()
def deletePost():
    print 'Method=' + request.method
    id = request.form.get('id')
    session = Session()
    movies = session.query(Movie).filter(Movie.id == id).first()
    print movies.id
    session.delete(movies)
    session.commit()
    return redirect('/')
    
