class WatchlistMovieSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :movie
end
