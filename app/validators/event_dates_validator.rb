class EventDatesValidator < ActiveModel::Validator
  def validate(record)
    @record = record
    validate_end_time
  end

  private

  def validate_start_time
    return if @record.start_time.nil?

    @record.errors.add :start_time, I18n.t('events.validators.start_time_min') if @record.start_time < DateTime.now
  end

  def validate_end_time
    return if @record.end_time.nil?

    @record.errors.add :end_time, I18n.t('events.validators.end_time_min') if @record.end_time < @record.start_time
  end
end
