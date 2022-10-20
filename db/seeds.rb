
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

puts 'Seeding Done'

