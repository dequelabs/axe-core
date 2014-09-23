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
import java.util.concurrent.TimeUnit;

public class KensingtonTest extends TestCase
{
	private WebDriver driver;

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

	public void setUp()
	{
		driver = new FirefoxDriver();
	}

	public void tearDown()
	{
		driver.quit();
	}

    public void testAccessibility()
    {
        driver.get(TestHelper.getUrl());

        TestHelper.injectScript(driver);

        driver.manage().timeouts().setScriptTimeout(30, TimeUnit.SECONDS);
        Object response = ((JavascriptExecutor)driver).executeAsyncScript(
                "var callback = arguments[arguments.length - 1];\n" +
                "dqre.a11yCheck(document, null, callback);");
        JSONObject responseJSON = new JSONObject((Map) response);
        int violationCount = responseJSON.getJSONArray("violations").length();
        if (violationCount == 0) {
            assertTrue("No violations found", true);
        } else {
            assertTrue(Integer.toString(violationCount) + " violations found", false);
        }
    }
}
