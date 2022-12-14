class MoviesController < ApplicationController
    
    skip_before_action :authorize, only: [:index, :show]

    def index
        render json: Movie.all.shuffle
    end

    def show
        render json: Movie.find(params[:id])
    end

end
