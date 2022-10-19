Rails.application.routes.draw do
  
  resources :votes
  resources :reviews
  resources :watchlist_movies
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  get '/movies', to: 'movies#index'
  get '/movies/:id', to: 'movies#show'
  get '/me', to: 'users#show'
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
