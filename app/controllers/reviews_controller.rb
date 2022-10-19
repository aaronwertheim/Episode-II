class ReviewsController < ApplicationController

    def index
        render json: Review.all
    end

    def create
        render json: Review.create!(review_params)
    end

    def update
        review = Review.find(params[:id])
        review.update!(review_params)
        render json: review
    end

    private

    def review_params
        params.permit(:user_id, :movie_id, :content, :rating, :author)
    end
end
