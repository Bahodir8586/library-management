**Edit librarian API for admin**
----
    Returns Success or Fail status message.

## Edit librarian

* **URL**

  /api/admin/librarians

* **Method**

  `PATCH`

* **Bearer Token**

  Yes

* **URL Params**

  `id=[numeric|id]` <br/>

* **Headers**

  **Content-type:** multipart/form-data

* **Data Params**

  `username=[string]` <br/>
  `fullName=[string]` <br/>
  `oldPassword=[string]` <br/>
  `newPassword=[string]` <br/>
  `newPasswordConfirm=[string]` <br/>
  `image=[file]` <br/>

* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully edited

----

* **Error Response:**
     * **Code:** 404 NOT FOUND <br />
       **Content:** `{ error : "Librarian is not found" }`
     
      OR
     * **Code:** 401 UNAUTHORIZED <br />
       **Content:** `{ error : "Unauthorized" }`
      
      OR
     * **Code:** 422 VALIDATION <br />
       **Content:** `{ error : "Data is not valid." }`
     
      OR
     * **Code:** 500 SERVER ERROR <br />
       **Content:** `{ error : "Unable to edit librarian" }`

