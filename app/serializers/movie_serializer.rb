class MovieSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :genre
  
  has_many :reviews

end
