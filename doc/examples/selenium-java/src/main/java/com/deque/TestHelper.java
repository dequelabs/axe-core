package com.deque;

import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.Map;
import java.io.*;

public class TestHelper {

	private String getScriptFilename() { 
		return "../../../kensington.js";
	}

	private String readFile(String fileName) {
		String returnValue = "";
		FileReader file = null;

		try {
			file = new FileReader(fileName);
			BufferedReader reader = new BufferedReader(file);
			String line = "";
			while ((line = reader.readLine()) != null) {
				returnValue += line + "\n";
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (file != null) {
				try {
					file.close();
				} catch (IOException e) {
					// Ignore issues during closing 
				}
			}
		}
		return returnValue;
	} 

	public String getUrl() { 
		return "http://www.amazon.com";
	}

	public void injectScript(WebDriver driver) {
		String ksSource = readFile(getScriptFilename());
		String injectionScript = "(function () { var s = document.createElement('script'); " +
			"s.innerHTML = " + ksSource + "; document.body.appendChild(s); }())";

		((JavascriptExecutor)driver).executeScript(injectionScript);

	}
}
