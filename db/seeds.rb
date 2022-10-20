
def get_movie_data
    movies = RestClient.get("https://movie-json-data.herokuapp.com/movies")
    movies_array = JSON.parse(movies)
    movies_array.each do |m|
        Movie.create(
            name: m["name"],
            image: m["image"],
            description: m["description"],
            director: m["director"][0]["name"],
            actors: m["actor"],
            genre: m["genre"],
        )
    end     
end

get_movie_data()

User.create(username: "Aaron", password: "a", password_confirmation: "a")
User.create(username: "Justin", password: "j", password_confirmation: "j")
User.create(username: "Leah", password: "l", password_confirmation: "l")
User.create(username: "Narch", password: "n", password_confirmation: "n")
User.create(username: "Dad", password: "d", password_confirmation: "d")

100.times do
    WatchlistMovie.create(user_id: User.all.ids.sample, movie_id: Movie.all.ids.sample)
end

20.times do
    Review.create(user_id: 1, movie_id: Movie.all.ids.sample, rating: rand(1..10), content: Faker::Lorem.paragraph, author: User.where(id: 1).first.username)
end
20.times do
    Review.create(user_id: 2, movie_id: Movie.all.ids.sample, rating: rand(1..10), content: Faker::Lorem.paragraph, author: User.where(id: 2).first.username)
end
20.times do
    Review.create(user_id: 3, movie_id: Movie.all.ids.sample, rating: rand(1..10), content: Faker::Lorem.paragraph, author: User.where(id: 3).first.username)
end
20.times do
    Review.create(user_id: 4, movie_id: Movie.all.ids.sample, rating: rand(1..10), content: Faker::Lorem.paragraph, author: User.where(id: 4).first.username)
end
20.times do
    Review.create(user_id: 5, movie_id: Movie.all.ids.sample, rating: rand(1..10), content: Faker::Lorem.paragraph, author: User.where(id: 5).first.username)
end

200.times do
    Vote.create(user_id: User.all.ids.sample, review_id: Review.all.ids.sample)
end

puts 'Seeding Done'

