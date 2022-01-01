module CalendarHelper
  def date_class(calendar, day)
    classes = calendar.td_classes_for(day) << ['border']
  end

  def number_date_classes(day)
    classes = ['text-mono text-xl w-7 text-center']
    classes << ["text-white bg-red-600 rounded-full"] if day == Date.today
    classes.join(' ')
  end

  def custom_month_calendar(options = {}, &block)
    raise "custom_week_calendar requires a block" unless block
    CustomMonthlyCalendar.new(self, options).render(&block)
  end
end
