class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :reviews
  has_many :watchlist_movies
end
