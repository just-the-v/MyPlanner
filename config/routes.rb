Rails.application.routes.draw do
  resources :events
  root 'events#index'
end
