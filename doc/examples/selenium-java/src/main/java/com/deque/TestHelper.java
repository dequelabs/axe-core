package com.deque;

import org.json.JSONArray;
import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.io.*;

import org.apache.commons.lang3.StringUtils;

public class TestHelper {

	private static String scriptFileName = "../../../kensington.min.js";
	private static String lineSeparator = System.getProperty("line.separator");

	/**
	 * @return Contents of the K-Auto script
	 */
	private static String getContents() {
		StringBuilder sb = new StringBuilder();
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new FileReader(scriptFileName));
			String line = "";
			while ((line = reader.readLine()) != null) {
				sb.append(line);
				sb.append(lineSeparator);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					// Ignore issues during closing
				}
			}
		}
		return sb.toString();
	}

	/**
	 * @param violations JSONArray of violations
	 * @return readable report of accessibility violations found
	 */
	public static String report(JSONArray violations) {
		StringBuilder sb = new StringBuilder();
		sb.append("Found ");
		sb.append(violations.length());
		sb.append(" accessibility violations:");
		for (int i = 0; i < violations.length(); i++) {
			JSONObject violation = violations.getJSONObject(i);
			sb.append(lineSeparator);
			sb.append(lineSeparator);
			sb.append(i + 1);
			sb.append(") ");
			sb.append(violation.getString("help"));
			if (violation.has("helpUrl")) {
				String helpUrl = violation.getString("helpUrl");
				sb.append(": ");
				sb.append(helpUrl);
			}
			JSONArray nodes = violation.getJSONArray("nodes");
			for (int j = 0; j < nodes.length(); j++) {
				JSONObject node = nodes.getJSONObject(j);
				sb.append(lineSeparator);
				sb.append("  ");
				sb.append((char) (j + 97));
				sb.append(") ");
				sb.append(node.getJSONArray("target"));
				sb.append(lineSeparator);
				sb.append("   ");
				sb.append(node.getString("failureSummary").replaceAll("\n", lineSeparator + "    "));
				sb.append(lineSeparator);
			}
		}

		return sb.toString();
	}

	/**
	 * Perform analysis using K-Auto
	 *
	 * @param driver   WebDriver instance to test
	 * @return JSONObject of the found violations and passes
	 */
	public static JSONObject analyze(WebDriver driver) {
		return executeScript(driver, "dqre.a11yCheck(document, null, arguments[arguments.length - 1]);");
	}

	/**
	 * Perform analysis of part of a page using K-Auto
	 *
	 * @param driver   WebDriver instance to test
	 * @param selector for which part of the page to analyze
	 * @return JSONObject of the found violations and passes
	 */
	public static JSONObject analyze(WebDriver driver, String selector) {
		String command = String.format("dqre.a11yCheck('%s', null, arguments[arguments.length - 1]);", selector.replace("'", ""));

		return executeScript(driver, command);
	}

	/**
	 * Perform analysis of part of a page using K-Auto
	 *
	 * @param driver   WebDriver instance to test
	 * @param include  Selectors defining parts of the page to include
	 * @param exclude  Selectors defining parts of the page to exclude
	 * @return JSONObject of the found violations and passes
	 */
	public static JSONObject analyze(WebDriver driver, String[] include, String[] exclude) {
		String command = String.format("dqre.a11yCheck({include: ['%s'], exclude: ['%s']}, null, arguments[arguments.length - 1]);",
			StringUtils.join(include, "','"),
			StringUtils.join(exclude, "','"));

		return executeScript(driver, command);
	}

	/**
	 * Perform analysis of a single element using K-Auto
	 * @param  driver  WebDriver instance to test
	 * @param  context WebElement to test
	 * @return JSONObject of the found violations and passes
	 */
	public static JSONObject analyze(WebDriver driver, WebElement context) {
		String identifier = "test-" + UUID.randomUUID().toString();

		((JavascriptExecutor) driver).executeScript("arguments[0].setAttribute(arguments[1], arguments[0].getAttribute(arguments[1]) + ' ' + arguments[2]);", context, "class", identifier);

		return analyze(driver, "." + identifier);
	}

	private static JSONObject executeScript(WebDriver driver, String command) {
		driver.manage().timeouts().setScriptTimeout(30, TimeUnit.SECONDS);
		Object response = ((JavascriptExecutor) driver).executeAsyncScript(command);
		return new JSONObject((Map) response);
	}

	/**
	 * Recursively injects K-Auto into all iframes and the top level document
	 * @param driver WebDriver instance to inject into
	 */
	public static void inject(WebDriver driver) {
		String script = getContents();
		ArrayList<WebElement> parents = new ArrayList<WebElement>();
		injectIntoFrames(driver, script, parents);

	    JavascriptExecutor js = (JavascriptExecutor) driver;
		driver.switchTo().defaultContent();
		js.executeScript(script);
	}

	/**
	 * Recursively find frames and inject a script into them
	 * @param driver
	 * @param script
	 * @param parents
	 */
	private static void injectIntoFrames(WebDriver driver, String script, ArrayList<WebElement> parents) {
	    JavascriptExecutor js = (JavascriptExecutor) driver;

		List<WebElement> frames = driver.findElements(By.tagName("iframe"));
		for (WebElement frame : frames) {
			driver.switchTo().defaultContent();
			if (parents != null) {
				for (WebElement parent : parents) {
					driver.switchTo().frame(parent);
				}
			}
			driver.switchTo().frame(frame);
			js.executeScript(script);

			ArrayList<WebElement> localParents = (ArrayList<WebElement>) parents.clone();
			localParents.add(frame);
			injectIntoFrames(driver, script, localParents);
		}

	}
}
