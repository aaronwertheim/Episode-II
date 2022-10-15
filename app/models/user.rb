class User < ApplicationRecord
    has_many :watchlist_movies
    has_many :movies, through: :watchlist_movies

    validates :username, presence: true, uniqueness: true
    has_secure_password
end
