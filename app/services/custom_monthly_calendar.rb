class CustomMonthlyCalendar < SimpleCalendar::MonthCalendar
  def url_for_today_view
    view_context.url_for(@params.merge(start_date_param => (Date.today).iso8601))
  end
end
