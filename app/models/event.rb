class Event < ApplicationRecord
  validates_presence_of :start_time, :end_time, :title
  validates_with EventDatesValidator

end
