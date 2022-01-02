module CalendarHelper
  def date_class(calendar, day)
    classes = calendar.td_classes_for(day) << ['border']
  end

  def number_date_classes(day)
    classes = ['text-mono text-xl text-center thirtyPxs']
    classes << (day == Date.today ? ["text-white bg-red-600 rounded-full"] : ["font-medium"])
    classes.join(' ')
  end

  def custom_month_calendar(options = {}, &block)
    raise "custom_week_calendar requires a block" unless block
    CustomMonthlyCalendar.new(self, options).render(&block)
  end

  def human_readable_date_interval(event)
    start_time, end_time = event.start_time, event.end_time
    if start_time.day != end_time.day
      "#{I18n.l(start_time, format: :long).titleize} - #{I18n.l(end_time, format: :long).titleize}"
    else
      "#{I18n.l(start_time, format: :long).titleize} - #{end_time.strftime("%Hh%M")}"
    end
  end
end
