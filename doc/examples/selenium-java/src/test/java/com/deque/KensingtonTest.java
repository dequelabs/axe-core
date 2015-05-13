package com.deque;

import static org.junit.Assert.*;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class KensingtonTest {
	@Rule
	public TestName testName = new TestName();

	private WebDriver driver;

	/**
	 * Setup the test; instantiate instance of WebDriver
	 */
	@Before
	public void setUp() {
		driver = new FirefoxDriver();

		driver.get("http://localhost:5005");
	}

	/**
	 * Tear down for tests; make sure to close WebDriver when tests are done
	 */
	@After
	public void tearDown() {
		driver.quit();
	}

	/**
	 * Basic test
	 */
	@Test
	public void testAccessibility() {
		JSONObject responseJSON = new TestHelper.Builder(driver).analyze();

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			TestHelper.raw(testName.getMethodName(), violations);

			assertTrue(TestHelper.report(violations), false);
		}
	}

	/**
	 * Test with options
	 */
	@Test
	public void testAccessibilityWithOptions() {
		JSONObject responseJSON = new TestHelper.Builder(driver)
				.options("{ rules: { 'accesskeys': { enabled: false } } }")
				.analyze();

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			TestHelper.raw("testAccessibilityWithOptions", violations);

			assertTrue(TestHelper.report(violations), false);
		}
	}

	/**
	 * Test a specific selector or selectors
	 */
	@Test
	public void testAccessibilityWithSelector() {
		JSONObject responseJSON = new TestHelper.Builder(driver)
				.include("title")
				.include("p")
				.analyze();

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			TestHelper.raw("testAccessibilityWithSelector", violations);

			assertTrue(TestHelper.report(violations), false);
		}
	}

	/**
	 * Test includes and excludes
	 */
	@Test
	public void testAccessibilityWithIncludesAndExcludes() {
		JSONObject responseJSON = new TestHelper.Builder(driver)
				.include("div")
				.exclude("h1")
				.analyze();

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			TestHelper.raw("testAccessibilityWithIncludesAndExcludes", violations);

			assertTrue(TestHelper.report(violations), false);
		}
	}

	/**
	 * Test a WebElement
	 */
	@Test
	public void testAccessibilityWithWebElement() {
		JSONObject responseJSON = new TestHelper.Builder(driver)
				.analyze(driver.findElement(By.tagName("p")));

		JSONArray violations = responseJSON.getJSONArray("violations");

		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			TestHelper.raw("testAccessibilityWithWebElement", violations);

			assertTrue(TestHelper.report(violations), false);
		}
	}
}
