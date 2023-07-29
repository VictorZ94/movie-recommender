from . import views
from .models import Movie
from django.shortcuts import render

# HINT: Create a view to provide movie recommendations list for the HTML template

def movie_recommendation_view(request):
    if request.method == "POST":
        search = request.POST["search"]
        search_movies = Movie.objects.filter(original_title__contains=search).values()
        return render(request, 'movierecommender/movie_list.html', {"movie_list": search_movies})

    # The context/data to be presented in the HTML template
    context = generate_movies_context()
    # Render a HTML page with specified template and context
    return render(request, 'movierecommender/movie_list.html', context)


def generate_movies_context():
    context = {}
    # Show only movies in recommendation list
    # Sorted by vote_average in desc
    # Get recommended movie counts
    recommended_count = Movie.objects.filter(
        recommended=True
    ).count()
    # If there are no recommended movies
    if recommended_count == 0:
        # Just return the top voted and unwatched movies as popular ones
        movies = Movie.objects.filter(
            watched=False
        ).order_by('-vote_count')[:30]
    else:
        # Get the top voted, unwatched, and recommended movies
        movies = Movie.objects.filter(
            watched=False
        ).filter(
            recommended=True
        ).order_by('-vote_count')[:30]
    context['movie_list'] = movies
    return context

def index(request):
    movies = Movie.objects.all()[10:20]
    if request.method == 'POST':
        watched = request.POST['watched']
        movie = Movie.objects.get(original_title=watched)
        movie.watched = False if movie.watched == 1 else True
        movie.save()
        return render(request, 'index.html', {'movies': movies})

    return render(request, 'index.html', {'movies': movies})
