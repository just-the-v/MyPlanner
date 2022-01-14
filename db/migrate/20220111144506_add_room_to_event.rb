class AddRoomToEvent < ActiveRecord::Migration[7.1]
  def change
    add_reference :events, :room, null: false, foreign_key: true
  end
end
