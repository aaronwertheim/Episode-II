class MovieSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :genre, :director
  
  has_many :reviews

end
