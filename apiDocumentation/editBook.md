**Edit book API for admin**
----
    Returns Success or Fail status message.

## Edit book

* **URL**

  /api/admin/books/${id}

* **Method**

  `POST`

* **Bearer Token**

  Yes

* **URL Params**

  `id=[numeric]` <br/>

* **Headers**

  **Content-type:** multipart/form-data

* **Data Params**

  `name=[string]` <br/>
  `author=[string]` <br/>
  `publishedYear=[string]` <br/>
  `ISBN=[string]` <br/>
  `count=[numeric]` <br/>
  `description=[string]` <br/>
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
      **Content:** `{ error : "Unable to add new book" }`

