f = open("config.txt", "r")
APIAccessToken = f.read().split("\n")[0]
f.close()

print(APIAccessToken)
