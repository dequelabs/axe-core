require "sinatra"
require "slim"

module RSpecA11ySteps
  class FakeApp < Sinatra::Application

    get '/' do
      slim :index
    end
  end
end
