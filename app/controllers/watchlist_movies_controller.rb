class WatchlistMoviesController < ApplicationController

    def index
        render json: @current_user.watchlist_movies
    end


    def create
        render json: @current_user.watchlist_movies.create!(watchlist_movie_params)
    end

    def destroy
        movie = WatchlistMovie.find(params[:id])
        movie.destroy
        head :no_content
    end

    private

    def watchlist_movie_params
        params.permit(:user_id, :movie_id)
    end
end
