class MovieSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :genre, :director, :actors
  
  has_many :reviews

end
