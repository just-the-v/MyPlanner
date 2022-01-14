class Event < ApplicationRecord
  validates_presence_of :start_time, :end_time, :title
  validates_with EventDatesValidator
  belongs_to :user
  belongs_to :room
  belongs_to :event, optional: true
  resourcify
end
