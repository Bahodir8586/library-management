**Edit admin login password API for admin**
----
    Returns Success or Fail status message.

## Edit admin

* **URL**

  /api/admin/

* **Method**

  `PATCH`

* **Bearer Token**

  Yes

* **URL Params**

  None

* **Headers**

  None

* **Data Params**

  `username=[string]` <br/>
  `oldPassword=[string]` <br/>
  `newPassword=[string]` <br/>
  `confirmNewPassword=[string]` <br/>

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully updated

----

* **Error Response:**
    

      **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ error : "Unauthorized" }`

      OR
      **Code:** 422 VALIDATION <br />
      **Content:** `{ error : "Data is not valid." }`

      OR
      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to edit admin" }`

