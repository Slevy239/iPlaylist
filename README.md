# project-2

# Authors: Same Levy, Phil Swartz, Jack Ryan
# 2019

iStack

Overview:

iStack will be a programmer notebook/stack overflow consultation app.

Users will:

1. Login to the app using Local authorization
2. Their user info gets saved in a database
3. First time they log in they see a brief intro screen explaining app - Need to add intro to signup page
4. Advance then to first entry screen - they just see the entry box
5. They then either type or SPEAK an entry and add tags
6. This gets saved in a separate database with a unqiue id that links them to the user info db, this database will hold all info regarding songs. 

Things we need:

1. User authorization via google - Jack - Done.
2. Use cheerio to parse and display results - Phil
3. Implement tags and addition other info in database - Jack
4. If answer exists in DB and new search yields same answer, say hey check out other post & answer
5. Front end - Sam

# API Key:
"https://www.googleapis.com/customsearch/v1?q=VARIABLEDEFINEDBYUSER&num=10&start=1&cx=009834279174429339143:hebu5fnydsr&alt=json"
 
# Data Model:
1. Table 1: User information: 
    Col 1: ID | Col 2: Username | Col 3: "Password" | Col 4: Created at | Col 5: updated at
2. Table 2: 
    Col 1: ID | Col 2: Post | Col: 3: Answer | Col 4: Tags | Col 5: Created at | Col 6: updated at
3. Table 3: 
    Col 1: ID | Col 2: Username | Col 3: Post | Col: 4: Answer | Col 5: Tags | Col 6: Created at | Col 7: updated at