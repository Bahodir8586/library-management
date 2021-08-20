**Verify Token API**
----
    Returns json DATA

## Verify token

* **URL**

  /api/verifyToken/

* **Method**

  `GET`

* **Bearer Token**

  Yes

* **URL Params**

  None


* **Data Params**

  None


* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** <br/>
      `{verified:true, role:[admin|librarian|user]}`<br/>
      `{verified:false}`<br/>
    
----

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

    * **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to process the data" }`

