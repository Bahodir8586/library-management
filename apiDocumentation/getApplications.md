**GET applications API for librarian**
----

    Returns json DATA

## Get applications

* **URL**

  /api/librarian/applications/

* **Method**

  `GET`

* **Bearer Token**

  Yes

* **URL Params**

  `searchText=[string]` <br/>
  `searchBy=[book|user]` <br/>
  `page=[numeric]` <br/>

* **Data Params**

  None


* **Success Response:**

    * **Code:** 200 <br/>
      **Content:**
      `[` </br>
      `{id:ID,`<br/>
      `wantedDate: Date,` <br/>
      `duration: Integer ,` <br/> 
      `user:{id:ID, name:String},` <br/>
      `book:{id:ID, name:String}` <br/>
       `}]` <br/>
      
  If no applications found return [ ]

----

* **Error Response:**

      **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to respond" }`

