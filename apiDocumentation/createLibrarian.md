**Create librarian API for admin**
----
    Returns Success or Fail status message.

## Create librarian

* **URL**

  /api/admin/librarians

* **Method**

  `POST`

* **Bearer Token**

  Yes

* **URL Params**

    None

* **Headers**

    **Content-type:** multipart/form-data

* **Data Params**

  `username=[string]` <br/>
  `fullName=[string]` <br/>
  `password=[string]` <br/>
  `image=[file]` <br/>

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully added
    
----

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

    * **Code:** 422 VALIDATION <br />
      **Content:** `{ error : "Data is not valid." }`

      OR

    * **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to add new librarian" }`

