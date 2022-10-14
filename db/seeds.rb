
def get_movie_data
    movies = RestClient.get("https://movie-json-data.herokuapp.com/movies")
    movies_array = JSON.parse(movies)
    movies_array.each do |m|
        Movie.create(
            name: m["name"]
        )
    end     
end

get_movie_data()

puts 'Seeding Done'

