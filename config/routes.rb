Rails.application.routes.draw do
  devise_for :users
  resources :users
  resources :roles
  resources :events
  root 'events#index'
end
