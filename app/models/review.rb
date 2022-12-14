class Review < ApplicationRecord
    belongs_to :movie
    belongs_to :user

    has_many :votes

    validates :user, uniqueness: { scope: :movie }
    validates :rating, :content, presence: true 
end
