# Rspec::A11y

Defines custom RSpec matchers and Cucumber steps for testing page accessibility with Deque's WorldSpace Web API.

## Prerequisites

1. Ensure that the Worldspace Web API's Javascript is being injected into the application being tested; it's already injected into the provided example.

2. Ensure that a supported version of Ruby is installed.  RVM (http://rvm.io) can be used to install Ruby if it's not currently present.

3. Install bundler: `$ gem install bundler`

## Installing the gem

To install the gem on your system, navigate to the directory where the rspec-a11y .gem file is located and then: `$ gem install rspec-a11y`

## Running the example

Sample tests exist under the `features` directory that run against a simple Sinatra application loaded from `features/fixtures`. This can be used to try out Cucumber matchers against a simple application.

To run this example, ensure that the above prerequisites are met, then install the dependencies needed for the example:

1. Install the qt libraries following the instructions at the website for your platform: https://github.com/thoughtbot/capybara-webkit/wiki/Installing-Qt-and-compiling-capybara-webkit

2. Install the Ruby depdencies using Bundler: `$ bundle`

To run the example tests, use: `$ cucumber`; for illustrative purposes, one of the tests will fail, to display the expected output of a failure.

## Using in an app

Once the gem is installed, it needs to be referenced by your application. Add this line to your application's `Gemfile`:

	gem 'rspec-a11y'

### Rspec

Require the custom matchers in Rspec's `spec_helper` file:

    require 'rspec/a11y'

Then include the custom matchers in the spec files where you need them with

    include CustomA11yMatchers

or include the custom matchers globally in a `spec_helper` file with

    RSpec::configure do |config|
      config.include(CustomA11yMatchers)
    end

### Cucumber

Require the custom step definitions in Cucumber's `env` file:

    require 'cucumber/a11y'

## RSpec Usage

The simplest use case is to perform an accessibility check for the whole page:

    expect(page).to be_accessible

#### Limiting the context of the test

To check only a portion of the page, pass a CSS selector or selectors to `within`:

    expect(page).to be_accessible.within("#testme")
    expect(page).to be_accessible.within("#testme,#testme2")
    expect(page).to be_accessible.within(["#testme","#testme2"])

To exclude a portion of the page from the check, pass a CSS selector or selectors to `excluding`:

    expect(page).to be_accessible.excluding(".excludeme")
    expect(page).to be_accessible.excluding(".exclude1,.exclude2")
    expect(page).to be_accessible.excluding([".exclude1",".exclude2"])


The `within` and `excluding` methods can be used together:

    expect(page).to be_accessible.within("#testme").excluding(".excludeme")

#### Running only certain tests

To perform a check for a tagged set or sets of rules, pass the tags to `for_tag`:

    expect(page).to be_accessible.for_tag("wcag2a")
    expect(page).to be_accessible.for_tags("wcag2a,section508")

To perform a check for a specific rule or rules, pass them to `for_rule`:

    expect(page).to be_accessible.for_rule("label")
    expect(page).to be_accessible.for_rules("label,blink")
    expect(page).to be_accessible.for_rules(["label","blink"])

The `for_tag` or `for_rule` methods can be used in combination with `within` and/or `excluding`.

#### Passing custom options

To perform checks that are more complex than `for_tag` or `for_rule`, pass a string containing your javascript options to `with_options`:

    expect(page).to be_accessible.with_options('{rules:{"ruleId1":{enabled:false},"ruleId2":{enabled: false}}}')

The `with_options` method can be used in combination with `within` and/or `excluding`.

## Cucumber Usage

The simplest use case is to perform an accessibility check for the whole page:

    Then the page should be accessible

#### Limiting the context of the test

To check only a portion of the page:

    Then the page should be accessible within "#testme"

To exclude a portion or portions of the page from the check:

    Then the page should be accessible excluding ".excludeme"
    Then the page should be accessible excluding ".exclude1,.exclude2"

These limiters can be used together:

    Then the page should be accessible within "#testme" excluding ".excludeme"

#### Running only certain tests

To perform a check for a tagged set or sets of rules:

    Then the page should be accessible for tag "wcag2a"
    Then the page should be accessible for tags "wcag2a,section508"

Tagged sets of rules can also be checked against portions of the page:

    Then the page should be accessible within "#testme" for tag "wcag2a"
    Then the page should be accessible excluding ".excludeme" for tag "wcag2a"
    Then the page should be accessible within "#testme" excluding ".excludeme" for tags "wcag2a,section508"

To perform a check for a specific rule or rules:

    Then the page should be accessible for rule "label"
    Then the page should be accessible for rules "label,blink"

Specific rules can also be checked against portions of the page:

    Then the page should be accessible within "#testme" for rule "label"
    Then the page should be accessible excluding ".excludeme" for rule "label"
    Then the page should be accessible within "#testme" excluding ".excludeme" for rules "label,blink"

#### Passing custom options

To perform checks that are more complex than what's built in to the matchers:

    Then the page should be accessible with options "{rules:{'ruleId1':{enabled:false},'ruleId2':{enabled: false}}}"

Custom options can also be checked against portions of the page:

    Then the page should be accessible within "#testme" with options "{rules:{'ruleId1':{enabled:false},'ruleId2':{enabled: false}}}"
    Then the page should be accessible excluding ".excludeme" with options "{rules:{'ruleId1':{enabled:false},'ruleId2':{enabled: false}}}"
    Then the page should be accessible within "#testme" excluding ".excludeme" with options "{rules:{'ruleId1':{enabled:false},'ruleId2':{enabled: false}}}"



