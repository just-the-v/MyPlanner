class AddColorToEvent < ActiveRecord::Migration[7.1]
  def change
    add_column :events, :color, :string
  end
end
