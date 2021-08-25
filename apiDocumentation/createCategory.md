**Create category API for admin**
----
    Returns Success or Fail status message.

## Create category

* **URL**

  /api/admin/categories

* **Method**

  `POST`

* **Bearer Token**

  Yes

* **URL Params**

  None

* **Data Params**

  `name=[string]` <br/>

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

