**Edit category API for admin**
----
    Returns Success or Fail status message.

## Edit category

* **URL**

  /api/admin/categories

* **Method**

  `PATCH`

* **Bearer Token**

  Yes

* **URL Params**

  `id=[numeric|id]` <br/>


* **Data Params**

  `name=[string]` <br/>

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully edited

----

* **Error Response:**


      **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "Category is not found" }`

      OR
      **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ error : "Unauthorized" }`

      OR
      **Code:** 422 VALIDATION <br />
      **Content:** `{ error : "Data is not valid." }`

      OR
      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to edit category" }`

