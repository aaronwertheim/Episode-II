class VotesController < ApplicationController

    def index
        render json: Vote.all
    end

    def create
        render json: Vote.create!(vote_params)
    end

    private

    def vote_params
        params.permit(:user_id, :review_id)
    end
end
