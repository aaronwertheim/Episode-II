class WatchlistMoviesController < ApplicationController
    skip_before_action :authorize, only: [:index]

    def index
        render json: WatchlistMovie.all
    end

end
