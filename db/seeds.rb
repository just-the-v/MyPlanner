# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)


puts "Création des salles"

Room.find_or_create_by!(name: 'Grande salle')
Room.find_or_create_by!(name: 'Petite salle')


admin = User.find_by_email('admin@gmail.com')
admin ||= User.create(email: 'admin@gmail.com', password: 'password')
admin.add_role :admin
puts "Ajout du role admin au compte admin"

