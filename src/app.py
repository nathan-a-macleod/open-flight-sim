import tkinter as tk
import tkinter.font as tkFont

master = tk.Tk()
master["bg"] = "#FAFBFC"

h1FontStyle = tkFont.Font(family="Lucida Grande", size=16)
pFontStyle = tkFont.Font(family="Lucida Grande", size=10)

label1 = tk.Label(master, bg="#FAFBFC", font=h1FontStyle, text="Connect to your Mapbox account")
label1.pack(anchor="w", padx=25, pady=25)

label2 = tk.Label(master, bg="#FAFBFC", font=pFontStyle, text="In order to download satellite information, you must use a valid API access token from Mapbox. Here is how to get one:")
label2.pack(anchor="w", padx=25)

label3 = tk.Label(master, bg="#FAFBFC", font=pFontStyle, text="* Visit https://mapbox.com, and sign in (or create an account if you don't have one).")
label3.pack(anchor="w", padx=50)

label4 = tk.Label(master, bg="#FAFBFC", font=pFontStyle, text="* Once you are signed in, go to the Mapbox account page: https://account.mapbox.com.")
label4.pack(anchor="w", padx=50)

label5 = tk.Label(master, bg="#FAFBFC", font=pFontStyle, text="* Copy the API access token, under the \"Access tokens\" section, and enter it below:")
label5.pack(anchor="w", padx=50)

tokenFieldText = tk.StringVar()
tokenField = tk.Entry(master, textvariable=tokenFieldText)
tokenField.pack(anchor="w", padx=25, pady=12)

def validate():
    print(tokenFieldText.get())

tokenBtn = tk.Button(master, bg="#2a67ea", fg="white", activebackground="#5389f4", activeforeground="white", bd=0, highlightthickness=0, command=validate, text="Continue")
tokenBtn.pack(anchor="w", padx=25, pady=(0, 25))

tk.mainloop()
