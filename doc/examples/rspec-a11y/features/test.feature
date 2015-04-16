@javascript
Feature: Test page

Background:
Given I am a visitor

Scenario: Test whole page
  When I visit "/"
  Then the page should be accessible

  Scenario:
  When I visit "/"
  Then the page should be accessible within "#working"

  Scenario:
  When I visit "/"
  Then the page should not be accessible within "#broken"
