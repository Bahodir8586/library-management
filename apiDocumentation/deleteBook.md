**Delete book for admin**
----
    Returns Success or Fail status message.

## Delete book

* **URL**

  /api/admin/books/${id}

* **Method**

  `DELETE`

* **Bearer Token**

  Yes

* **URL Params**

  `id=[numeric]`

* **Data Params**

  None

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully deleted

----



* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "Book is not found!" }`

      OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

    * **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to process the data }`

