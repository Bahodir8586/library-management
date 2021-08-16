**GET categories**
----
    Returns json DATA

## Get categories

* **URL**

  /api/categories/

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
      **Content:**
      `[{id:1, name:"Historical"},{id:2, name:"Fantastic"}]`<br/>

  If no category found return [ ]
----

* **Error Response:**

    * **Code:** 401 Unauthorized <br />
      **Content:** `{ error : "Unauthorized" }`

      OR

    * **Code:** 500 SERVER ERROR <br />
      **Content:** `{ error : "Unable to add new librarian" }`

