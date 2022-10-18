class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating, :movie_id, :user_id, :author

  belongs_to :movie


end
