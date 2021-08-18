**Delete user for admin**
----
    Returns Success or Fail status message.

## Delete user

* **URL**

  /api/admin/users/${id}

* **Method**

  `DELETE`

* **Bearer Token**

  Yes

* **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully deleted

----



* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
      **Content:** `{ error : "User is not found!" }`

      OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

    * **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to process the data }`