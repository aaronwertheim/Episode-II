class VotesController < ApplicationController

    skip_before_action :authorize, only: [:index]

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
