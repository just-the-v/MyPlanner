class Room < ApplicationRecord
  has_many :events
  resourcify

  def to_s
    name
  end
end
