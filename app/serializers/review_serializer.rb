class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating, :movie_id, :user_id, :author, :created_at

  belongs_to :movie
  has_many :votes

  def created_at
    object.created_at.strftime("%Y-%m-%d")
  end
  
end

