from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Set up Selenium WebDriver (make sure you have the appropriate WebDriver executable in your PATH)
driver = webdriver.Chrome()

# Navigate to the login page
driver.get("http://localhost:3001/")  # Replace with the actual URL of your React app

print("Rendering the page is working!")

# Wait for the login form to be visible
wait = WebDriverWait(driver, 10)
login_form = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "sign-in-form")))

# Fill in the email and password fields
email_input = login_form.find_element(By.CSS_SELECTOR, "input[name='user_email']")
password_input = login_form.find_element(By.CSS_SELECTOR, "input[name='user_password']")
email_input.send_keys("cb.en.u4cse20447@cb.students.amrita.edu")
password_input.send_keys("PRAD2003")

print("Tested the input part successfully!")

passedTestCase = 0
totaltestCases = 0
failedTestCase = 0

# Submit the login form
try:
    totaltestCases+=1
    login_button = login_form.find_element(By.CSS_SELECTOR, "input[name='login-user']")
    login_button.click()
    print("Login button clicked successfully!")
    passedTestCase+=1
except:
    print("Login button click failed!")
    failedTestCase+=1

time.sleep(5)

current_url = driver.current_url

if current_url == "http://localhost:3001/facultydashboard":
    totaltestCases+=1
    print("Login module is working successfully!")
    passedTestCase+=1
else:
    print("Login module test failed")
    failedTestCase+=1


# button = driver.find_element(By.CSS_SELECTOR, 'button.MuiButtonBase-root.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.css-1q39md6-MuiButtonBase-root-MuiButton-root')

# button.click()
try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/header/div/div/div[2]/button[1]")
    button1.click()
    print("Home button clicked successfully!")
    passedTestCase+=1
except:
    print("Home button click failed!")
    failedTestCase+=1

time.sleep(2)


try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/header/div/div/div[2]/button[2]")
    button1.click()
    print("Exam TimeTable button clicked successfully!")
    passedTestCase+=1
except:
    print("Exam TimeTable button click failed!")
    failedTestCase+=1

time.sleep(2)


try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/header/div/div/div[2]/button[3]")
    button1.click()
    print("Your Schedule button clicked successfully!")
    passedTestCase+=1
except:
    print("Your Schedule button click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button = driver.find_element(By.XPATH,'/html/body/div[1]/div/header/div/div/div[3]/button/div')
    button.click()
    print("Profile Option clicked successfully!")
    passedTestCase+=1
except:
    print("Profile Option click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button = driver.find_element(By.XPATH,"/html/body/div[3]/div[3]/ul/li[1]/p")
    button.click()
    print("Edit Profile clicked successfully!")
    passedTestCase+=1
except:
    print("Edit Profile click failed!")
    failedTestCase+=1

time.sleep(2)

driver.refresh()
print("Back to Main Page")
time.sleep(2)

try:
    totaltestCases+=1
    button = driver.find_element(By.XPATH,"/html/body/div[1]/div/div/div[2]/div/div[3]/div[3]/button")
    button.click()
    print("Navigated to View Faculty Requests successfully!")
    passedTestCase+=1
except:
    print("Navigation to View Faculty Requests failed!")
    failedTestCase+=1

time.sleep(3)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/header/div/div/div[2]/button[1]")
    button1.click()
    print("Home button clicked successfully!")
    passedTestCase+=1
except:
    print("Home button click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[2]/div/div[2]/div[3]/button")
    button1.click()
    print("Navigated to Request Faculty successfully!")
    passedTestCase+=1
except:
    print("Navigation to Request Faculty failed!")
    failedTestCase+=1

time.sleep(3)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/header/div/div/div[2]/button[1]")
    button1.click()
    print("Home button clicked successfully!")
    passedTestCase+=1
except:
    print("Home button click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/div[2]/div/div[1]/div[3]/button")
    button1.click()
    print("Navigated to Request Admin successfully!")
    passedTestCase+=1
except:
    print("Navigation to Request Admin failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button = driver.find_element(By.XPATH,'/html/body/div[1]/div/header/div/div/div[3]/button/div')
    button.click()
    print("Profile Option clicked successfully!")
    passedTestCase+=1
except:
    print("Profile Option click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button = driver.find_element(By.XPATH,"/html/body/div[3]/div[3]/ul/li[2]")
    button.click()
    print("Logout clicked successfully!")
    passedTestCase+=1
except:
    print("Logout click failed!")
    failedTestCase+=1

time.sleep(5)

# Marks the end of faculty Logins
wait = WebDriverWait(driver, 10)
login_form = wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "sign-in-form")))

email_input = login_form.find_element(By.CSS_SELECTOR, "input[name='user_email']")
password_input = login_form.find_element(By.CSS_SELECTOR, "input[name='user_password']")
email_input.send_keys("pradeepkarthikm@gmail.com")
password_input.send_keys("PRAD2003")

login_button = login_form.find_element(By.CSS_SELECTOR, "input[name='login-user']")
login_button.click()

print("Logged in as admin successfully!")

time.sleep(3)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/header/div/div/div[2]/button[1]")
    button1.click()
    print("Home button clicked successfully!")
    passedTestCase+=1
except:
    print("Home button click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/header/div/div/div[2]/button[2]")
    button1.click()
    print("Exam TimeTable button clicked successfully!")
    passedTestCase+=1
except:
    print("Exam TimeTable button click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/header/div/div/div[2]/button[3]")
    button1.click()
    print("Modify Requests button clicked successfully!")
    passedTestCase+=1
except:
    print("Modify Requests button click failed!")
    failedTestCase+=1
time.sleep(2)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/div/button")
    button1.click()
    print("Add Exam Clicked")
    passedTestCase+=1
except:
    print("Add Exam button click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[4]/div[3]/div/div/form/div[2]/button[2]")
    button1.click()
    print("Add Exam Cancelled")
    passedTestCase+=1
except:
    print("Add Exam cancellation failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button1 = driver.find_element(By.XPATH, "/html/body/div[1]/div/header/div/div/div[2]/button[1]")
    button1.click()
    print("Home button clicked successfully!")
    passedTestCase+=1
except:
    print("Home button click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button = driver.find_element(By.XPATH,'/html/body/div[1]/div/header/div/div/div[3]/button/div')
    button.click()
    print("Profile Option clicked successfully!")
    passedTestCase+=1
except:
    print("Profile Option click failed!")
    failedTestCase+=1

time.sleep(2)

try:
    totaltestCases+=1
    button = driver.find_element(By.XPATH,"/html/body/div[3]/div[3]/ul/li[2]")
    button.click()
    print("Logout clicked successfully!")
    passedTestCase+=1
except:
    print("Logout click failed!")
    failedTestCase+=1

time.sleep(5)

print("Finished Testing!!!")

print("Total Test Cases: ",totaltestCases)
print(f"Passed Test Cases: {passedTestCase} / {totaltestCases}")
print(f"Failed Test Cases: {failedTestCase} / {totaltestCases}")

driver.close()
