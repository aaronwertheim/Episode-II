class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :name
      t.string :image
      t.string :description
      t.string :director
      t.string :genre, array: true, default: []

      t.timestamps
    end
  end
end
