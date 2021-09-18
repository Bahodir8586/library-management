**Accept order API for librarian**
----
    Returns Success or Fail status message.

## Accept order

* **URL**

  /api/order/accept/${id}

* **Method**

  `PATCH or POST or PUT`

* **Bearer Token**

  Yes

* **URL Params**

  None

* **Headers**

  None

* **Data Params**

  None


* **Success Response:**

    * **Code:** 200 <br/>
      **Content:** Successfully accepted

----

* **Error Response:**


      **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

      **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to accept the order" }`

