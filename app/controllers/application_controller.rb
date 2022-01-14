class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  around_action :switch_locale

  def switch_locale(&action)
    locale = I18n.available_locales.include?(params[:l]&.to_sym) ? params[:l] : I18n.default_locale
    I18n.with_locale(locale, &action)
  end
end
