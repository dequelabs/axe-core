import org.json.JSONObject;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.Map;

public class TestRunner {
    public static void main(String[] args) {
        WebDriver driver = new FirefoxDriver();
        driver.get("http://localhost:9876/doc/examples/selenium/test.html");

        Object response = ((JavascriptExecutor)driver).executeAsyncScript(
                "var callback = arguments[arguments.length - 1];\n" +
                "dqre.a11yCheck(document.getElementById(\"broken\"), null, callback);");
        JSONObject responseJSON = new JSONObject((Map) response);
        if (responseJSON.getJSONArray("violations").length() == 1) {
            System.out.println("PASS");
        } else {
            System.out.println("FAIL");
        }

        response = ((JavascriptExecutor)driver).executeAsyncScript(
                "var callback = arguments[arguments.length - 1];\n" +
                        "dqre.a11yCheck(document.getElementById(\"working\"), null, callback);");
        responseJSON = new JSONObject((Map) response);
        if (responseJSON.getJSONArray("violations").length() == 0) {
            System.out.println("PASS");
        } else {
            System.out.println("FAIL");
        }

        driver.quit();
    }


}
