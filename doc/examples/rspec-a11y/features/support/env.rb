require 'cucumber/formatter/unicode' # Remove this line if you don't want Cucumber Unicode support

require 'rack'
require 'rack/test'
require File.dirname(__FILE__) + "/../fixtures/fake_app"

require 'capybara'
require 'capybara/cucumber'
require 'capybara-webkit'
Capybara.javascript_driver = :webkit

require 'cucumber/a11y'

Capybara.app = RSpecA11ySteps::FakeApp.new
