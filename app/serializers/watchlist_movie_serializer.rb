class WatchlistMovieSerializer < ActiveModel::Serializer
  attributes :id, :movie_id
  belongs_to :movie
end
