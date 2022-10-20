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

    def destroy
        review = Review.find(params[:id])
        review.votes.destroy_all
        review.destroy
        head :no_content
    end 

    private

    def review_params
        params.permit(:user_id, :movie_id, :content, :rating, :author)
    end
end
