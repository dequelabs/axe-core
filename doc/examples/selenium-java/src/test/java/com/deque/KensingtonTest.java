package com.deque;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import org.json.JSONArray;
import org.json.JSONObject;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.Map;
import java.util.concurrent.TimeUnit;

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
	}

	/**
	 * Tear down for tests; make sure to close WebDriver when tests are done
	 */
	public void tearDown() {
		driver.quit();
	}

	/**
	 * Example test
	 */
	public void testAccessibility() {
		driver.get("http://localhost:5005");

		TestHelper.inject(driver);
		JSONObject responseJSON = TestHelper.analyze(driver);
		JSONArray violations = responseJSON.getJSONArray("violations");
		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			assertTrue(TestHelper.report(violations), false);
		}
	}

	/**
	 * Example test
	 */
	public void testAccessibilityWithSelector() {
		driver.get("http://localhost:5005");

		TestHelper.inject(driver);
		JSONObject responseJSON = TestHelper.analyze(driver, "#exampleNode");
		JSONArray violations = responseJSON.getJSONArray("violations");
		if (violations.length() == 0) {
			assertTrue("No violations found", true);
		} else {
			assertTrue(TestHelper.report(violations), false);
		}
	}
}
