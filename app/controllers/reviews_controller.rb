class ReviewsController < ApplicationController

    def index
        render json: Review.all
    end

    def create
        render json: Review.create!(review_params)
    end

    private

    def review_params
        params.permit(:user_id, :movie_id, :content, :rating, :author)
    end
end
