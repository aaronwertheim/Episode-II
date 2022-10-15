class Movie < ApplicationRecord
    has_many :watchlist_movies
    has_many :users, through: :watchlist_movies

end
