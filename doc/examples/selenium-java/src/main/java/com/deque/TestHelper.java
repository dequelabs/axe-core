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
			String line;
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
	 * Chainable builder for invoking K-Auto. Instantiate a new Builder and configure testing with the include(),
	 * exclude(), and options() methods before calling analyze() to run.
	 */
	public static class Builder {
		private final WebDriver driver;
		private final List<String> includes = new ArrayList<String>();
		private final List<String> excludes = new ArrayList<String>();
		private String options = "null";

		/**
		 * Get a new Builder object, navigate the driver to the location, and inject the K-Auto script.
		 * @param driver 	An initialized WebDriver
		 * @param location	URL to test
		 */
		public Builder(final WebDriver driver) {
			this.driver = driver;

			TestHelper.inject(this.driver);
		}

		/**
		 * Set the K-Auto options.
		 * @param options Options object as a JSON string
		 */
		public Builder options(final String options) {
			this.options = options;

			return this;
		}

		/**
		 * Include a selector.
		 * @param selector Any valid CSS selector
		 */
		public Builder include(final String selector) {
			this.includes.add(selector);

			return this;
		}

		/**
		 * Exclude a selector.
		 * @param selector Any valid CSS selector
		 */
		public Builder exclude(final String selector) {
			this.excludes.add(selector);

			return this;
		}

		/**
		 * Run K-Auto against the page.
		 * @return K-Auto results
		 */
		public JSONObject analyze() {
			if (includes.size() == 0) { includes.add("document"); }

			String command;

			if (includes.size() > 1 || excludes.size() > 0) {
				command = String.format("dqre.a11yCheck({include: [%s], exclude: [%s]}, %s, arguments[arguments.length - 1]);",
						"'" + StringUtils.join(includes, "','") + "'",
						excludes.size() == 0 ? "" : "'" + StringUtils.join(excludes, "','") + "'",
						options);
			} else {
				command = String.format("dqre.a11yCheck('%s', %s, arguments[arguments.length - 1]);", includes.get(0).replace("'", ""), options);
			}

			return execute(command);
		}

		/**
		 * Run K-Auto against a specific WebElement.
		 * @param  context A WebElement to test
		 * @return         K-Auto results
		 */
		public JSONObject analyze(final WebElement context) {
			String command = String.format("dqre.a11yCheck(arguments[0], %s, arguments[arguments.length - 1]);", options);

			return execute(command, context);
		}

		private JSONObject execute(final String command, final Object... args) {
			this.driver.manage().timeouts().setScriptTimeout(30, TimeUnit.SECONDS);

			Object response = ((JavascriptExecutor) this.driver).executeAsyncScript(command, args);

			return new JSONObject((Map) response);
		}
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
