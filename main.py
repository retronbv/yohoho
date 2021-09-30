# Import webbot
from webbot import Browser
#import keep_alive

# Create an instance of the chromium browser
web = Browser()

# Go to repl.it
web.go_to("google.com")

# Input prompt for typing (You can't use the shift key in the display)
#keep_alive.run()

while True:
  ask=input("> ")
  if ask == "go":
    key = input(" > ")
    web.go_to(key)
  if ask == "type":
    key = input(" > ")
    web.type(key)
  if ask == "enter":
    web.press(web.Key.ENTER)
  if ask == "tab":
    web.press(web.Key.TAB)
  if ask == "backspace":
    web.press(web.Key.BACKSPACE)
  if ask=="paste":
    web.press(web.Key.CONTROL + 'v')
  if ask=="copy":
    web.press(web.Key.CONTROL + 'c')
    
