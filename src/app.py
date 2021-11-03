import tkinter as tk
import tkinter.font as tkFont
import requests as req
import os

master = tk.Tk()
master["bg"] = "#FAFBFC"
master.geometry(
    str(master.winfo_screenwidth()) + 
    "x" + 
    str(master.winfo_screenheight())
)

h1FontStyle = tkFont.Font(family="Lucida Grande", size=16)
pFontStyle = tkFont.Font(family="Lucida Grande", size=10)
pFontStyleBOLD = tkFont.Font(family="Lucida Grande", size=10, weight=tkFont.BOLD)

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

label6 = tk.Label(master, bg="#FAFBFC", font=pFontStyleBOLD, text="Please Note: When you input your access token, it will be stored in a config.txt file in the src/ folder. You may want to delete this once you have finished using the program.")
label6.pack(anchor="w", padx=25)

tokenFieldText = tk.StringVar()
tokenField = tk.Entry(master, textvariable=tokenFieldText)
tokenField.pack(anchor="w", padx=25, pady=12)

def validate():
    def displayError():
        resultLabel.config(text="Something went wrong while validating your API key. Please ensure you have a valid API access token associated with a valid Mapbox account, and that you entered it correctly.")
        resultLabel.pack(anchor="w", padx=25)
        tokenBtn.config(text="Try Again")

    try:
        r = req.get("https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/-122.42901,37.80633.json?radius=10&access_token=" + tokenFieldText.get())
    
        if r.status_code == 200:
            resultLabel.config(text="Valid API access key, loading...")
            resultLabel.pack(anchor="w", padx=25)
            
            master.destroy()

            # store the validated API access token 
            if os.path.exists("config.txt"):
                os.remove("config.txt")

            f = open("config.txt", "a")
            f.writelines([tokenFieldText.get()])
            f.close()

            # Run the main file
            import setup.setup

        else:
            displayError()
    
    except:
        displayError()

tokenBtn = tk.Button(master, bg="#2a67ea", fg="white", activebackground="#5389f4", activeforeground="white", bd=0, highlightthickness=0, command=validate, text="Continue")
tokenBtn.pack(anchor="w", padx=25, pady=(0, 25))

resultLabel = tk.Label(master, bg="#FAFBFC", font=pFontStyle, text="")

tk.mainloop()
