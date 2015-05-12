package com.deque;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import org.json.JSONArray;
import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class KensingtonTest extends TestCase {
	private WebDriver driver;

	/**
	 * Create the test case
	 * @param testName name of the test case
	 */
	public KensingtonTest(String testName) {
		super(testName);
	}

	/**
	 * @return the suite of tests being tested
	 */
	public static Test suite() {
		return new TestSuite(KensingtonTest.class);
	}

	/**
	 * Setup the test; instantiate instance of WebDriver
	 */
	public void setUp() {
		driver = new FirefoxDriver();

		driver.get("http://localhost:5005");
	}

	/**
	 * Tear down for tests; make sure to close WebDriver when tests are done
	 */
	public void tearDown() {
		driver.quit();
	}

	/**
	 * Basic test
	 */
	public void testAccessibility() {
		JSONObject responseJSON = new TestHelper.Builder(driver).analyze();

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			assertTrue(TestHelper.report(violations), false);
		}
	}

	/**
	 * Test with options
	 */
	public void testAccessibilityWithOptions() {
		JSONObject responseJSON = new TestHelper.Builder(driver)
				.options("{ rules: { 'accesskeys': { enabled: false } } }")
				.analyze();

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			assertTrue(TestHelper.report(violations), false);
		}
	}

	/**
	 * Test a specific selector or selectors
	 */
	public void testAccessibilityWithSelector() {
		JSONObject responseJSON = new TestHelper.Builder(driver)
				.include("title")
				.include("p")
				.analyze();

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			assertTrue(TestHelper.report(violations), false);
		}
	}

	/**
	 * Test includes and excludes
	 */
	public void testAccessibilityWithIncludesAndExcludes() {
		JSONObject responseJSON = new TestHelper.Builder(driver)
				.include("div")
				.exclude("h1")
				.analyze();

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			assertTrue(TestHelper.report(violations), false);
		}
	}

	/**
	 * Include a WebElement
	 */
	public void testAccessibilityWithWebElement() {
		JSONObject responseJSON = new TestHelper.Builder(driver)
				.analyze(driver.findElement(By.tagName("p")));

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			assertTrue(TestHelper.report(violations), false);
		}
	}
}
