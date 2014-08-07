package com.deque;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;
import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.Map;

public class KensingtonTest
    extends TestCase
{
    /**
     * Create the test case
     *
     * @param testName name of the test case
     */
    public KensingtonTest( String testName )
    {
        super( testName );
    }

    /**
     * @return the suite of tests being tested
     */
    public static Test suite()
    {
        return new TestSuite( KensingtonTest.class );
    }


    public void testAccessibility()
    {
        WebDriver driver = new FirefoxDriver();
        driver.get(TestHelper.getUrl());

		TestHelper.injectScript(driver);

        Object response = ((JavascriptExecutor)driver).executeAsyncScript(
                "var callback = arguments[arguments.length - 1];\n" +
                "dqre.a11yCheck(document, null, callback);");
        JSONObject responseJSON = new JSONObject((Map) response);
		int violationCount = responseJSON.getJSONArray("violations").length(); 
        if (violationCount == 1) {
            assertTrue("No violations found", true);
        } else {
            assertTrue(Integer.toString(violationCount) + " violations found", false);
        }

        driver.quit();
    }
}
