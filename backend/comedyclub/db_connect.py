import pymongo

uri = "mongodb+srv://darshitRakhasia:Rakhasiya@greatghost.ox2lw96.mongodb.net/?retryWrites=true&w=majority&appName=GreatGhost"

client=pymongo.MongoClient(uri)

db=client['ComedyClub']