from . import views
from .models import Movie
from django.shortcuts import render
from django.core.paginator import Paginator

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
    movies_list = Movie.objects.all()
    paginator = Paginator(movies_list, 20)
    current_page = int(request.GET.get('page') or 1)
    movies = paginator.get_page(current_page)

    if request.method == 'POST':
        if request.POST.get('search') is not None:
            search = request.POST['search']
            search_movies = Movie.objects.filter(original_title__contains=search).values()
            paginator = Paginator(search_movies, 20)
            current_page = int(request.GET.get('page') or 1)
            movies = paginator.get_page(current_page)
            return render(
                request,
                'movierecommender/index.html',
                {
                    'movies': movies,
                    'number_of_pages': movies.paginator.num_pages,
                    'current_page': current_page
                }
            )

        watched = request.POST['watched']
        movie = Movie.objects.get(imdb_id=watched)
        movie.watched = False if movie.watched == 1 else True
        movie.save()
        return render(
            request,
            'movierecommender/index.html',
            {
                'movies': movies,
                'number_of_pages': movies.paginator.num_pages,
                'current_page': current_page
            }
        )

    return render(
        request,
        'movierecommender/index.html', 
        {
            'movies': movies,
            'number_of_pages': movies.paginator.num_pages,
            'current_page': current_page
        }
    )
